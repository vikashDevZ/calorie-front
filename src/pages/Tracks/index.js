import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllFoods } from "../../redux/actions";
import Loader from "../../components/Loader/Loader";
import dateSorter from "../../utils/dateSorter";
import dateMerger from "../../utils/dateMerger";
import limitCreator from "../../utils/limitCreter";
import { SHOW_WARNING } from "../../redux/constants";
import ReactDatePicker from "react-datepicker";

const CalorieTracks = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currPage, setCurrPage] = useState(1);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const dispatch = useDispatch();
  const { foods, loading, error } = useSelector((state) => state.foods);

  let newObj = [];
  if (foods.length) {
    newObj = dateMerger(dateSorter(foods));
    if (newObj.length > 1) {
      limitCreator(newObj);
    }
  }

  const handlePagination = (action) => {
    if (action === "inc") {
      dispatch(getAllFoods(currPage + 1, selectedDate, selectedEndDate));
      setCurrPage((prev) => prev + 1);
    } else if (action === "dec") {
      if (currPage <= 1) return;
      dispatch(getAllFoods(currPage - 1, selectedDate, selectedEndDate));
      setCurrPage((prev) => prev - 1);
    } else return;
  };

  useEffect(() => {
    dispatch(getAllFoods());
  }, [selectedDate, selectedEndDate, dispatch]);

  useEffect(() => {
    if (foods.length) {
      const todaysDate = new Date(Date.now());
      foods.forEach((element) => {
        if (element.newDate === todaysDate.getDate()) {
          if (element.totalCalorie > 2000) {
            dispatch({ type: SHOW_WARNING, payload: "Above Calorie Limit" });
          }
          if (element.totalCost > 1000) {
            dispatch({ type: SHOW_WARNING, payload: "Above Budget Limit" });
          }
        }
      });
    }

    if (error) {
      dispatch({ type: SHOW_WARNING, payload: error });
    }
  }, [foods, error, dispatch]);

  if (loading) return <Loader />;

  return (
    <Container
      style={{ padding: "1rem" }}
      className="d-flex flex-column justify-content-center align-items-end"
    >
      <div className="d-flex align-items-center justify-content-end">
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
            dispatch(getAllFoods(currPage, selectedDate, selectedEndDate))
          }
        >
          search
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Food</th>
            <th>Calories</th>
            <th>Cost</th>
            <th>Date</th>
            <th>Time</th>
            <th>Calorie / Cost</th>
          </tr>
        </thead>
        <tbody>
          {newObj &&
            newObj.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item?.name}</td>
                <td>{item?.calorie}</td>
                <td>{item?.price ? item.price + "$" : null}</td>
                <td>{item?.newDate === "" ? null : `${item?.newLocalDate}`}</td>
                <td>{item?.newDate === "" ? null : `${item?.newTime}`}</td>
                <td
                  className={
                    item?.totalCalorie < 2000 && item?.totalCost < 2000
                      ? "text-success font-weight-bold"
                      : "text-danger font-weight-bold"
                  }
                >
                  {item?.newDate === ""
                    ? null
                    : item?.totalCalorie
                    ? item?.totalCalorie +
                      "cal / " +
                      (item?.totalCost).toFixed(2) +
                      "$"
                    : null}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="btn-group mx-4" role="group" aria-label="Basic example">
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
    </Container>
  );
};

export default CalorieTracks;
