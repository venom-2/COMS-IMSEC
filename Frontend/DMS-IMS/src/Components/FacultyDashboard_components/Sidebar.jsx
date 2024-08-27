import React from 'react'
import './Sidebar.css'
import { ToggleContext } from '../../contextAPI/ToggleContext'
import { Link } from 'react-router-dom'

const Sidebar = () => {

    const { toggleState, setToggleState } = React.useContext(ToggleContext);


    return (
        <div className='sidebar-container'>
            <div className="sidebar d-flex flex-column align-content-between">
                <div className="categories d-flex flex-column gap-4">
                    <div className="dashboard">
                        <Link to='/dashboardfaculty/home' style={{ textDecoration: 'none' }}>
                            <i class="fa-solid fa-house fa-2xl"></i>
                            <span className={`${toggleState ? 'show' : 'hide'} mx-3`}> Dashboard</span>
                        </Link>
                    </div>
                    <div className="add-student">
                        <Link to='/dashboardfaculty/add-students' style={{ textDecoration: 'none' }}>
                            <i class="fa-solid fa-user-plus fa-2xl"></i>
                            <span className={`${toggleState ? 'show' : 'hide'} mx-3`}>Add Student</span>
                        </Link>
                    </div>
                    <div className="add-marks">
                        <Link to='/dashboardfaculty/add-marks' style={{ textDecoration: 'none' }}>
                            <i class="fa-solid fa-plus fa-2xl"></i>
                            <span className={`${toggleState ? 'show' : 'hide'} mx-4`}>Add Marks</span>
                        </Link>
                    </div>
                    <div className="view-co">
                        <Link to='/dashboardfaculty/view-co' style={{ textDecoration: 'none' }}>
                            <i class="fa-solid fa-file fa-2xl"></i>
                            <span className={`${toggleState ? 'show' : 'hide'} mx-4`}> View CO</span>
                        </Link>
                    </div>
                </div>
                <div className="settings-container mt-auto mb-3">
                    <div className="settings">
                        <i class="fa-solid fa-gear fa-2xl"></i>
                        <span className={`${toggleState ? 'show' : 'hide'} mx-3`}>Settings</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar