import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Seat from "./Seat";
import { useDispatch, useSelector } from "react-redux";
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
const MainContainer = styled.div`
  background-color: #00000;
  border-radius: 10px;
`;
const Container = styled.div`
  //#AFAEB1
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  background-color: #0000; // 웹 페이지 배경 색상 변경
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h1``;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const SeatContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  gap: 10px;
  background-color: #958f9c;
  border-radius: 10px;
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

function TicketBookingPage() {
  const [selectedSeats, setSelectedSeats] = useState(Array(200).fill(false));
  const seats = useSelector((state) => state.seats);
  const [phone, setPhone] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
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
  const [peopleCount, setPeopleCount] = useState(0);
  const dates = ["2024.11.11", "2024.11.12", "2024.11.13"];
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져와

  const handleBookTicket = () => {
    if (selectedDates.length === 0) {
      alert("날짜를 선택해 주세요.");
      return;
    }

    if (peopleCount === 0) {
      alert("사람 수를 선택해 주세요.");
      return;
    }

    if (selectedSeats.filter(Boolean).length < peopleCount) {
      alert("좌석을 선택해 주세요.");
      return;
    }

    const selectedSeatNumbers = selectedSeats
      .map((selected, index) => (selected ? index + 1 : null))
      .filter((seatNumber) => seatNumber !== null);
    console.log("예매 완료: ", selectedDates, selectedSeatNumbers);
    // TODO: 실제 예매 로직 구현

    navigate("/personal-info"); // '/personal-info' 경로로 이동
  };
  const selectedSeatNumbers = seats
    .map((seat, index) => (seat ? index + 1 : null))
    .filter((seatNumber) => seatNumber !== null);
  console.log("선택된 좌석 번호:", selectedSeatNumbers);

  const handleDateSelect = (date) => {
    setSelectedDates((prevDates) => {
      const newDates = prevDates.includes(date)
        ? prevDates.filter((d) => d !== date)
        : [...prevDates, date];

      // 선택한 날짜를 Redux에 저장합니다.
      dispatch({ type: "SET_DATE", date: newDates });

      return newDates;
    });
  };

  const handlePeopleCountChange = (e) => {
    const newPeopleCount = Number(e.target.value);
    if (newPeopleCount > peopleCount) {
      // 사람 수를 늘리면 기존에 선택된 좌석을 유지하면서 추가 좌석을 선택할 수 있음
      setPeopleCount(newPeopleCount);
    } else if (newPeopleCount < peopleCount) {
      // 사람 수를 줄이면 가장 나중에 선택된 좌석부터 선택 해제함
      const newSelectedSeats = [...selectedSeats];
      let count = selectedSeats.reduce(
        (count, selected) => count + (selected ? 1 : 0),
        0
      );
      for (
        let i = selectedSeats.length - 1;
        i >= 0 && count > newPeopleCount;
        i--
      ) {
        if (newSelectedSeats[i]) {
          newSelectedSeats[i] = false;
          count--;
        }
      }
      setSelectedSeats(newSelectedSeats);
      setPeopleCount(newPeopleCount);

      // Redux action을 직접 dispatch합니다.
      dispatch({
        type: "SET_NUMBER_OF_PEOPLE",
        numberOfPeople: newPeopleCount,
      });
      dispatch({ type: "SET_SEATS", seats: newSelectedSeats });
    }

    // Redux action을 직접 dispatch합니다.
    dispatch({ type: "SET_NUMBER_OF_PEOPLE", numberOfPeople: newPeopleCount });
  };
  const handleSeatClick = (index) => {
    // 사람 수가 설정되지 않았다면 좌석 선택을 무시
    if (peopleCount === 0) {
      return;
    }

    const selectedSeatCount = selectedSeats.reduce(
      (count, selected) => count + (selected ? 1 : 0),
      0
    );
    if (!selectedSeats[index] && selectedSeatCount >= peopleCount) {
      // 이미 선택한 좌석 수가 사람 수보다 많으면 추가로 좌석을 선택하지 않음
      return;
    }

    const newSelectedSeats = [...selectedSeats];
    newSelectedSeats[index] = !newSelectedSeats[index];
    setSelectedSeats(newSelectedSeats);

    // Redux 상태 업데이트
    dispatch({ type: "SET_SEATS", seats: newSelectedSeats });
  };

  return (
    <Container>
      <MainContainer>
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
          onChange={handlePeopleCountChange} // 변경된 함수를 직접 호출합니다.
          disabled={selectedDates.length === 0}
        />

        <Title>좌석 선택</Title>
        <SeatContainer>
          {selectedSeats.map((selected, index) => (
            <Seat
              key={index}
              selected={selected}
              onClick={() => handleSeatClick(index)} // 변경된 함수를 직접 호출합니다.
            />
          ))}
        </SeatContainer>

        <Button
          onClick={handleBookTicket}
          disabled={
            selectedDates.length === 0 ||
            selectedSeats.filter(Boolean).length < peopleCount
          }
        >
          티켓 예매
        </Button>
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
      </MainContainer>
    </Container>
  );
}

export default TicketBookingPage;
