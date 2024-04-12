import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaBars, FaSync, FaSearch, FaAngleDown, FaAngleRight } from 'react-icons/fa';

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

const DatabaseProviderDropdown = styled.select`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const DatabaseList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: ${props => props.isVisible ? 'block' : 'none'};
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
  display: ${props => props.isVisible ? 'block' : 'none'};
  input {
    width: 100%;
    height: 20px;
    margin-right: 10px;
  }
`;

const TableList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TableListItem = styled.li`
  margin-left: 20px;
  position: relative;
`;

const TableOptionsButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-70%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px; /* Increase the font size */
  padding: 5px; /* Increase padding for larger button */
  border-radius: 10%; /* Make the button round */
`;


// Sidebar component
const SidebarComponent = ({ isVisible, onToggle }) => {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [databases, setDatabases] = useState([
    { name: 'Database 1', expanded: false, tables: [] },
    { name: 'Database 2', expanded: false, tables: [] },
    { name: 'Database 3', expanded: false, tables: [] },
    { name: 'Database 4', expanded: false, tables: [] },
    { name: 'Database 5', expanded: false, tables: [] },
  ]);
  useEffect( () => {
    fetch('http://localhost:8080/google')
    .then( res => res.json())
    .then(data => setDatabases(data))
    .catch('error while loading datasets')
  }, []);

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

    const currTime = new Date().getTime();
    const fifteenMinutes = 15 * 60 * 1000;

    if (updatedDatabases[index].expanded && (!updatedDatabases[index].lastFetchTime || (currTime - updatedDatabases[index].lastFetchTime > fifteenMinutes))) {
      fetchTables(updatedDatabases[index]);
      updatedDatabases[index].lastFetchTime = currTime;
    }

    setDatabases(updatedDatabases);
  };

  const handleProviderChange = (e) => {
    setSelectedProvider(e.target.value);
    // Logic to fetch databases for the selected provider
  };

  const fetchTables = (database) => {
    fetch(`http://localhost:8080/google/getTables/${database.name}`)
      .then(res => res.json())
      .then(data => {
        const updatedDatabases = databases.map(db => {
          if (db.name === database.name) {
            return { ...db, tables: data };
          }
          return db;
        });
        setDatabases(updatedDatabases);
      })
      .catch(error => console.error('Error occurred while fetching tables:', error));
  };

  

  return (
    <SidebarWrapper isVisible={isVisible}>
      <ToggleButton onClick={onToggle}><FaBars /></ToggleButton>
      {isVisible && (
        <>
          <RefreshButton onClick={() => console.log('Refreshing...')}><FaSync /></RefreshButton>
          <DatabaseProviderDropdown value={selectedProvider} onChange={handleProviderChange}>
            <option value="">Select Provider</option>
            <option value="BigQuery">Google BigQuery</option>
            <option value="Snowflake">Snowflake</option>
          </DatabaseProviderDropdown>
          <h2>{selectedProvider}</h2>
          {selectedProvider && (
            <>
              <SearchPanel isVisible={isVisible}>
                <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} />
              </SearchPanel>
              <DatabaseList isVisible={isVisible}>
                {filteredDatabases.map((database, index) => (
                  <DatabaseListItem key={index}>
                    <DatabaseItemContent onClick={() => toggleExpand(index)}>
                      {database.expanded ? <FaAngleDown /> : <FaAngleRight />}
                      <DatabaseItemText>{database.name}</DatabaseItemText>
                    </DatabaseItemContent>
                    {database.expanded && database.tables && database.tables.length > 0 && (
                        <TableList>
                        {database.tables.map((table, i) => (
                            <TableListItem key={i}>
                              {table}
                              <TableOptionsButton>...</TableOptionsButton>
                            </TableListItem>
                          ))}
                      </TableList>
                    )}
                  </DatabaseListItem>
                ))}
              </DatabaseList>
            </>
          )}
        </>
      )}
    </SidebarWrapper>
  );
};


export default SidebarComponent;
