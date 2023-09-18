import { Box, Switch, Typography } from "@mui/material";
import React from "react";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import { useTheme } from "@emotion/react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../utils/reducers/themeSlice";
import { flexBox } from "../styles/common";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { triggerModel } from "../utils/reducers/modelSlice";
import { changeBoard } from "../utils/reducers/boardSlice";

export default function BoardsList({ handleHideSideBar }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  console.log(boards, "boards");
  const pills = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "10px",
    color: theme.palette.disabledFont,
    cursor: "pointer",
    marginBottom: "10px",
  };
  return (
    <Box
      sx={{
        overflowY: "auto",
        height: "90vh",
        minWidth: "250px",
        maxWidth: "250px",
        background: theme.palette.mainBackground,
        borderRight: `1px solid ${theme.palette.borderColor}`,
      }}
    >
      <div style={{ minHeight: "400px" }}>
        <Typography
          sx={{
            padding: "20px",
            fontWeight: "bold",
            fontSize: 15,
            color: theme.palette.disabledFont,
          }}
        >
          ALL BOARDS ({boards.boards.length})
        </Typography>
        {!boards.isLoading &&
          boards?.boards?.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() =>
                  dispatch(changeBoard({ title: item.title, id: item._id }))
                }
                className={
                  boards.selectedBoard === item.title ? "active" : "pills"
                }
                style={pills}
              >
                <DashboardCustomizeOutlinedIcon
                  style={{ marginLeft: "10px" }}
                />
                <Typography>{item.title}</Typography>
              </div>
            );
          })}
        <div className="newBoard" style={pills}>
          <DashboardCustomizeOutlinedIcon style={{ marginLeft: "10px" }} />
          <Typography
            onClick={() =>
              dispatch(
                triggerModel({ title: "Create New Board", isBoards: true })
              )
            }
          >
            {" "}
            + Create New Board
          </Typography>
        </div>
      </div>
      <div style={{}}>
        <Box
          sx={{
            background: theme.palette.contentBackground,
            margin: "20px",
            padding: 1,
            ...flexBox,
            borderRadius: "10px",
          }}
        >
          <LightModeOutlinedIcon />
          <Switch
            checked={theme.palette.mode === "dark"}
            onChange={() =>
              dispatch(
                changeTheme(theme.palette.mode === "dark" ? "light" : "dark")
              )
            }
          />
          <NightsStayOutlinedIcon />
        </Box>
        <Box
          onClick={() => handleHideSideBar()}
          sx={{
            ...flexBox,
            justifyContent: "flex-start",
            margin: "20px",
            gap: "10px",
            color: theme.palette.disabledFont,
            cursor: "pointer",
          }}
        >
          <VisibilityOffOutlinedIcon />
          <Typography>Hide Sidebar</Typography>
        </Box>
      </div>
    </Box>
  );
}
