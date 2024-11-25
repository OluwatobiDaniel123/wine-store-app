import React, { useState } from "react";

const AgeVerification = () => {
  const [showPopup, setShowPopup] = useState(true); // Controls the popup visibility
  const [isVerified, setIsVerified] = useState(false); // Tracks age verification status

  const handleVerification = (isOver19) => {
    if (isOver19) {
      setIsVerified(true); // Allow access
    } else {
      alert("You must be over 19 to access this site.");
      window.location.href = "https://google.com"; // Redirect if underage
    }
    setShowPopup(false); // Close the popup
  };

  return (
    <>
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              width: "300px",
            }}
          >
            <h2>Age Verification</h2>
            <p>Are you over 19 years old?</p>
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={() => handleVerification(true)}
                style={{
                  padding: "10px 20px",
                  marginRight: "10px",
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Yes
              </button>
              <button
                onClick={() => handleVerification(false)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {isVerified && (
        <div>
          <h1>Welcome to the site!</h1>
          {/* Your website content here */}
        </div>
      )}
    </>
  );
};

export default AgeVerification;
