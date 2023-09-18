import React from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { flexBox } from "../styles/common";

export default function HideSideBarButton({ handleHideSideBar }) {
  return (
    <div
      onClick={() => handleHideSideBar()}
      style={{
        position: "fixed",
        top: "87%",
        left: 0,
        width: "50px",
        ...flexBox,
        borderTopRightRadius: "50px",
        borderBottomRightRadius: "50px",
        background: "blue",
        padding: "10px",
      }}
    >
      <VisibilityOutlinedIcon />
    </div>
  );
}
