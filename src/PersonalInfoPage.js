import React, { useState } from "react";
import styled from "styled-components";

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

  const handleSubmit = () => {
    // 사용자가 입력한 이름과 전화번호를 처리하는 로직을 추가합니다.
    // 예를 들어, 서버에 전송하거나 로컬 스토리지에 저장할 수 있습니다.
    console.log(`Name: ${name}, Phone Number: ${phoneNumber}`);
  };

  return (
    <Container>
      <Title>개인 정보 입력</Title>

      <InputContainer>
        <Label>이름</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </InputContainer>

      <InputContainer>
        <Label>전화번호</Label>
        <Input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </InputContainer>

      <Button onClick={handleSubmit}>제출</Button>
    </Container>
  );
}

export default PersonalInfoPage;
