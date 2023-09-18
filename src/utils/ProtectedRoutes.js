import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const checkUser = () => {
    (!user || user === "undefined" || !user?.user._id) && navigate("/login");
  };
  useEffect(() => {
    checkUser();
  }, [user]);

  return <React.Fragment>{user ? props.children : null}</React.Fragment>;
};
export default ProtectedRoute;
