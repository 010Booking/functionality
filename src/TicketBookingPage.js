import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// // 파이어베이스 연동 설정...
// const firebaseConfig = {
//   // 여기에 파이어베이스 설정 정보...
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

const Modal = styled.div`
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;

  /* Modal Content */
  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
`;

const Container = styled.div`
  //#AFAEB1
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  background-color: #ffff; // 웹 페이지 배경 색상 변경
`;

const Title = styled.h1``;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CheckboxLabel = styled.label`
  margin-left: 10px;
  color: #80758f; // 체크박스 라벨의 글자 색상 변경
`;

const Checkbox = styled.input`
  color: #80758f; // 체크박스의 색상 변경
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #958f9c; // 버튼의 배경 색상 변경
  color: #010f29; // 버튼의 글자 색상 변경
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

// TicketBookingPage 컴포넌트 코드...

function TicketBookingPage() {
  const [phone, setPhone] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleCheckReservation = async () => {
    setShowModal(true);
  };
  const handleConfirm = async () => {
    // const reservationRef = db.collection("reservations").doc(phone);
    // const doc = await reservationRef.get();
    // if (doc.exists) {
    //   console.log("Reservation found:", doc.data());
    // } else {
    //   console.log("No such reservation!");
    // }
    setShowModal(false);
  };
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [peopleCount, setPeopleCount] = useState(1);
  const dates = ["2024.11.11", "2024.11.12", "2024.11.13"];
  const seats = Array.from({ length: 200 }, (_, i) => i + 1);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  const isDateSelected = selectedDates.length > 0;

  const handleBookTicket = () => {
    console.log("예매 완료: ", selectedDates, selectedSeats);
    // TODO: 실제 예매 로직 구현

    navigate("/personal-info"); // '/personal-info' 경로로 이동합니다.
  };

  const handleDateSelect = (date) => {
    setSelectedDates((prevDates) =>
      prevDates.includes(date)
        ? prevDates.filter((d) => d !== date)
        : [...prevDates, date]
    );
  };

  const handleSeatSelect = (seat) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat)
        ? prevSeats.filter((s) => s !== seat)
        : [...prevSeats, seat]
    );
  };

  const handlePeopleCountChange = (e) => {
    setPeopleCount(Number(e.target.value)); // 문자열을 숫자로 변환
    setSelectedSeats([]); // 사람 수를 변경할 때마다 좌석 선택을 초기화합니다.
  };

  return (
    <Container>
      <Title>날짜 선택</Title>
      {dates.map((date) => (
        <CheckboxContainer key={date}>
          <input
            type="checkbox"
            checked={selectedDates.includes(date)}
            onChange={() => handleDateSelect(date)}
          />
          <CheckboxLabel>{date}</CheckboxLabel>
        </CheckboxContainer>
      ))}

      <Title>사람 수 선택</Title>
      <input
        type="number"
        min="1"
        max="200"
        value={peopleCount}
        onChange={handlePeopleCountChange}
      />

      <Title>좌석 선택</Title>
      {seats.map((seat) => (
        <CheckboxContainer key={seat}>
          <input
            type="checkbox"
            disabled={!isDateSelected || selectedSeats.length >= peopleCount} // 날짜가 선택되지 않았으면 좌석 선택을 비활성화
            checked={selectedSeats.includes(seat)}
            onChange={() => handleSeatSelect(seat)}
          />
          <CheckboxLabel>좌석 {seat}</CheckboxLabel>
        </CheckboxContainer>
      ))}

      <Button onClick={handleBookTicket}>티켓 예매</Button>
      <Container>
        {/* ... */}
        <Button onClick={handleCheckReservation}>예매 확인</Button>
        {showModal && (
          <Modal>
            <div className="modal-content">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="전화번호 입력"
              />
              <button onClick={handleConfirm}>확인</button>
            </div>
          </Modal>
        )}
      </Container>
    </Container>
  );
}

export default TicketBookingPage;
