// Course Component
import { useState } from "react";
import { useEffect } from "react";

export function Courses() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetch("/api/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data))
  }, []);

  return (
    <>
      {courses.map((course) => (
        <tr key={course.courseNumber}>
          <td>{course.trimester}</td>
          <td>{course.courseNumber}</td>
          <td>{course.courseName}</td>
          <td>{course.semesterCredits}</td>
          <td>{course.totalClockHours}</td>
          <td>
            <button>Enroll</button>
          </td>
        </tr>
      ))}
    </>
  );
}
