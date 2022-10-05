import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFood, getUserById } from "../../redux/actions";
import Loader from "../../components/Loader/Loader";
import { getFoodDetailsByUserId } from "../../redux/actions";
import UpdateItemsForm from "../../components/updateItemsForm";

const User = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.deleteFood);
  const { loading: foodLoading, foods } = useSelector((state) => state.foodId);

  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(getFoodDetailsByUserId(id));
  }, [id, dispatch]);

  if (loading || foodLoading) return <Loader />;

  return (
    <div className="container">
      <UpdateItemsForm type={"Add New Item For User"} userId={id} />
      {foods &&
        foods.map((item, i) => (
          <div className="my-4" key={i}>
            <ul className="list-group">
              <li className="list-group-item">{item.name}</li>
              <li className="list-group-item">{item.calorie}</li>
              <li className="list-group-item">{item.price}</li>
              <li className="list-group-item">{item.createdAt}</li>
            </ul>
            <div className="">
              <button
                // onClick={() => foodUpdateHandler(item._id)}
                className="btn"
                // className="btn btn-primary mx-4"
              >
                <UpdateItemsForm
                  type={"Update"}
                  name={item.name}
                  calorie={item.calorie}
                  price={item.price}
                  id={item._id}
                  userId={id}
                />
              </button>
              <button
                onClick={() => dispatch(deleteFood(item._id, id))}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default User;
