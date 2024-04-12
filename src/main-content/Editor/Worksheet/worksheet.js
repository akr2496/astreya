import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components for layout
const WorksheetContainer = styled.div`
  height: calc(100% - 40px); /* Subtracting the height of the info bar */
  overflow-y: auto;
  position: relative; /* Position relative for absolute positioning */
  z-index: 0; /* Set z-index lower than dropdown content */
`;

const WorksheetTextarea = styled.textarea`
  width: 100%;
  height: calc(100% - 40px); /* Subtracting the height of the info bar */
  border: none;
  padding: 10px;
  resize: none;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  position: relative; /* Position relative for absolute positioning */
  z-index: 0; /* Set z-index lower than dropdown content */
`;

const InfoBarContainer = styled.div`
  background-color: #eee;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: #555;
  color: white;
  border: none;
  cursor: pointer;
  padding: 7px 10px;
  margin-right: 10px;
`;

const Context = styled.div`
  flex-grow: 1;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 5px;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  ${DropdownContainer}:hover & {
    display: block;
  }
`;

const DropdownItem = styled.div`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  &:hover {
    background-color: #f1f1f1;
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




const Worksheet = ({ content, onChange }) => {
  const handleRun = () => {
    // Logic to execute SQL query
  };

  const handleSelectAll = () => {
    // Logic to select all queries
  };

  const handleCopy = () => {
    // Logic to copy content to clipboard
  };

  const handleDownload = () => {
    // Logic to download content
  };
  const items = ['Item 1', 'Item 2', 'Item 3'];
  return (
    <>
      <InfoBarContainer>
        <Button onClick={handleRun}>RUN</Button>
        <Button onClick={handleSelectAll}>ALL Queries</Button>
        <Button onClick={handleCopy}>COPY</Button>
        <Button onClick={handleDownload}>Download</Button>
        <Context>Worksheet information will be shown here</Context>
        <Dropdown buttonContent="Dropdown" items={['Item 1', 'Item 2', 'Item 3']} />
      </InfoBarContainer>
      
      <WorksheetContainer>
        <WorksheetTextarea
          value={content}
          onChange={onChange}
          placeholder="Write your SQL queries here..."
        />
      </WorksheetContainer>
    </>
  );
};

export default Worksheet;
