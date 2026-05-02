import { useEffect, useState } from "react";
import DashboardHeader from "./components/DashboardHeader";
import StudentCard from "./components/StudentCard";
import SearchBar from "./components/SearchBar";
import SortControls from "./components/SortControls";
import StatBadge from "./components/StatBadge";
import { students as initialStudents } from "./data/students";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sortType, setSortType] = useState("default");
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(initialStudents);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(query.toLowerCase()) ||
      student.major.toLowerCase().includes(query.toLowerCase())
  );

  const sortedStudents = [...filteredStudents];

  if (sortType === "name") {
    sortedStudents.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortType === "gpa") {
    sortedStudents.sort((a, b) => b.gpa - a.gpa);
  }

  useEffect(() => {
    document.title = `Dashboard - ${sortedStudents.length} Students`;
  }, [sortedStudents.length]);

  function handleFavoriteChange(isFavorite) {
    if (isFavorite) {
      setFavoriteCount((prev) => prev + 1);
    } else {
      setFavoriteCount((prev) => prev - 1);
    }
  }

  if (loading) {
    return <h2 className="loading">Loading students...</h2>;
  }

  return (
    <div className="app">
      <DashboardHeader
        title="Student Dashboard"
        tagline="Manage student information easily"
        totalStudents={sortedStudents.length}
        favoriteCount={favoriteCount}
      />

      <section className="summary">
        <StatBadge label="Displayed Students" value={sortedStudents.length} />
        <StatBadge label="Favorites" value={favoriteCount} />
      </section>

      <section className="controls">
        <SearchBar query={query} setQuery={setQuery} />
        <SortControls sortType={sortType} setSortType={setSortType} />
      </section>

      <main className="student-grid">
        {sortedStudents.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onFavoriteChange={handleFavoriteChange}
          />
        ))}
      </main>
    </div>
  );
}

export default App;