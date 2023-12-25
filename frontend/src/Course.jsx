import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const Course = () => {
  const { id } = useParams();
  const [courses, setcourses] = useState([]);
  const [course, setcourse] = useState({});
  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      headers: {
        "Content-type": "application/json",
        token: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((data) => {
        // console.log(data.courses);
        if (data.courses) {
          setcourses(data.courses);
          var course1 = data.courses.filter((i) => i._id == id)[0];
          setcourse(course1);
          //   console.log({ filtered_course: course1 });
          //   //   console.log(course);
          //   //   console.log(courses);
          //   console.log(data.courses);
        }
      });
    });
  }, []);
  //   var course1 = courses.filter((i) => i._id == id)[0];

  if (!course) {
    return <h4>Loading...</h4>;
  }

  return (
    <>
      <CourseCard course={course}></CourseCard>
      <UpdateCard course={course} setcourse={setcourse}></UpdateCard>
    </>
  );
};

function CourseCard(props) {
  return (
    <center>
      <Card sx={{ width: 400, margin: 5 }}>
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

function UpdateCard(props) {
  const [title, settitle] = useState(props.course.title);
  const [description, setdescription] = useState(props.course.description);
  useEffect(() => {
    settitle(props.course.title);
  }, [props.course.title]);
  useEffect(() => {
    setdescription(props.course.description);
  }, [props.course.description]);
  function handleUpdateCourse() {
    fetch("http://localhost:3000/admin/courses/" + props.course._id, {
      method: "PUT",
      body: JSON.stringify({ title, description, published: true }),
      headers: {
        "Content-type": "application/json",
        token: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        props.setcourse({ title, description });
      });
    });
  }
  return (
    <center>
      <Box sx={{ width: "500px", marginTop: "50px" }}>
        <Card variant="outlined">
          <div
            style={{
              padding: "10px",
            }}
          >
            <h2>Update course</h2>
            Title :{" "}
            <TextField
              variant="standard"
              name="title"
              id="title"
              value={title}
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
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />
            <br /> <br />
            <Button
              variant="outlined"
              onClick={() => {
                handleUpdateCourse();
              }}
            >
              {" "}
              Update Course{" "}
            </Button>
          </div>
        </Card>
      </Box>
    </center>
  );
}

export default Course;
