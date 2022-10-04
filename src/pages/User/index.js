import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFood, getUserById } from "../../redux/actions";
import Loader from "../../components/Loader/Loader";
import { getFoodDetailsByUserId } from "../../redux/actions";
import UpdateItemsForm from "../../components/updateItemsForm";

const User = () => {
  const { id } = useParams();
  console.log("id", id);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.deleteFood);
  const { loading: foodLoading, foods } = useSelector((state) => state.foodId);

  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(getFoodDetailsByUserId(id));
  }, [id]);

  if (loading || foodLoading) return <Loader />;

  return (
    <>
      {foods &&
        foods.map((item, i) => (
          <div className="my-4" key={i}>
            <ul className="list-group mx-4">
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
                  name={item.name}
                  calorie={item.calorie}
                  price={item.price}
                  id={item._id}
                />
              </button>
              <button
                onClick={() => dispatch(deleteFood(item._id, id))}
                className="btn btn-danger"
              >
                delete
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default User;
