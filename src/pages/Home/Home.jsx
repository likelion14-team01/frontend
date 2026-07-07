import React from "react";
import MainHeader from "../../components/header/MainHeader";
import Header from "../../components/header/Header";

function Home() {
  return (
    <div>
      <MainHeader title="홈" />

      <div style={{ height: "20px", backgroundColor: "#f5f5f5" }} />

      <Header title="식물등록" />

      <main style={{ padding: "20px" }}>
        <p>헤더 확인용 화면입니다.</p>
      </main>
    </div>
  );
}

export default Home;