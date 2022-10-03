import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/actions";
import Loader from "../../components/Loader/Loader";
import { getFoodDetailsByUserId } from "../../redux/actions";

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

  console.log("userin admin", foods);

  if (loading) return <Loader />;

  return (
    <>
      {foods &&
        foods.map((item, i) => (
          <ul class="list-group m-4">
            <li class="list-group-item">{item.name}</li>
            <li class="list-group-item">{item.calorie}</li>
            <li class="list-group-item">{item.price}</li>
            <li class="list-group-item">{item.createdAt}</li>
          </ul>
        ))}
    </>
  );
};

export default User;
