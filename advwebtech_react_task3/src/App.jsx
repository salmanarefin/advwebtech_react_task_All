import { useEffect } from "react";
import DashboardHeader from "./components/DashboardHeader";
import StudentCard from "./components/StudentCard";
import SearchBar from "./components/SearchBar";
import SortControls from "./components/SortControls";
import AddStudentForm from "./components/AddStudentForm";
import StatBadge from "./components/StatBadge";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { StudentProvider, useStudents } from "./context/StudentContext";

function DashboardContent() {
  const { theme } = useTheme();
  const { sortedStudents, favorites } = useStudents();

  useEffect(() => {
    document.title = `Dashboard - ${sortedStudents.length} Students`;
  }, [sortedStudents.length]);

  return (
    <div className={`app ${theme}`}>
      <DashboardHeader />

      <section className="summary">
        <StatBadge label="Displayed Students" value={sortedStudents.length} />
        <StatBadge label="Favorites" value={favorites.length} />
      </section>

      <section className="controls">
        <SearchBar />
        <SortControls />
      </section>

      <AddStudentForm />

      <main className="student-grid">
        {sortedStudents.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <StudentProvider>
        <DashboardContent />
      </StudentProvider>
    </ThemeProvider>
  );
}

export default App;