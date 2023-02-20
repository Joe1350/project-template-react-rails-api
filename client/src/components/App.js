import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import MySchedule from "./MySchedule";
import AddScheduleForm from "./AddScheduleForm";
import CreateClassForm from "./CreateClassForm";
import ClassList from "./ClassList";
import Login from "./Login";
import { UserProvider } from "../context/user";

function App() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
      fetch("/courses")
      .then(r => r.json())
      .then(setCourses)
  }, [])

  function handleSetCourses(newCourse) {
    setCourses([...courses, newCourse])
  }

  return (
    <div>
      <UserProvider>
        <NavBar />
        <Switch>
          <Route path="/schedule">
              <MySchedule
                courses={courses}
                setCourses={setCourses}
              />
          </Route>
          <Route path="/add_class">
            <AddScheduleForm
              courses={courses}
              setCourses={setCourses}
            />
          </Route>
          <Route path="/create_class">
            <CreateClassForm
              courses={courses}
              onSetCourses={handleSetCourses}
            />
          </Route>
          <Route path="/browse">
            <ClassList courses={courses} />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
              <Home />
          </Route>
        </Switch>
      </UserProvider>
    </div>
  )
}

export default App;
