import React, { useEffect, useState } from 'react';
import './HodDashboard_addFaculty.css';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-hot-toast';
import RemoveAssignedSubjectModal from '../RemoveAssignedSubjectModal'; // Import the modal

const HodDashboard_assignFaculty = () => {
    const [faculties, setFaculties] = useState([]);
    const [year, setYear] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [deleteSubject, setDeleteSubject] = useState({ userId: '', subjectId: '' });
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [currentAssignedSubjects, setCurrentAssignedSubjects] = useState([]);
    const [credentials, setCredentials] = useState({
        department: jwtDecode(localStorage.getItem('authToken')).user.department,
        userid: '',
        subjectid: ''
    });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchFaculties = async () => {
            try {
                const response = await fetch('https://dms-backend-eight.vercel.app/fetch/faculty', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authToken': localStorage.getItem('authToken'),
                    },
                    body: JSON.stringify({ department: jwtDecode(localStorage.getItem('authToken')).user.department }),
                });
                const data = await response.json();
                setFaculties(data.faculty || []);
            } catch (err) {
                console.error('Error fetching faculties:', err);
            }
        };

        fetchFaculties();
    }, []);

    const fetchSubjects = async (e) => {
        const selectedYear = e.target.value;
        setYear(selectedYear);

        try {
            const response = await fetch('https://dms-backend-eight.vercel.app/fetch/subject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken'),
                },
                body: JSON.stringify({ year: selectedYear }),
            });
            const data = await response.json();
            setSubjects(data.subjects || []);
        } catch (err) {
            console.error('Error fetching subjects:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(selectedFaculty, selectedSubject, credentials.department);
            const response = await fetch('https://dms-backend-eight.vercel.app/add/assignfaculty', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken'),
                },
                body: JSON.stringify({ userId: selectedFaculty, subjectId: selectedSubject, department: credentials.department }),
            });
            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                // Update the faculties state without adding a new row
                setFaculties((prevFaculties) =>
                    prevFaculties.map((faculty) =>
                        faculty._id === selectedFaculty
                            ? { ...faculty, assignedSubjects: [...faculty.assignedSubjects, selectedSubject] }
                            : faculty
                    )
                );
                resetForm();
            } else {
                console.error(data);
                toast.error(data.message);
                resetForm();
            }
        } catch (err) {
            console.error(data.message);
        }
    };

    const resetForm = () => {
        setSelectedFaculty('');
        setSelectedSubject('');
        setYear('');
        setSubjects([]);
    };

    const openModal = () => {
        console.log({ currentAssignedSubjects });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const confirmModal = async (e) => {
        e.preventDefault();
        try {
            console.log(deleteSubject);
            const response = await fetch('https://dms-backend-eight.vercel.app/delete/assignedsubject', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken'),
                },
                body: JSON.stringify(deleteSubject),
            });

            const data = await response.json();
            if (data.success) {
                toast.success(data.message);

                // Update the faculties state after removing the subject
                setFaculties((prevFaculties) =>
                    prevFaculties.map((faculty) =>
                        faculty._id === deleteSubject.userId
                            ? { ...faculty, assignedSubjects: faculty.assignedSubjects.filter(subject => subject !== deleteSubject.subjectId) }
                            : faculty
                    )
                );

                resetForm();
            } else {
                console.error(data);
                toast.error(data.message);
            }
        } catch (err) {
            console.error('Error:', err);
            toast.error('Failed to remove the assigned subject.');
        } finally {
            closeModal();
        }
    };


    const handleSelectAssignedSubjects = (faculty) => {
        setCurrentAssignedSubjects(faculty.assignedSubjects);
    };

    return (
        <div className='add-faculty-container d-flex flex-column align-items-center' style={{marginTop: '70px'}}>
            <div className="heading-faculty h-20 d-flex justify-content-center mt-2">
                <h2>Assign Faculty to Courses</h2>
            </div>
            <div className="form-faculty d-flex justify-content-center mt-2">
                <form className="d-flex flex-column gap-3" id='form' onSubmit={handleSubmit}>
                    <div className="first-row d-flex gap-5 flex-wrap">
                        <div className="name d-flex flex-column col md-6">
                            <label htmlFor="name">Name of the Faculty</label>
                            <select
                                className='form-control'
                                id="name"
                                name="name"
                                required
                                value={selectedFaculty}
                                onChange={(e) => setSelectedFaculty(e.target.value)}
                            >
                                <option value="">Select Faculty</option>
                                {faculties.map((faculty) => (
                                    <option key={faculty._id} value={faculty._id}>{faculty.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="department d-flex flex-column col md-6">
                            <label htmlFor="department">Department</label>
                            <input
                                className='form-control'
                                type="text"
                                id="department"
                                name="department"
                                value='Computer Science'
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="email d-flex flex-column flex-wrap">
                        <label htmlFor="year">Year</label>
                        <select
                            className='form-control'
                            id="year"
                            name="year"
                            required
                            value={year}
                            onChange={fetchSubjects}
                        >
                            <option value="" disabled>Select Year</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                        </select>
                    </div>
                    <div className="third-row d-flex gap-5 flex-wrap">
                        <div className="password d-flex flex-column col md-6">
                            <label htmlFor="subject">Subject</label>
                            <select
                                className='form-control'
                                id="subject"
                                name="subject"
                                required
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                            >
                                <option value="">Select Subject</option>
                                {subjects.map((subject) => (
                                    <option key={subject._id} value={subject._id}>{subject.subjectName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="confirm-password d-flex flex-column col md-6">
                            <label htmlFor="section">Section</label>
                            <select className='form-control' id="section" name="section" required>
                                <option value="">Select Section</option>
                                <option value="A">Section-01</option>
                                <option value="B">Section-02</option>
                                <option value="C">Section-03</option>
                                <option value="D">Section-04</option>
                            </select>
                        </div>
                    </div>
                    <div className="submit d-flex justify-content-center">
                        <input className='submit-btn' type="submit" value="Assign Faculty" />
                    </div>
                </form>
            </div>
            <div className="faculty-table mt-2">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr. No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Department</th>
                            <th scope="col">Email</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {faculties.map((faculty, index) => (
                            <tr key={faculty._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{faculty.name}</td>
                                <td>{faculty.department}</td>
                                <td>{faculty.email}</td>
                                <td>
                                    <select
                                        className='form-select'
                                        style={{ width: '300px' }}
                                        onFocus={() => handleSelectAssignedSubjects(faculty)}
                                        onChange={(e) => { setDeleteSubject({ userId: faculty._id, subjectId: e.target.value }) }}
                                    >
                                        <option value="">Assigned Subject(s)</option>
                                        {faculty.assignedSubjects.map((subject) => (
                                            <option key={subject} value={subject}>{subject}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <button className='btn btn-danger' onClick={openModal}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <RemoveAssignedSubjectModal
                show={showModal}
                onClose={closeModal}
                onConfirm={confirmModal}
            />
        </div>
    );
};

export default HodDashboard_assignFaculty;
