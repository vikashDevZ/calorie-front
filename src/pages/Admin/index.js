import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getAllUser } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import dateSorter from "../../utils/dateSorter";
import { SHOW_WARNING } from "../../redux/constants";

const AdminComp = () => {
  const { users, loading } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let sortedUsers;

  if (users.length) {
    sortedUsers = dateSorter(users);
  }

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  if (loading) return <Loader />;

  return (
    <Container style={{ padding: "1rem" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Calorie Limit</th>
            <th>Created On</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers &&
            sortedUsers.map((item, i) => (
              <tr>
                <td>{i}</td>
                <td onClick={() => navigate(`/user/${item._id}`)}>
                  {item.name}
                </td>
                <td>{item.email}</td>
                <td>{item.calorieLimit}</td>
                <td>{item.localTime}</td>
                <td>{item.role}</td>
                <td
                  onClick={() => {
                    if (item.role !== "admin") {
                      dispatch(deleteUser(item._id));
                    } else {
                      dispatch({
                        type: SHOW_WARNING,
                        payload: "cannot delete admin",
                      });
                    }
                  }}
                >
                  {item.role !== "admin" ? "Delete" : "Admin"}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminComp;
