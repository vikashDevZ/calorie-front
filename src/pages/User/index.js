import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFood, getUserById } from "../../redux/actions";
import Loader from "../../components/Loader/Loader";
import { getFoodDetailsByUserId } from "../../redux/actions";
import UpdateItemsForm from "../../components/updateItemsForm";
import ReactDatePicker from "react-datepicker";

const User = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.deleteFood);
  const { loading: foodLoading, foods } = useSelector((state) => state.foodId);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currPage, setCurrPage] = useState(1);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handlePagination = (action) => {
    if (action === "inc") {
      dispatch(getFoodDetailsByUserId(id, currPage + 1));
      setCurrPage((prev) => prev + 1);
    } else if (action === "dec") {
      if (currPage <= 1) return;
      dispatch(getFoodDetailsByUserId(id, currPage - 1));
      setCurrPage((prev) => prev - 1);
    } else return;
  };

  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(
      getFoodDetailsByUserId(id, currPage, selectedDate, selectedEndDate)
    );
  }, [id, dispatch]);

  if (loading || foodLoading) return <Loader />;

  return (
    <div className="container mb-4">
      <div className="d-flex flex-column justify-content-end align-items-end">
        <UpdateItemsForm type={"Add New Item For User"} userId={id} />
        <div className="d-flex align-items-center justify-content-end mx-4">
          <div className="container row pb-4">
            <div className="col-5 p-0">
              From
              <ReactDatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              />
            </div>
            <div className="col-5">
              To
              <ReactDatePicker
                selected={selectedEndDate}
                onChange={(date) => setSelectedEndDate(date)}
              />
            </div>
          </div>
          <button
            type="button"
            style={{ width: "20%" }}
            className="btn btn-sm btn-primary"
            onClick={() =>
              dispatch(
                getFoodDetailsByUserId(
                  id,
                  currPage,
                  selectedDate,
                  selectedEndDate
                )
              )
            }
          >
            search
          </button>
        </div>
      </div>
      {foods &&
        foods.map((item, i) => (
          <div className="my-4" key={i}>
            <ul className="list-group">
              <li className="list-group-item">{item.name}</li>
              <li className="list-group-item">{item.calorie}</li>
              <li className="list-group-item">{item.price}</li>
              <li className="list-group-item">
                {new Date(item.createdAt).toUTCString().slice(0, 16)}
                {new Date(item.createdAt).toTimeString()}
              </li>
            </ul>
            <div className="d-flex mt-2 flex-row justify-content-end align-items-center">
              <UpdateItemsForm
                type={"Update"}
                name={item.name}
                calorie={item.calorie}
                price={item.price}
                id={item._id}
                userId={id}
              />
              <button
                onClick={() => dispatch(deleteFood(item._id, id))}
                className="btn btn-danger mx-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      <div className="d-flex flex-column justify-content-center align-items-end">
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            className="btn btn-sm btn-primary px-4"
            onClick={() => handlePagination("dec")}
          >
            {"<"}
          </button>
          <button
            type="button"
            style={{ cursor: "not-allowed" }}
            className="btn active btn-sm btn-primary px-4"
          >
            {currPage}
          </button>
          <button
            type="button"
            className="btn btn-sm btn-primary px-4"
            onClick={() => handlePagination("inc")}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
