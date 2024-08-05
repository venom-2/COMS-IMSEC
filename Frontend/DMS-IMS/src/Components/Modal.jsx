import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Modal = ({ onClose, onConfirm, userId, body }) => {
  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header justify-content-center">
            <h5 className="modal-title text-center text-dark">Confirm Removal</h5>
          </div>
          <div className="modal-body text-dark">
            <p>{body}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={()=>{onConfirm(userId)}}>Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
