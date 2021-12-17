import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom"
import { useDispatch } from "react-redux";
import Todos from './components/todos/Todos'
import SignIn from './components/auth/Signin'
import SignUp from './components/auth/Signup'
import NavBar from './components/navBar/NavBar'
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { loadUser } from "./store/actions/authActions"


function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(loadUser())
  }, [dispatch])

  return (
  <>
    <BrowserRouter>
    <ToastContainer />
      <Container className="mainContainer" maxWidth="md">
          <NavBar />
        <Container className="routeContainer" maxWidth="sm">
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route exact path="/" element={<Todos />} />
          </Routes>
        </Container>
      </Container>
    </BrowserRouter>
  </>
  );
}

export default App;
