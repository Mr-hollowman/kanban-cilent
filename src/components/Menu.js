import React from "react";
import { logout } from "../utils/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearBoards, getBoards } from "../utils/reducers/boardSlice";
import { triggerToast } from "../utils/reducers/toastSlice";

export default function Menu() {
  const dispatch = useDispatch();
  const { selectedBoardId } = useSelector((state) => state.boards);
  const handleLogout = () => {
    axios.post(process.env.REACT_APP_LOGOUT_URL, {}, { withCredentials: true });
    dispatch(clearBoards());
    dispatch(logout());
  };
  const handleDeleteBoard = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/boards/deleteBoard?boardId=${selectedBoardId}`,
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch(getBoards());
          dispatch(
            triggerToast({
              open: true,
              severity: "success",
              message: res.data.message,
            })
          );
        }
      });
  };
  return (
    <div
      style={{
        position: "fixed",
        top: "10%",
        right: "3%",
        padding: "20px",
        width: "200px",
        background: "black",
      }}
    >
      <span style={{ display: "block" }} onClick={handleLogout}>
        Logout
      </span>
      <span style={{ display: "block" }} onClick={() => handleDeleteBoard()}>
        Delete Board
      </span>
    </div>
  );
}
