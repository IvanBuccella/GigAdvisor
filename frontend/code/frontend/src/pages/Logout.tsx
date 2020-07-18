import React from "react";
import { Utils } from "../core/Utils";
const utilities = new Utils();

const Logout: React.FC = () => {
  if (utilities.getUserToken() != null) {
    localStorage.removeItem("ga-auth");
  }
  utilities.pageRedirect("home");

  return (
    <div className="container logout">
      <strong>
        <p>Logging out</p>
      </strong>
    </div>
  );
};

export default Logout;
