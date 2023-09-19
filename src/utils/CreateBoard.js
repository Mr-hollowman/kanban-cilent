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

export default function CreateBoard({handleSubmit, onSubmit, register, columnCount, setColumnCount}) {
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <InputLabel
        htmlFor="name"
        sx={{ fontWeight: "bold", fontSize: 15, marginBottom: 1 }}
      >
        Name
      </InputLabel>
      <OutlinedInput
        autoFocus
        {...register("name", { required: true })}
        id="name"
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
        Column
      </InputLabel>
      <Box sx={[flexBox, { gap: 2 }]}>
        <OutlinedInput
          {...register("column", { required: true })}
          id="column"
          size="small"
          fullWidth={true}
        />
        {columnCount.length > 0 && (
          <CloseIcon
            onClick={() =>
              setColumnCount(columnCount.slice(0, columnCount.length - 1))
            }
          />
        )}
      </Box>
      {columnCount.length > 0 &&
        columnCount.map((item, index) => {
          return (
            <Box key={item.name} sx={[flexBox, { gap: 2 }]}>
              <OutlinedInput
                {...register(`column${item.name}`, { required: true })}
                id={`column${index}`}
                size="small"
                fullWidth={true}
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
        + Add New Column
      </Button>
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
        Create New Board
      </Button>
    </form>
  );
}
