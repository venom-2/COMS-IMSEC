import React from 'react';

const RemoveAssignedSubjectModal = ({ show, onClose, onConfirm, subjects }) => {
    return (
        <div className={`modal fade ${show ? 'show' : ''}`} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={!show} style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header justify-content-center">
                        <h5 className="modal-title text-dark" id="exampleModalLabel">Remove Assigned Subject</h5>
                    </div>
                    <div className="dropdown p-2">
                        <select name="" id="" className='form-control'>
                            <option value="">Select Subject</option>
                            {subjects.map((sub) => (
                                <option value={sub}>{sub}</option>
                            ))}
                        </select>
                    </div>
                    <div className="modal-body justify-content-center text-dark">
                        Are you sure you want to remove the subject from the faculty?
                        <span className='text-danger mx-2'>Under Development</span>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={onConfirm}>Remove</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RemoveAssignedSubjectModal;
