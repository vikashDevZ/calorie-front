import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddItemsForm from "./AddItemsForm";
import { logOut } from "../redux/actions";
import InviteFriends from "./InviteFriendsForm";
import Loader from "./Loader/Loader";

const NavbarComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.user);
  console.log("user", user);

  const isAdmin = () => {
    if (user?.role === "admin") return "/admin";
    return "/me";
  };

  if(loading){
    return <Loader/>
  }

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand
            style={{ cursor: "pointer" }}
            onClick={() => navigate(isAdmin())}
          >
            {user?.name || "user"}
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Home
            </Nav.Link>
            {user?.name && (
              <Nav.Link
                style={{ cursor: "pointer" }}
                onClick={() => dispatch(logOut())}
              >
                Logout
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            <Nav.Link className="text-white">
              {user?.name && <InviteFriends />}
            </Nav.Link>
            <Nav.Link className="text-white">
              {user?.name && <AddItemsForm />}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
};

export default NavbarComp;
