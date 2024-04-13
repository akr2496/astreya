import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaCaretDown } from 'react-icons/fa';
import {useQueryDetailsData} from './../../context/context'
import QueryResultTable from '../result-display/table';
import QueryRecordsTable from './query-record-table';


// Styled components for layout
const HistoryContainer = styled.div`
  flex: 7;
  height: calc(60vh - 5px);
  background-color: #d0d0d0;
  overflow-y: auto;
`;

const HeaderBar = styled.div`
  background-color: rgba(90, 123, 4, 0.5);; /* White background for navigation bar */
  padding: 11px; /* Increased padding for better spacing */
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  border-radius: 8px;
`;

const QueryTableContainer = styled.div`
  margin-top: 1px; /* Adjust according to the height of the navigation bar */
  width: 100%;
  padding: 3px; /* Increased padding for better spacing */
  overflow: auto;
`;

const HeaderTitle = styled.h3`
  margin: 0;
  margin-right: auto;
`;

const Dropdown = styled.div`
  position: relative;
  margin-left: auto;
`;

const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1;
  display: ${(props) => (props.open ? 'block' : 'none')}; /* Set display based on open state */
`;

const MenuItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;

const HeaderColumns = styled.div`
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Column = styled.div`
  flex: ${(props) => props.width || 1};
  font-weight: bold;
  padding: 5px;
`;

const QueryHistoryComponent = () => {
  const [open, setOpen] = useState(false); // State to control dropdown menu visibility
  const [viewOption, setViewOption] = useState('Column'); // Initial view option
  const { queryDetailsData }  = useQueryDetailsData(); 
  const [queryRecords, setQueryRecords] = useState([]);

  console.log('queryDetailsData:', queryDetailsData)
  console.log('queryRecords:',queryRecords)
  useEffect(() => {
    // Check if the record with the same queryId already exists in queryRecords
    const recordIndex = queryRecords.findIndex(record => record && record.queryId === queryDetailsData.queryId);

    // Concatenate the new queryDetailsData with the existing queryRecords array
    let updatedQueryRecords;
    if (recordIndex !== -1) {
        // If the record exists, remove it from the array before concatenating
        updatedQueryRecords = [
            queryDetailsData,
            ...queryRecords.slice(0, recordIndex),
            ...queryRecords.slice(recordIndex + 1)
        ];
    } else {
        // If the record doesn't exist, concatenate it with the existing array
        updatedQueryRecords = [queryDetailsData, ...queryRecords];
    }

    // Limit the number of records to 100
    const limitedQueryRecords = updatedQueryRecords.slice(0, 100);

    // Update the state with the new queryRecords array
    setQueryRecords(limitedQueryRecords);
}, [queryDetailsData]);



  const handleViewOptionChange = (option) => {
    setViewOption(option);
    setOpen(false); // Close the dropdown menu after selecting an option
    // Logic to handle view option change
  };

  return (
    <HistoryContainer>
      <HeaderBar>
        <HeaderTitle>Query History</HeaderTitle>
        <Dropdown>
          <DropdownButton onClick={() => setOpen(!open)}> {/* Toggle dropdown menu visibility */}
            {viewOption} <FaCaretDown />
          </DropdownButton>
          <DropdownMenu open={open}> {/* Pass open state to control visibility */}
            <MenuItem onClick={() => handleViewOptionChange('Column')}>Column</MenuItem>
            <MenuItem onClick={() => handleViewOptionChange('Tile')}>Tile</MenuItem>
            {/* Add more view options here */}
          </DropdownMenu>
        </Dropdown>
      </HeaderBar>
      <QueryTableContainer>
        <QueryRecordsTable queryRecords = {queryRecords}/>
      </QueryTableContainer>
    </HistoryContainer>
  );
};

export default QueryHistoryComponent;
