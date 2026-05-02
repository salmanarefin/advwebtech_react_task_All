import { useEffect, useState } from "react";
import { useStudents } from "../context/StudentContext";

function AddStudentForm() {
    const { students, addStudent } = useStudents();

    const [formData, setFormData] = useState({
        name: "",
        id: "",
        major: "",
        gpa: "",
        courses: "",
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    function validate() {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        }

        if (!formData.id.trim()) {
            newErrors.id = "Student ID is required";
        } else if (!/^\d+$/.test(formData.id)) {
            newErrors.id = "Student ID must be numeric";
        } else if (students.some((student) => student.id === formData.id)) {
            newErrors.id = "Student ID must be unique";
        }

        if (!formData.major.trim()) {
            newErrors.major = "Major is required";
        }

        const gpaNumber = Number(formData.gpa);

        if (formData.gpa === "") {
            newErrors.gpa = "GPA is required";
        } else if (gpaNumber < 0 || gpaNumber > 4) {
            newErrors.gpa = "GPA must be between 0 and 4.0";
        }

        return newErrors;
    }

    function handleSubmit(e) {
        e.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const newStudent = {
            id: formData.id,
            name: formData.name,
            avatar: `https://i.pravatar.cc/150?u=${formData.id}`,
            gpa: Number(formData.gpa),
            major: formData.major,
            courses: formData.courses
                .split(",")
                .map((course) => course.trim())
                .filter((course) => course !== ""),
        };

        addStudent(newStudent);

        setFormData({
            name: "",
            id: "",
            major: "",
            gpa: "",
            courses: "",
        });

        setSuccess(true);
    }

    useEffect(() => {
        if (!success) return;

        const timer = setTimeout(() => {
            setSuccess(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [success]);

    return (
        <section className="form-section">
            <h2>Add New Student</h2>

            {success && <p className="success-message">Student added successfully!</p>}

            <form className="student-form" onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <small>{errors.name}</small>}
                </div>

                <div>
                    <input
                        type="text"
                        name="id"
                        placeholder="Student ID"
                        value={formData.id}
                        onChange={handleChange}
                    />
                    {errors.id && <small>{errors.id}</small>}
                </div>

                <div>
                    <input
                        type="text"
                        name="major"
                        placeholder="Major"
                        value={formData.major}
                        onChange={handleChange}
                    />
                    {errors.major && <small>{errors.major}</small>}
                </div>

                <div>
                    <input
                        type="number"
                        step="0.1"
                        name="gpa"
                        placeholder="GPA"
                        value={formData.gpa}
                        onChange={handleChange}
                    />
                    {errors.gpa && <small>{errors.gpa}</small>}
                </div>

                <div>
                    <input
                        type="text"
                        name="courses"
                        placeholder="Courses: React, CSS, JavaScript"
                        value={formData.courses}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Add Student</button>
            </form>
        </section>
    );
}

export default AddStudentForm;