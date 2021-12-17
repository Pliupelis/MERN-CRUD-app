import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import "../../assets/css/styles.css";
import { Link, useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import { Button } from "@mui/material";
import { signOut } from "../../store/actions/authActions";
const NavBar = () => {
  const history = useNavigate();
  const state = useSelector((state) => state);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(state);
  const handleSignOut = () => {
    dispatch(signOut());
    history("/signIn", { replace: true });
  };
  const list = {
    padding: "10px",
  };
  return (
    <>
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h5" className="">
              <Link underline="none" style={list} to="/" color="secondary">
                List
              </Link>
            </Typography>
            {user._id ? (
              <>
                <Typography variant="h6" className="">
                  <span>Logged in as </span>
                  {user.name.toUpperCase()}
                </Typography>
                <Button
                  edge="end"
                  color="inherit"
                  className=""
                  onClick={() => handleSignOut()}
                >
                  <Link className="" to="/">
                    SignOut
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button edge="end" color="inherit" className="">
                  <Link className="" to="/signin">
                    SignIn
                  </Link>
                </Button>
                <Button edge="end" color="inherit" className="">
                  <Link className="" to="/signup">
                    SignUp
                  </Link>
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default NavBar;
