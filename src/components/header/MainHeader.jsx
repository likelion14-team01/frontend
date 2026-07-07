import React from "react";
import "./MainHeader.css";

function MainHeader({ title = "홈" }) {
  return (
    <header className="mainHeader">
      <h1 className="mainHeaderTitle">{title}</h1>
    </header>
  );
}

export default MainHeader;
