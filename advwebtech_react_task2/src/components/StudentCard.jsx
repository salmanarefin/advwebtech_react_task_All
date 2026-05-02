import { useState } from "react";
import PropTypes from "prop-types";
import CourseTag from "./CourseTag";
import StatBadge from "./StatBadge";

function StudentCard({ student, onFavoriteChange }) {
    const [favorite, setFavorite] = useState(false);

    const colors = ["#2563eb", "#16a34a", "#9333ea", "#dc2626"];

    function handleFavorite() {
        const newFavorite = !favorite;
        setFavorite(newFavorite);
        onFavoriteChange(newFavorite);
    }

    return (
        <div className={`student-card ${favorite ? "favorite-card" : ""}`}>
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

            <button className="favorite-btn" onClick={handleFavorite}>
                {favorite ? "❤️ Favorite" : "🤍 Add Favorite"}
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
    onFavoriteChange: PropTypes.func.isRequired,
};

export default StudentCard;