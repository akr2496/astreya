import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBars, FaSync, FaSearch, FaAngleDown, FaAngleRight } from 'react-icons/fa';
import initialDatabases from './dummy.json';

// Styled components for layout
const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const SidebarWrapper = styled.div`
  position: relative;
  width: ${props => props.isVisible ? '20%' : '60px'};
  background-color: #f0f0f0;
  overflow-y: auto;
  transition: width 0.3s ease-in-out;
  padding: ${props => props.isVisible ? '20px' : '10px'};
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 10px;
  right: 40px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const RefreshButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const DatabaseList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const DatabaseListItem = styled.li`
  margin-bottom: 10px;
`;

const DatabaseItemContent = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const DatabaseItemText = styled.span`
  margin-left: 5px;
`;

const SearchPanel = styled.div`
  margin-top: 20px;
  input {
    margin-right: 10px;
  }
`;

// Sidebar component
const SidebarComponent = ({ isVisible, onToggle }) => {
  const [databases, setDatabases] = useState(initialDatabases);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDatabases = databases.filter(database =>
    database.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleExpand = (index) => {
    const updatedDatabases = [...databases];
    updatedDatabases[index].expanded = !updatedDatabases[index].expanded;
    setDatabases(updatedDatabases);
  };

  return (
    <SidebarWrapper isVisible={isVisible}>
      <ToggleButton onClick={onToggle}><FaBars /></ToggleButton>
      <RefreshButton onClick={() => console.log('Refreshing...')}><FaSync /></RefreshButton>
      <SearchPanel>
        <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} />
        <FaSearch />
      </SearchPanel>
      <DatabaseList>
        {filteredDatabases.map((database, index) => (
          <DatabaseListItem key={index}>
            <DatabaseItemContent onClick={() => toggleExpand(index)}>
              {database.expanded ? <FaAngleDown /> : <FaAngleRight />}
              <DatabaseItemText>{database.name}</DatabaseItemText>
            </DatabaseItemContent>
            {database.expanded && (
              <div>
                {/* Submenu content goes here */
                <div>
                    <DatabaseListItem> database.name</DatabaseListItem>
                    <DatabaseListItem> database.description</DatabaseListItem>
                </div>
            }


              </div>
            )}
          </DatabaseListItem>
        ))}
      </DatabaseList>
    </SidebarWrapper>
  );
};


export default SidebarComponent;
