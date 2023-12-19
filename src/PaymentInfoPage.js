// PaymentInfoPage.js
import { useSelector } from "react-redux";
import React from "react";
import styled from "styled-components";
import html2canvas from "html2canvas";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  color: #333;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Info = styled.p`
  margin-bottom: 5px;
`;

function PaymentInfoPage() {
  const handleCaptureClick = () => {
    html2canvas(document.body).then((canvas) => {
      // 캡처된 이미지를 새 탭에서 열기
      const imgURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgURL;
      link.target = "_blank";
      link.click();
    });
  };

  const { date, numberOfPeople, names } = useSelector((state) => ({
    date: state.date,
    numberOfPeople: state.numberOfPeople,
    seats: state.seats,
    names: state.names,
  }));
  const totalCost = numberOfPeople * 1000; // 사람 수에 따른 티켓 가격 계산
  const accountNumber = "1002-755-452471";
  const bank = "우리은행";

  return (
    <Container>
      <Title>결제 정보</Title>

      <InfoContainer>
        <Info>{names} 님의 예매 정보</Info>
        <Info>관람 일시: {date.join(", ")}</Info>
        <Info>관객 수: {numberOfPeople}</Info>
        <Info>티켓 가격: {totalCost} 원</Info>
        <Info>
          계좌 번호: {accountNumber} ({bank})
        </Info>
      </InfoContainer>
      <Container>
        {/* ... */}
        <button onClick={handleCaptureClick}>화면 캡처</button>
      </Container>
    </Container>
  );
}

export default PaymentInfoPage;
