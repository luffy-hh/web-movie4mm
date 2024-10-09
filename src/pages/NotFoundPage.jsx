// NotFoundPage.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const history = useNavigate();

  useEffect(() => {
    // Redirect to home page after 0 seconds
    const timer = setTimeout(() => {
      history("/");
    }, 10000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [history]);

  return (
    <div className="text-center h-screen flex flex-col justify-center items-center">
      <h1>404 - Page Not Found</h1>
      <p>
        If you are not redirected,{" "}
        <a href="/" className="text-underlined">
          click here
        </a>
        .
      </p>
    </div>
  );
};

export default NotFoundPage;
