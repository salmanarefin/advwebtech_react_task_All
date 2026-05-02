import { useStudents } from "../context/StudentContext";

function SearchBar() {
    const { query, setQuery } = useStudents();

    return (
        <input
            className="search-bar"
            type="text"
            placeholder="Search by name or major..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}

export default SearchBar;