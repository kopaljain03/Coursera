import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  function handleLogin() {
    fetch("http://localhost:3000/admin/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-type": "application/json" },
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        window.location = "/courses";
      });
    });
  }
  return (
    <center>
      <Box sx={{ width: "500px", marginTop: "150px" }}>
        <Card variant="outlined">
          <div
            style={{
              padding: "10px",
            }}
          >
            <h2>Login</h2>
            Username :{" "}
            <TextField
              variant="standard"
              name="username"
              id="username"
              onChange={(e) => {
                setusername(e.target.value);
              }}
            />
            <br /> <br />
            Password :{" "}
            <TextField
              variant="standard"
              name="password"
              id="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <br /> <br />
            <Button
              variant="outlined"
              onClick={() => {
                handleLogin();
              }}
            >
              {" "}
              Login{" "}
            </Button>
          </div>
        </Card>
      </Box>
    </center>
  );
}

export default Login;
