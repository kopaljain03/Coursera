import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

const AddCourse = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  function handleAddCourse() {
    fetch("http://localhost:3000/admin/courses", {
      method: "POST",
      body: JSON.stringify({ title, description, published: true }),
      headers: {
        "Content-type": "application/json",
        token: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
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
            <h2>Add course</h2>
            Title :{" "}
            <TextField
              variant="standard"
              name="title"
              id="title"
              onChange={(e) => {
                settitle(e.target.value);
              }}
            />
            <br /> <br />
            Description :{" "}
            <TextField
              variant="standard"
              name="description"
              id="description"
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />
            <br /> <br />
            <Button
              variant="outlined"
              onClick={() => {
                handleAddCourse();
              }}
            >
              {" "}
              Add Course{" "}
            </Button>
          </div>
        </Card>
      </Box>
    </center>
  );
};

export default AddCourse;
