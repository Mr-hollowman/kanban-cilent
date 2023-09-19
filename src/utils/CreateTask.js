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
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { flexBox } from "../styles/common";
import axios from "axios";
import { getBoards } from "./reducers/boardSlice";

export default function CreateTask({
  handleSubmit,
  onSubmit,
  register,
  columnCount,
  setColumnCount,
}) {
  const boards = useSelector((state) => state.boards);
  const selectedBoardData = boards?.boards?.filter(
    (item) => item._id === boards.selectedBoardId
  );
  console.log(selectedBoardData, "board data on create task");
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <InputLabel
        htmlFor="title"
        sx={{ fontWeight: "bold", fontSize: 15, marginBottom: 1 }}
      >
        Title
      </InputLabel>
      <OutlinedInput
        autoFocus
        {...register("title", { required: true })}
        id="title"
        size="small"
        fullWidth={true}
      />
      <InputLabel
        htmlFor="column"
        sx={{
          fontWeight: "bold",
          fontSize: 15,
          marginBottom: 1,
          marginTop: 2,
        }}
      >
        Description
      </InputLabel>
      <TextField
        {...register("desc", { required: true })}
        id="outlined-multiline-static"
        multiline
        fullWidth
        rows={4}
      />
      <InputLabel
        htmlFor="subTask"
        sx={{
          fontWeight: "bold",
          fontSize: 15,
          marginBottom: 1,
          marginTop: 2,
        }}
      >
        subtasks
      </InputLabel>

      {columnCount.length > 0 &&
        columnCount.map((item, index) => {
          return (
            <Box key={index} sx={[flexBox, { gap: 2 }]}>
              <OutlinedInput
                {...register(`subTask${index}`, { required: true })}
                id={`subTask${index}`}
                size="small"
                fullWidth
                sx={{ marginTop: 1 }}
              />
              <CloseIcon
                onClick={() =>
                  setColumnCount(
                    columnCount.filter((item2, index2) => index2 != index)
                  )
                }
              />
            </Box>
          );
        })}

      <Button
        onClick={() =>
          columnCount.length <= 4
            ? setColumnCount((prev) => [
                ...prev,
                { name: columnCount.length + 1 },
              ])
            : null
        }
        fullWidth={true}
        variant="contained"
        sx={{
          marginTop: 5,
          borderRadius: 5,
          background: "#fff",
          color: "#635FC7",
        }}
      >
        + Add New SubTask
      </Button>

      <InputLabel
        htmlFor="status"
        sx={{ fontWeight: "bold", fontSize: 15, marginBottom: 1 }}
      >
        Status
      </InputLabel>
      <Select name="status" size="small" fullWidth {...register("status", { required: true })} >
        {/* <MenuItem value="" selected>
          Select Column
        </MenuItem> */}
        {selectedBoardData[0]?.columns.map((item, index) => {
          return (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>

      <Button
        type="submit"
        fullWidth={true}
        variant="contained"
        sx={{
          marginTop: 5,
          borderRadius: 5,
          background: "#635FC7",
          color: "#fff",
        }}
      >
        Create New Task
      </Button>
    </form>
  );
}
