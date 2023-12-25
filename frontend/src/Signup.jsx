import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import axios from "axios";

function Signup() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  function handlesignup() {
    // var username = document.getElementById("username").value;
    // var password = document.getElementById("password").value;
    // fetch("http://localhost:3000/admin/signup", {
    //   method: "POST",
    //   body: JSON.stringify({ username, password }),
    //   headers: { "Content-type": "application/json" },
    // }).then((res) => {
    //   res.json().then((data) => {
    //     console.log(data);
    //   });
    // });
    axios
      .post("http://localhost:3000/admin/signup", { username, password })
      .then((res) => {
        console.log(res.data);
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
            <h2>Signup</h2>
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
                handlesignup();
              }}
            >
              {" "}
              Signup{" "}
            </Button>
          </div>
        </Card>
      </Box>
    </center>
  );
}

export default Signup;
