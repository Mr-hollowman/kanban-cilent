import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../utils/reducers/userSlice";
import { getTasks } from "../utils/reducers/taskSlice";

export default function TodoContainer() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { selectedBoardId, isLoading } = useSelector((state) => state.boards);
  console.log(isLoading, "isLoading on todoContainer");
  useEffect(() => {
    !isLoading && dispatch(getTasks(selectedBoardId));
  }, [selectedBoardId]);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        background: theme.palette.contentBackground,
      }}
    >
      nothin
    </Box>
  );
}
