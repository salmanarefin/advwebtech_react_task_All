import { useTheme } from "../context/ThemeContext";
import { useStudents } from "../context/StudentContext";

function DashboardHeader() {
    const { theme, toggleTheme } = useTheme();
    const { sortedStudents, favorites } = useStudents();

    return (
        <header className="dashboard-header">
            <h1>Student Dashboard</h1>
            <p>Manage student information easily</p>

            <nav>
                <a href="#">Home</a>
                <a href="#">Students</a>
                <a href="#">Courses</a>
            </nav>

            <div className="header-stats">
                <h3>Total Students: {sortedStudents.length}</h3>
                <h3>Favorites: {favorites.length}</h3>
            </div>

            <button className="theme-btn" onClick={toggleTheme}>
                {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
        </header>
    );
}

export default DashboardHeader;