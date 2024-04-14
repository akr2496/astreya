import React from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: transparent;
  color: #333;
  padding: 4px 8px;
  font-size: 20px;
  text-align: justify;
  border: 2px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #4caf50; /* Green on hover */
  }
`;

const DropdownContent = styled.div`
  display: none;
  font-size: 15px;
  position: absolute;
  background-color: #fff;
  min-width: 80px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  ${DropdownContainer}:hover & {
    display: block;
    right: calc(100% - 30px); /* Position content on the left side */
  }
`;

const DropdownItem = styled.div`
  color: #333;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f9f9f9; /* Light gray on hover */
  }
`;

const Dropdown = ({ buttonContent, items }) => {
  return (
    <DropdownContainer>
      <DropdownButton>{buttonContent}</DropdownButton>
      <DropdownContent>
        {items.map((item, index) => (
          <DropdownItem key={index}>{item}</DropdownItem>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default Dropdown;
