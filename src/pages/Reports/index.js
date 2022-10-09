import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { getFoodDetailsByUserId } from "../../redux/actions";

const Reports = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [thisWeek, setThisWeek] = useState(true);
  const { loading, foods } = useSelector((state) => state.foodId);

  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  const todaysDate = new Date(Date.now());
  const lastWeekDate = new Date(todaysDate - new Date(oneWeek));
  const twoWeeks = new Date(todaysDate - new Date(oneWeek * 2));

  const getFoodsByWeek = () => {
    if (thisWeek) {
      dispatch(getFoodDetailsByUserId(userId, 1, lastWeekDate, todaysDate));
    } else {
      dispatch(getFoodDetailsByUserId(userId, 1, twoWeeks, lastWeekDate));
    }
  };

  useEffect(() => {
    getFoodsByWeek();
  }, [thisWeek]);

  if (loading) return <Loader />;

  return (
    <div className="container">
      <div className="container row my-2">
        <button
          className={`btn col-lg-2 col-3 ${
            thisWeek ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setThisWeek(true)}
        >
          last 7 days
        </button>
        <div className="col-1"></div>
        <button
          className={`btn col-lg-2 col-3 ${
            thisWeek ? "btn-outline-primary" : "btn-primary"
          }`}
          onClick={() => setThisWeek(false)}
        >
          Prev week
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Food</th>
            <th>Calories</th>
            <th>Cost</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {foods &&
            foods.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item?.name}</td>
                <td>{item?.calorie}</td>
                <td>{item?.price ? item.price + "$" : null}</td>
                <td>
                  {new Date(item.createdAt).toUTCString().slice(0, 16)}
                  {new Date(item.createdAt)
                    .toTimeString()
                    .toString()
                    .slice(0, 9)}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Reports;
