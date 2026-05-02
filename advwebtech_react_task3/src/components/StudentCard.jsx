import PropTypes from "prop-types";
import CourseTag from "./CourseTag";
import StatBadge from "./StatBadge";
import { useStudents } from "../context/StudentContext";

function StudentCard({ student }) {
    const { favorites, toggleFavorite, removeStudent } = useStudents();

    const colors = ["#2563eb", "#16a34a", "#9333ea", "#dc2626"];
    const isFavorite = favorites.includes(student.id);

    return (
        <div className={`student-card ${isFavorite ? "favorite-card" : ""}`}>
            <img src={student.avatar} alt={student.name} className="avatar" />

            <h3>{student.name}</h3>
            <p>ID: {student.id}</p>
            <p>Major: {student.major}</p>

            <div className="stats">
                <StatBadge label="GPA" value={student.gpa} />
                <StatBadge label="Courses" value={student.courses.length} />
            </div>

            <div className="courses">
                {student.courses.map((course, index) => (
                    <CourseTag
                        key={course}
                        courseName={course}
                        color={colors[index % colors.length]}
                    />
                ))}
            </div>

            <button className="favorite-btn" onClick={() => toggleFavorite(student.id)}>
                {isFavorite ? "❤️ Favorite" : "🤍 Add Favorite"}
            </button>

            <button className="remove-btn" onClick={() => removeStudent(student.id)}>
                Remove Student
            </button>
        </div>
    );
}

StudentCard.propTypes = {
    student: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        gpa: PropTypes.number.isRequired,
        major: PropTypes.string.isRequired,
        courses: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default StudentCard;