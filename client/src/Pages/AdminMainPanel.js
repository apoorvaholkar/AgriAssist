import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminMainPanel.css";

const AdminMainPanel = () => {
  const [loanApplications, setLoanApplications] = useState([]);
  const [error, setError] = useState("");
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [viewApplication, setViewApplication] = useState(null);
  const [showRevertPopup, setShowRevertPopup] = useState(false);
  const [selectedAadhar, setSelectedAadhar] = useState(null);
  const [reviewMessage, setReviewMessage] = useState("");

  useEffect(() => {
    const fetchLoanApplications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/loan-applications");
        if (response.status === 200) {
          setLoanApplications(response.data.data);
        } else {
          setError("Failed to fetch loan applications.");
        }
      } catch (err) {
        console.error("Error fetching loan applications:", err);
        setError("An error occurred while fetching loan applications.");
      }
    };

    fetchLoanApplications();
  }, []);

  const handleStatusUpdate = async (aadharNumber, status, reviewMessage = "") => {
    try {
      const response = await axios.post("http://localhost:5000/admin/update-loan-status", {
        aadharNumber,
        status,
        reviewMessage,
      });

      if (response.status === 200) {
        alert('Loan status updated to ${status} successfully!');
        const updatedApplications = loanApplications.map((application) =>
          application.aadharNumber === aadharNumber
            ? { ...application, status, reviewMessage }
            : application
        );
        setLoanApplications(updatedApplications);
        setShowRevertPopup(false);
      } else {
        alert("Failed to update loan status.");
      }
    } catch (err) {
      console.error("Error updating loan status:", err);
      alert("An error occurred while updating the loan status.");
    }
  };

  const openRevertPopup = (aadharNumber) => {
    setSelectedAadhar(aadharNumber);
    setShowRevertPopup(true);
  };

  const closeRevertPopup = () => {
    setShowRevertPopup(false);
    setReviewMessage("");
  };

  const submitRevertedStatus = () => {
    handleStatusUpdate(selectedAadhar, "Reverted", reviewMessage);
  };

  const openViewPopup = async (aadharNumber) => {
    try {
      const response = await axios.get('http://localhost:5000/admin/view-application/${aadharNumber}');
      if (response.status === 200) {
        setViewApplication(response.data.data);
        setShowViewPopup(true);
      } else {
        alert("Failed to fetch application details.");
      }
    } catch (err) {
      console.error("Error fetching application details:", err);
      alert("An error occurred while fetching application details.");
    }
  };

  const closeViewPopup = () => {
    setShowViewPopup(false);
    setViewApplication(null);
  };

  return (
      <div className="admin-panel-container">
        <h2 className="admin-panel-title">Admin Panel - Loan Applications</h2>
        {error && <p className="error-message">{error}</p>}
        {!error && loanApplications.length > 0 ? (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Aadhar Number</th>
                  <th>Bank Name</th>
                  <th>Loan Amount</th>
                  <th>Repayment Months</th>
                  <th>Timestamp</th>
                  <th>Loan Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loanApplications.map((application, index) => (
                  <tr key={index} className="table-row">
                    <td>{application.fullName}</td>
                    <td>{application.aadharNumber}</td>
                    <td>{application.bankName}</td>
                    <td>{application.loanAmount}</td>
                    <td>{application.repaymentMonths}</td>
                    <td>{new Date(application.timestamp).toLocaleString()}</td>
                    <td
                      className={
                        application.loanStatus === "Approved"
                          ? "status-approved"
                          : application.loanStatus === "Rejected"
                          ? "status-rejected"
                          : "status-reverted"
                      }
                    >
                      {application.loanStatus}
                    </td>
                    <td className="action-buttons">
                      <button
                        className="button button-approve"
                        onClick={() => handleStatusUpdate(application.aadharNumber, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="button button-reject"
                        onClick={() => handleStatusUpdate(application.aadharNumber, "Rejected")}
                      >
                        Reject
                      </button>
                      <button
                        className="button button-revert"
                        onClick={() => openRevertPopup(application.aadharNumber)}
                      >
                        Revert
                      </button>
                      <button
                        className="button button-view"
                        onClick={() => openViewPopup(application.aadharNumber)}
                      >
                        View Application
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-data">No loan applications found.</p>
        )}
    
        {/* Revert Popup */}
        {showRevertPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>Add Review Message</h3>
              <textarea
                className="input-field"
                rows="4"
                placeholder="Enter your review message..."
                value={reviewMessage}
                onChange={(e) => setReviewMessage(e.target.value)}
              ></textarea>
              <div className="flex justify-end">
                <button
                  className="button button-approve"
                  onClick={submitRevertedStatus}
                >
                  Submit
                </button>
                <button
                  className="button"
                  onClick={closeRevertPopup}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
    
        {/* View Popup */}
        {showViewPopup && viewApplication && (
          <div className="popup">
            <div className="popup-content">
              <h3>Application Details</h3>
              <ul>
                {Object.entries(viewApplication).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
              <div className="flex justify-end">
                <button className="button" onClick={closeViewPopup}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    
  );
};

export default AdminMainPanel;