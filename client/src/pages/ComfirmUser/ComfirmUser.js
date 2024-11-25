import React, { useState, useEffect } from "react";

const AgeVerification = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check localStorage for age verification status and expiration
    const storedData = localStorage.getItem("ageVerification");
    if (storedData) {
      const { verified, expiry } = JSON.parse(storedData);

      // Check if the stored data has expired
      if (verified && new Date().getTime() < expiry) {
        setShowPopup(false); // User is verified and within the expiration period
        return;
      }
    }
    setShowPopup(true); // Show popup if not verified or expired
  }, []);

  const handleVerification = (isOver19) => {
    if (isOver19) {
      const expirationPeriod = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
      const expiry = new Date().getTime() + expirationPeriod; // Current time + expiration period

      // Save verification status and expiration time to localStorage
      localStorage.setItem(
        "ageVerification",
        JSON.stringify({ verified: true, expiry })
      );
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
            backgroundColor: "rgba(0, 0, 0, 0.1)", // Very transparent
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

      {!showPopup && (
        <div>
          <h1>Welcome to the site!</h1>
          {/* Your website content here */}
        </div>
      )}
    </>
  );
};

export default AgeVerification;
