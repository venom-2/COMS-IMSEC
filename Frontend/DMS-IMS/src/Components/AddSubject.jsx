import React from 'react'
import toast from 'react-hot-toast';

const AddSubject = () => {
  const[credentials, setCredentials] = React.useState({
    subjectName : "",
    subjectCode : "",
    year : "",
    description : ""
  })

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const addSubject = async()=>{
    const { subjectCode, subjectName, year, description} = credentials;
    const res = await fetch('https://coms-imsec-phi.vercel.app/addData/subject', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        subjectCode, subjectName, year, description
      })
    });
    const data = await res.json();
    if(data.success) {
      toast.success("Subject added successfully!");
    } else {
      toast.error("Subject addition failed!");
    }
    setCredentials({
      subjectName : "",
      subjectCode : "",
      year : "",
      description : ""
    });
  }

  return (
    <div>
      {/* Main Content */}
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Add Subject to Database</h1>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="row mt-4">
              <div className="col-md-6">
                {/* Subject Code */}
                <div className="form-group">
                  <label htmlFor="subjectCode">Subject Code</label>
                  <input type="text" className="form-control" id="subjectCode" placeholder="Enter Subject Code" value={credentials.subjectCode} name='subjectCode' onChange={handleChange}/>
                </div>
              </div>
              <div className="col-md-6">
                {/* Subject Name */}
                <div className="form-group">
                  <label htmlFor="subjectName">Subject Name</label>
                  <input type="text" className="form-control" id="subjectName" placeholder="Enter Subject Name" value={credentials.subjectName} onChange={handleChange} name='subjectName'/>
                </div>
              </div>
              <div className="col-md-4">
                {/* Year */}
                <div className="form-group">
                  <label htmlFor="year">Year</label>
                  <select className="form-control" id="year" name='year' value={credentials.year} onChange={handleChange}>
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                {/* Description */}
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea className="form-control" id="description" rows="3" placeholder="Enter Description" onChange={handleChange} value={credentials.description} name='description'></textarea>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12 text-center">
                <button className="btn btn-dark btn-lg" onClick={addSubject}>Add Subject</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AddSubject
