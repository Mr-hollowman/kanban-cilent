import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../utils/reducers/userSlice";
import { getTasks } from "../utils/reducers/taskSlice";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Typography } from "@mui/material";
import { flexBox } from "../styles/common";
export default function TodoContainer() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { selectedBoardId, isLoading, boards } = useSelector(
    (state) => state.boards
  );
  const selectedBoardData = boards.filter(
    (item) => item._id === selectedBoardId
  );
  
  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    !isLoading && dispatch(getTasks(selectedBoardId));
  }, [selectedBoardId]);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        // height: "100vh",
        background: theme.palette.contentBackground,
        overflow: "auto",
        padding: "10px",
      }}
    >
      {selectedBoardData[0]?.columns?.map((item, index) => {
        let count = 0;
        for (let i = 0; i <= tasks.length; i++) {
          if (item === tasks[i]?.column) {
            count += 1;
          }
        }
        return (
          <Box key={item} sx={{ minWidth: "350px" }}>
            <Box sx={{ display: "flex", gap: "5px" }}>
              <FiberManualRecordIcon />
              <Typography>
                {item} ({count})
              </Typography>
            </Box>
            {tasks.map((task, index) => {
              if (item === task.column) {
                return <Box key={item}>{task.title}</Box>;
              } else {
                <></>;
              }
            })}
          </Box>
        );
      })}
    </Box>
  );
}
