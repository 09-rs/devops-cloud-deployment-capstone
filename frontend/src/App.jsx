import { useEffect, useState } from "react";

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/courses")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        return response.json();
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load courses");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1>🚀 DevOps Learning Portal</h1>

      <p>Learn DevOps by building real projects.</p>

      <h2>Courses</h2>

      {loading && <p>Loading courses...</p>}

      {error && <p>{error}</p>}

      {courses.map((course) => (
        <div className="course" key={course.id}>
          <h3>{course.name}</h3>
          <p>
            <strong>Level:</strong> {course.level}
          </p>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;