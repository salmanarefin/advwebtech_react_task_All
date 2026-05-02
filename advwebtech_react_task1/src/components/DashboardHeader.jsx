import PropTypes from "prop-types";

function DashboardHeader({ title, tagline, totalStudents, favoriteCount }) {
    return (
        <header className="dashboard-header">
            <h1>{title}</h1>
            <p>{tagline}</p>

            <nav>
                <a href="#">Home</a>
                <a href="#">Students</a>
                <a href="#">Courses</a>
            </nav>

            <div className="header-stats">
                <h3>Total Students: {totalStudents}</h3>
                <h3>Favorites: {favoriteCount}</h3>
            </div>
        </header>
    );
}

DashboardHeader.propTypes = {
    title: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    totalStudents: PropTypes.number.isRequired,
    favoriteCount: PropTypes.number.isRequired,
};

export default DashboardHeader;