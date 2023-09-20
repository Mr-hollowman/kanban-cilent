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
  console.log(tasks, "tasks");

  useEffect(() => {
    !isLoading && dispatch(getTasks(selectedBoardId));
  }, [selectedBoardId, isLoading]);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        // height: "87vh",
        background: theme.palette.contentBackground,
        // overflow: "auto",
        // overflowY:"scroll",
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
                {item}({count})
              </Typography>
            </Box>
            {tasks.map((task, index) => {
              // let totalCount = 0;
              let activeCount = 0;
              for (let j = 0; j < task.subTask.length; j++) {
                if (task?.subTask[j].isActive === false) {
                  activeCount += 1;
                }
              }
              if (item === task.column) {
                return (
                  <Box
                    key={`${item}${index}`}
                    sx={{
                      background: theme.palette.mainBackground,
                      padding: 2,
                      margin: 4,
                      borderRadius: 2,
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                      {task.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: 13,
                        color: theme.palette.disabledFont,
                      }}
                    >
                      {activeCount} of {task?.subTask?.length} Subtasks
                    </Typography>
                  </Box>
                );
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
