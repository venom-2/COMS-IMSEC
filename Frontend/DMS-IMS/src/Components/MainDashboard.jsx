import React from 'react';

const MainDashboard = () => {
  // Dummy report data, replace this with actual report data fetched from backend
  const reports = [
    { id: 1, name: 'Report 1', date: '2024-05-31', format: 'PDF' },
    { id: 2, name: 'Report 2', date: '2024-05-30', format: 'Excel' },
    { id: 3, name: 'Report 3', date: '2024-05-29', format: 'Word' },
    // Add more report objects as needed
  ];

  // Function to download a report
  const downloadReport = (reportId) => {
    // Replace this with actual download logic
    console.log(`Downloading report with ID: ${reportId}`);
    // Implement logic to download the report
  };

  return (
    <div>
      {/* Main Content */}
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Main Dashboard</h1>
        </div>

        <div className="card">
          <div className="card-body">
            <h2 className="h4 mb-4">Reports</h2>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Format</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report, index) => (
                    <tr key={report.id}>
                      <td>{index + 1}</td>
                      <td>{report.name}</td>
                      <td>{report.date}</td>
                      <td>{report.format}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => downloadReport(report.id)}
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <button className="btn btn-dark btn-lg">Download All Reports</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainDashboard;
