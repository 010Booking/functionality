import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  color: #333;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

function PersonalInfoPage() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNamesChange = (names) => {
    dispatch({ type: "SET_NAMES", names });
  };

  const handlePhoneNumberChange = (phoneNumber) => {
    dispatch({ type: "SET_PHONE_NUMBER", phoneNumber });
  };

  const handleEmailChange = (email) => {
    dispatch({ type: "SET_EMAIL", email });
  };

  const handleSubmit = () => {
    if (email !== confirmEmail) {
      alert("이메일이 일치하지 않습니다. 다시 확인해주세요.");
      return;
    }

    const isConfirmed = window.confirm(`
      이름: ${name}
      전화번호: ${phoneNumber}
      이메일: ${email}
      이 정보가 맞습니까?
    `);

    if (isConfirmed) {
      console.log(
        `Name: ${name}, Phone Number: ${phoneNumber}, Email: ${email}`
      );
      // 개인정보 입력이 완료되면 계좌번호 안내 페이지로 이동
      navigate("/payment-info");
    }
  };

  return (
    <Container>
      <Title>예매자 정보 입력</Title>
      <InputContainer>
        <Label>이름</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            handleNamesChange(e.target.value);
          }}
        />
      </InputContainer>

      <InputContainer>
        <Label>전화번호</Label>
        <Input
          type="tel"
          value={phoneNumber}
          placeholder="- 없이 입력해 주세요"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            handlePhoneNumberChange(e.target.value);
          }}
        />
      </InputContainer>

      <Label>이메일</Label>
      <Input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          handleEmailChange(e.target.value);
        }}
      />

      <InputContainer>
        <Label>이메일 재확인</Label>
        <Input
          type="email"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
        />
      </InputContainer>

      <Button onClick={handleSubmit}>제출</Button>
    </Container>
  );
}

export default PersonalInfoPage;
