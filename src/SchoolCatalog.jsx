import { useState } from "react";
import { useEffect } from "react";

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("trimester");
  const [direction, setDirection] = useState("asc");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  // Filtering Data

  useEffect(() => {
    fetch("/api/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data))
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().startsWith(filter.toLowerCase()) ||
    course.courseNumber.toLowerCase().startsWith(filter.toLowerCase())
  );

  // Sorting Data

  const handleSort = (field) => {
    const sortOrder = sort === field && direction === "asc" ? "desc" : "asc";
    setSort(field);
    setDirection(sortOrder);
  };

  const sortedCourses = filteredCourses.sort((a, b) => {
    let sortValue;

    switch(sort) {
      case "trimester":
        sortValue = (Number(a.trimester) - Number(b.trimester)) * (direction === "desc" ? -1 : 1);
        break;
      case "course number":
        sortValue = a.courseNumber.localeCompare(b.courseNumber) * (direction === "desc" ? -1 : 1);
        break;
      case "course name":
        sortValue = a.courseName.localeCompare(b.courseName) * (direction === "desc" ? -1 : 1);
        break;
      case "semester credits":
        sortValue = (Number(a.semesterCredits) - Number(b.semesterCredits)) * (direction === "desc" ? -1 : 1);
        break;
      case "total clock hours":
        sortValue = (Number(a.totalClockHours) - Number(b.totalClockHours)) * (direction === "desc" ? -1 : 1);
        break;
    }

    return sortValue;
  });

  // Pagination

  const currentPage = sortedCourses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasMore = sortedCourses.length > page * PAGE_SIZE;
  const hasLess = page > 1;

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search" onChange={(event) => setFilter(event.target.value)} />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("trimester")}>Trimester</th>
            <th onClick={() => handleSort("course number")}>Course Number</th>
            <th onClick={() => handleSort("course name")}>Courses Name</th>
            <th onClick={() => handleSort("semester credits")}>Semester Credits</th>
            <th onClick={() => handleSort("total clock hours")}>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {currentPage.map((course) => (
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
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={!hasLess} onClick={() => setPage(page - 1)}>Previous</button>
        <button disabled={!hasMore} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
