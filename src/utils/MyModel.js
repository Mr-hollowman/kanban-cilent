import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModel } from "./reducers/modelSlice";
import {
  Box,
  Button,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { flexBox } from "../styles/common";
import axios from "axios";
import { getBoards } from "./reducers/boardSlice";
import CreateBoard from "./CreateBoard";
import CreateTask from "./CreateTask";
import { getTasks } from "./reducers/taskSlice";

export default function MyModel() {
  const theme = useTheme();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: theme.palette.mainBackground,
    boxShadow: 50,
    borderRadius: 4,
    p: 4,
  };
  const dispatch = useDispatch();
  const { open, title, isBoards } = useSelector((state) => state.model);
  const { selectedBoardId } = useSelector((state) => state.boards);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [columnCount, setColumnCount] = useState(isBoards ? [] : [{}]);

  const handleClose = () => {
    dispatch(closeModel());
  };

  const onSubmit = (data) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/boards/createBoard`,
        { title: data.name, columns: ["todo", "doing", "done"] },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) dispatch(getBoards());
      });
    handleClose();
    reset();
  };

  const onSubmitTask = (data) => {
    const nothing = {
      title: data.title,
      desc: data.desc,
      column: data.status,
      subTask: [{ title: "my first subtask" }, { title: "my second subtask" }],
      boardId: selectedBoardId,
    };
    console.log(nothing, "form data");
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/boards/createTask`,
        { ...nothing },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch(getTasks(selectedBoardId));
          handleClose();
        }
      });
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        {isBoards ? (
          <CreateBoard
            onSubmit={onSubmit}
            register={register}
            handleSubmit={handleSubmit}
            columnCount={columnCount}
            setColumnCount={setColumnCount}
          />
        ) : (
          <CreateTask
            onSubmit={onSubmitTask}
            register={register}
            handleSubmit={handleSubmit}
            columnCount={columnCount}
            setColumnCount={setColumnCount}
          />
        )}
      </Box>
    </Modal>
  );
}
