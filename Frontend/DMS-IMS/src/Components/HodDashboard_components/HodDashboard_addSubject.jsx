import React, { useEffect } from 'react';
import './HodDashboard_addFaculty.css';
import Modal from '../Modal';
import { toast } from 'react-hot-toast';

const HodDashboard_addSubject = () => {
    const [subjects, setSubjects] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [selectedSubjectId, setSelectedSubjectId] = React.useState(null);
    const [formData, setFormData] = React.useState({
        subjectName: '',
        subjectCode: '',
        year: '',
        subjectNAACCode: '',
        subjectType: '',
    });

    const handleRemove = async () => {
        try {
            const response = await fetch(`https://dms-backend-eight.vercel.app/delete/subject/${selectedSubjectId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': `${localStorage.getItem('authToken')}`,
                },
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Subject removed successfully');
                fetchSubjects();
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error('Error removing subject');
        } finally {
            setShowModal(false);
            setSelectedSubjectId(null);
        }
    };

    const fetchSubjects = async () => {
        try {
            const response = await fetch('https://dms-backend-eight.vercel.app/fetch/subjects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken'),
                },
            });
            const data = await response.json();
            setSubjects(data.subjects || []);
        } catch (err) {
            console.error('Error fetching subjects:', err);
            toast.error('Error fetching subjects');
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://dms-backend-eight.vercel.app/add/subject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken'),
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                fetchSubjects();
                setFormData({
                    subjectName: '',
                    subjectCode: '',
                    year: '',
                    subjectNAACCode: '',
                    subjectType: '',
                });
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error(data.message);
        }
    };

    const openModal = (subjectId) => {
        setSelectedSubjectId(subjectId);
        setShowModal(true);
    };

    return (
        <div className='add-faculty-container d-flex flex-column align-items-center'>
            <div className="heading-faculty h-20 d-flex justify-content-center mt-2">
                <h2>Add Subject</h2>
            </div>
            <div className="form-faculty d-flex justify-content-center mt-2">
                <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
                    <div className="first-row d-flex gap-5 flex-wrap">
                        <div className="name d-flex flex-column col md-6">
                            <label htmlFor="subjectName">Subject Name</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter name of the subject'
                                name="subjectName"
                                value={formData.subjectName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="department d-flex flex-column col md-6">
                            <label htmlFor="subjectCode">Subject Code</label>
                            <input
                                className='form-control'
                                type="text"
                                placeholder='Enter Subject Code'
                                name="subjectCode"
                                value={formData.subjectCode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="email d-flex flex-column flex-wrap">
                        <label htmlFor="year">Year</label>
                        <select
                            className='form-control'
                            id="year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            required
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
                            <label htmlFor="naacCode">NAAC Code</label>
                            <input
                                className='form-control'
                                type="text"
                                placeholder='Enter NAAC Code'
                                name="subjectNAACCode"
                                value={formData.subjectNAACCode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="confirm-password d-flex flex-column col md-6">
                            <label htmlFor="subjectType">Subject Type</label>
                            <input
                                className='form-control'
                                type="text"
                                placeholder='Enter type of subject'
                                name="subjectType"
                                value={formData.subjectType}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="submit d-flex justify-content-center">
                        <input className='submit-btn' type="submit" value="Add Subject" />
                    </div>
                </form>
            </div>
            <div className="faculty-table mt-2">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr. No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Subject Code</th>
                            <th scope="col">NAAC Code</th>
                            <th scope="col">Subject Type</th>
                            <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((subject, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{subject.subjectName}</td>
                                <td>{subject.subjectCode}</td>
                                <td>{subject.subjectNAACCode}</td>
                                <td>{subject.subjectType}</td>
                                <td><button className='btn btn-danger' onClick={() => openModal(subject._id)}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <Modal
                    onClose={() => setShowModal(false)}
                    onConfirm={handleRemove}
                    userId={selectedSubjectId}
                    body='Are you sure you want to remove this subject?'
                />
            )}
        </div>
    );
};

export default HodDashboard_addSubject;
