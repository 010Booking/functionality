// PaymentInfoPage.js
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import styled from "styled-components";
import html2canvas from "html2canvas";
import firebase from "./firebase";

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

  const { date, numberOfPeople, names, phoneNumber, email } = useSelector(
    (state) => ({
      date: state.date,
      numberOfPeople: state.numberOfPeople,
      names: state.names,
      phoneNumber: state.phoneNumber, // 추가된 상태
      email: state.email, // 추가된 상태
    })
  );
  const totalCost = numberOfPeople * 1000; // 사람 수에 따른 티켓 가격 계산
  const accountNumber = "1002-755-452471";
  const bank = "우리은행";
  const handleConfirmClick = () => {
    const db = firebase.firestore();
    db.collection("reservations")
      .add({
        date,
        numberOfPeople,
        names,
        phoneNumber,
        email,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  useEffect(() => {
    const oPay = window.Naver.Pay.create({
      // SDK Parameters를 참고 바랍니다.
      // 각 값은 실제 값을 사용해야 합니다.
      mode: "{#_mode}",
      clientId: "{#_clientId}",
      chainId: "{#_chainId}",
    });

    const elNaverPayBtn = document.getElementById("naverPayBtn");

    elNaverPayBtn.addEventListener("click", () => {
      oPay.open({
        merchantUserKey: "{#_merchantUserKey}",
        merchantPayKey: "{#_merchantPayKey}",
        productName: "{#_productName}",
        totalPayAmount: totalCost,
        taxScopeAmount: totalCost,
        taxExScopeAmount: 0,
        returnUrl: "{#_returnUrl}",
      });
    });
  }, []);

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
      {/* ... */}
      <button onClick={handleConfirmClick}>확인</button>{" "}
      {/* 파이어베이스에 저장 */}
      <button onClick={handleCaptureClick}>화면 캡처</button>
      <button id="naverPayBtn">네이버페이 결제</button>
      <h3> 현재 간편 결제 서비스는 준비 중입니다.</h3>
    </Container>
  );
}

export default PaymentInfoPage;
