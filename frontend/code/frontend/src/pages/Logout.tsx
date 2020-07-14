import React from "react";

const Logout: React.FC = () => {
  let auth = localStorage.getItem("ga-auth");
  if (auth != undefined) {
    localStorage.removeItem("ga-auth");
  }
  window.location.href = "/home";

  return (
    <div className="container logout">
      <strong>
        <p>Logging out</p>
      </strong>
    </div>
  );
};

export default Logout;
