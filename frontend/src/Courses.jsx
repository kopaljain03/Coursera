import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function Courses() {
  const [courses, setcourses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      headers: {
        "Content-type": "application/json",
        token: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((data) => {
        // console.log(data.courses);
        if (data.courses) setcourses(data.courses);
      });
    });
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {courses.map((course) => {
        return (
          <div
            onClick={() => {
              navigate("/course/" + course._id);
            }}
          >
            <Course course={course}></Course>{" "}
          </div>
        );
      })}
    </div>
  );
}

function Course(props) {
  return (
    <center>
      <Card sx={{ width: 400, margin: 5 }} style={{ cursor: "pointer" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.course.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.course.description}
            <br />
            {props.course._id}
          </Typography>
        </CardContent>
      </Card>
    </center>
  );
}

export default Courses;
