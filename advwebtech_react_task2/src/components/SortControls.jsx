import PropTypes from "prop-types";

function SortControls({ sortType, setSortType }) {
    return (
        <div className="sort-controls">
            <button
                className={sortType === "default" ? "active" : ""}
                onClick={() => setSortType("default")}
            >
                Default
            </button>

            <button
                className={sortType === "name" ? "active" : ""}
                onClick={() => setSortType("name")}
            >
                Name A-Z
            </button>

            <button
                className={sortType === "gpa" ? "active" : ""}
                onClick={() => setSortType("gpa")}
            >
                GPA High-Low
            </button>
        </div>
    );
}

SortControls.propTypes = {
    sortType: PropTypes.string.isRequired,
    setSortType: PropTypes.func.isRequired,
};

export default SortControls;