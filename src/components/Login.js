import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { triggerToast } from "../utils/reducers/toastSlice";
import { getUsers } from "../utils/reducers/userSlice";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector(state => state.user);
  const [isSignUp, setIsSignup] = useState(false);

  useEffect(() => {
    user.user._id && navigate("/")
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      email: data.get("email"),
      password: data.get("password"),
      name: data.get("fullName"),
    };
    if (credentials.name === "" || credentials.email === "" || credentials.password === "") {
      dispatch(triggerToast({ open: true, severity: "warning", message: "All fields are mandatory" }))
    } else {
      dispatch(getUsers({ ...credentials, isSignUp })).then(() => {
        navigate("/")
        dispatch(triggerToast({ open: true, severity: "success", message: isSignUp ? "Signed up Successfully" : "Login Success" }))
      })
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignUp ? "Sign up" : "Sign in"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {isSignUp && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="text"
                label="Full Name"
                name="fullName"
                autoFocus
              />
            </>
          )}
          {!isSignUp && (
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={user?.isLoading}
          >
            {user?.isLoading ? "setting Up...." : isSignUp ? "Sign up" : "Sign in"}
          </Button>
          <Grid container>
            <Grid item>
              <Button
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                onClick={() =>
                  isSignUp ? setIsSignup(false) : setIsSignup(true)
                }
              >
                {isSignUp
                  ? "Already have an accoutn? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}