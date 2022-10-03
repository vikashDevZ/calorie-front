import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_WARNING } from "../redux/constants";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function TransitionsSnackbar() {
  const { notify, message } = useSelector((state) => state.warn);
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    open: false,
    Transition: Slide,
  });

  let TIMER;
  function handleTimeout() {
    TIMER = setTimeout(() => {
      dispatch({ type: CLEAR_WARNING });
    }, 2000);
  }

  useEffect(() => {
    if (notify) {
      handleTimeout();
      setState({
        open: true,
        Transition: SlideTransition,
      });
    }
    return () => {
      clearTimeout(TIMER);
    };
  }, [notify]);

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <div>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message={message}
        key={state.Transition.name}
      />
    </div>
  );
}
