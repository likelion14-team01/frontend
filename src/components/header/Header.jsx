import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ title, showBack = true, rightContent = null }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className="header">
      <div className="headerLeft">
        {showBack && (
          <button
            type="button"
            className="backButton"
            onClick={handleBack}
            aria-label="뒤로가기"
          >
            ‹
          </button>
        )}
      </div>

      <h1 className="headerTitle">{title}</h1>

      <div className="headerRight">
        {rightContent}
      </div>
    </header>
  );
}

export default Header;

