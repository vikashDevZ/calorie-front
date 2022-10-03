import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/actions";
import Loader from "../../components/Loader/Loader";
import { getFoodDetailsByUserId } from "../../redux/actions";
import AddItemsForm from "../../components/AddItemsForm";

const User = () => {
  const { id } = useParams();
  console.log("id", id);
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((state) => state.userId);
  const { foods } = useSelector((state) => state.foodId);

  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(getFoodDetailsByUserId(id));
  }, [id]);

  const foodUpdateHandler = (id) => {
    return <AddItemsForm />;
  };

  const deleteFood = (id) => {};

  if (loading) return <Loader />;

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
            <div>
              <button
                onClick={() => foodUpdateHandler(item._id)}
                className="btn"
                // className="btn btn-primary mx-4"
              >
                <AddItemsForm/>
              </button>
              <button
                onClick={() => deleteFood(item._id)}
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
