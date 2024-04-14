import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaAngleRight, FaTimes } from 'react-icons/fa';
import Worksheet from './worksheet/worksheet';
import Dropdown from '../utility-feature/dropdown/dropdown';

// Styled components for layout
const EditorContainer = styled.div`
  width: 100%;
  height: 60%;
  position: relative;
  /* overflow: hidden; */
  background-color: #f5f5f5; /* Light gray background color */
`;

const WorksheetContainer = styled.div`
  width: 100%;
  height: 87%;
  background-color: #f5f5f5; /* Light gray background color */
  overflow: hidden;
  box-sizing: border-box;
  border: 2px solid #ddd; /* Add border with light gray color */
  border-radius: 10px; /* Add border radius for rounded corners */
`;

const NavigationBar = styled.div`
  background-color: #333;
  color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
`;

const TabContainer = styled.div`
  display: flex;
`;

const Tab = styled.button`
  background-color: ${(props) => (props.active ? '#4a90e2' : '#222')};
  border: none;
  cursor: pointer;
  color: white;
  margin-right: 10px;
  padding: 8px 12px;
  border-radius: 4px;
  display: flex;
  align-items: center;
`;

const ActionButton = styled.button`
  background-color: #555;
  border: none;
  cursor: pointer;
  color: white;
  margin-right: 10px;
  padding: 8px 12px;
  border-radius: 4px;
`;

const DropdownContent = styled.div`
  position: absolute;
  background-color: #555;
  min-width: 160px;
  z-index: 2;
  right: 0;
  top: calc(100% + 10px);
  display: none;
`;

const DropdownButton = styled(ActionButton)`
  position: relative;
  &:hover ${DropdownContent} {
    display: block;
  }
`;

const DropdownOption = styled.div`
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
`;

// Editor component
const EditorComponent = () => {
  const [worksheets, setWorksheets] = useState([]);
  const [lastCreatedWorksheet, setLastCreatedWorksheet] = useState(0);
  const [activeWorksheet, setActiveWorksheet] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (worksheets.length === 0) {
      setActiveWorksheet(null);
    }
  }, [worksheets]);

  const handleNewWorksheet = () => {
    const newWorksheetId = lastCreatedWorksheet + 1;
    setWorksheets([...worksheets, { id: newWorksheetId, content: '' }]);
    setActiveWorksheet(newWorksheetId);
    setLastCreatedWorksheet(newWorksheetId);
  };
  
  const handleCloseWorksheet = (id) => {
    const updatedWorksheets = worksheets.filter(worksheet => worksheet.id !== id);
    setWorksheets(updatedWorksheets);
    if (id === activeWorksheet && updatedWorksheets.length > 0) {
      setActiveWorksheet(updatedWorksheets[0].id);
    }
  };

  const handleChangeContent = (e, id) => {
    const updatedWorksheets = [...worksheets];
    const worksheetToUpdate = updatedWorksheets.find(worksheet => worksheet.id === id);
    if (worksheetToUpdate) {
      worksheetToUpdate.content = e.target.value;
      setWorksheets(updatedWorksheets);
    } else {
      console.error(`Worksheet with id ${id} not found.`);
    }
  };
  

  const switchWorksheet = (id) => {
    setActiveWorksheet(id);
  };

  const handleCloseAllWorksheets = () => {
    setWorksheets([]);
    setActiveWorksheet(null);
  };

  const activeWorksheetContent = activeWorksheet ? (worksheets.find(worksheet => worksheet.id === activeWorksheet)?.content || '') : '';

  return (
    <EditorContainer>
      <NavigationBar>
        <DropdownButton onClick={handleNewWorksheet}>
          <FaPlus />
        </DropdownButton>
        <DropdownButton>
          <FaAngleRight />
          <DropdownContent ref={dropdownRef}>
            <DropdownOption onClick={handleCloseAllWorksheets}>Close All</DropdownOption>
          </DropdownContent>
        </DropdownButton>
        <TabContainer>
          {worksheets.map(worksheet => (
            <Tab key={worksheet.id} active={worksheet.id === activeWorksheet} onClick={() => switchWorksheet(worksheet.id)}>
              Worksheet {worksheet.id}
              <FaTimes onClick={() => handleCloseWorksheet(worksheet.id)} style={{ marginLeft: '5px' }} />
            </Tab>
          ))}
        </TabContainer>
      </NavigationBar>
      <WorksheetContainer>
      <Worksheet
        content={activeWorksheetContent}
        onChange={(e) => handleChangeContent(e, activeWorksheet)}
      />
      </WorksheetContainer>
    </EditorContainer>
  );
};

export default EditorComponent;
