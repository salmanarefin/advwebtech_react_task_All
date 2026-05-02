import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { students as initialStudents } from "../data/students";

const StudentContext = createContext();

export function StudentProvider({ children }) {
    const [students, setStudents] = useState(() => {
        const savedStudents = localStorage.getItem("students");
        return savedStudents ? JSON.parse(savedStudents) : initialStudents;
    });

    const [query, setQuery] = useState("");
    const [sortType, setSortType] = useState("default");
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        localStorage.setItem("students", JSON.stringify(students));
    }, [students]);

    function addStudent(newStudent) {
        setStudents([...students, newStudent]);
    }

    function removeStudent(id) {
        setStudents(students.filter((student) => student.id !== id));
        setFavorites(favorites.filter((favId) => favId !== id));
    }

    function toggleFavorite(id) {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter((favId) => favId !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    }

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

    return (
        <StudentContext.Provider
            value={{
                students,
                sortedStudents,
                query,
                setQuery,
                sortType,
                setSortType,
                favorites,
                addStudent,
                removeStudent,
                toggleFavorite,
            }}
        >
            {children}
        </StudentContext.Provider>
    );
}

StudentProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function useStudents() {
    return useContext(StudentContext);
}