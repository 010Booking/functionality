// Seat.js
import React from "react";
import styled from "styled-components";

const StyledSeat = styled.button`
  width: 20px;
  height: 20px;
  background-color: ${(props) => (props.selected ? "orange" : "black")};
  border: none;
  margin: 2px;

  &:hover {
    background-color: lightgray;
  }
`;
const Seat = ({ selected, onClick }) => {
  return <StyledSeat selected={selected} onClick={onClick} />;
};

export default Seat;
