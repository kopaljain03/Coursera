import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [username, setusername] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/admin/me", {
      headers: {
        "Content-type": "application/json",
        token: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((data) => {
        if (data.username) setusername(data.username);
      });
    });
  }, []);
  if (username) {
    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                App name
              </Typography>

              <div>
                <Button
                  variant="outlined"
                  color="inherit"
                  style={{ marginRight: "20px" }}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  {username}
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => {
                    localStorage.setItem("token", " ");
                    window.location = "/login";
                  }}
                >
                  Logout
                </Button>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    );
  }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              App name
            </Typography>

            <div>
              <Button
                variant="outlined"
                color="inherit"
                style={{ marginRight: "20px" }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Signup
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Navbar;
