import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaBars, FaSync, FaSearch, FaAngleDown, FaAngleRight } from 'react-icons/fa';
import axios from 'axios';
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
  padding: 2px;
  margin-left: 20px;
  position: relative;
  font-size: 12px;
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
  const [searchQuery, setSearchQuery] = useState('');

  
  useEffect( () => {
    fetchDatabases();
  }, [selectedProvider]);

  const executeRequest = async (url, bodyContent) => {
    // console.log('in executeRequest')
    try {
      const response = await axios.get(url, {params: {sqlQuery : bodyContent}});
      console.log(response.data);
      return response.data
    } catch( error) {
      console.error(`error has occured in executeRequest: ${error}`)
    }
  };

  const filteredDatabases = databases.filter(database =>
    database.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleExpandLevel0 = (index) => {
    const updatedDatabases = [...databases];
    updatedDatabases[index].expanded = !updatedDatabases[index].expanded;

    const currTime = new Date().getTime();
    const fifteenMinutes = 15 * 60 * 1000;

    if (updatedDatabases[index].expanded && (!updatedDatabases[index].lastFetchTime || (currTime - updatedDatabases[index].lastFetchTime > fifteenMinutes))) {
      fetchLevel1(updatedDatabases[index]);
      updatedDatabases[index].lastFetchTime = currTime;
    }

    setDatabases(updatedDatabases);
  };

  const toggleExpandLevel1 = (level0_index, level1_index ) => {
    const updatedDatabases = [...databases];
    // updatedDatabases[level0_index].expanded = !updatedDatabases[level0_index].expanded;
    updatedDatabases[level0_index]['tables'][level1_index].expanded = !updatedDatabases[level0_index]['tables'][level1_index].expanded;

    const currTime = new Date().getTime();
    const fifteenMinutes = 15 * 60 * 1000;

    if (updatedDatabases[level0_index]['tables'][level1_index].expanded && (!updatedDatabases[level0_index]['tables'][level1_index].lastFetchTime || (currTime - updatedDatabases[level0_index]['tables'][level1_index].lastFetchTime > fifteenMinutes))) {
      fetchLevel2(updatedDatabases, level0_index, level1_index);
      updatedDatabases[level0_index]['tables'][level1_index].lastFetchTime = currTime;
    }

    setDatabases(updatedDatabases);
  };

  const handleProviderChange = (e) => {
    setSelectedProvider(e.target.value);
    // Logic to fetch databases for the selected provider
  };

  const fetchDatabases = async() => {
    if(selectedProvider === 'BigQuery'){
      fetch('http://localhost:8080/google')
      .then( res => res.json())
      .then(data => setDatabases(data))
      .catch('error while loading datasets')

    } else if (selectedProvider === 'Snowflake'){
      try {
        const query = `SHOW DATABASES`;
        const data = await executeRequest('http://localhost:8080/snowflake/list', query);
        // console.log('in worksheet fetching databases',data)
        setDatabases(data);
      } catch (error) {
        console.error('Error fetching databases:', error);
      }
    }
  };

  const fetchLevel1 = async(database) => {
    let data = [];
    switch(selectedProvider){
      case 'BigQuery':
        try{
          data = await executeRequest(`http://localhost:8080/google/getTables/${database.name}`, '');
        } catch(error){
          console.error('Error fetching tables:', error);
        }
        break;

      case 'Snowflake':
        try {
          const query = `SHOW SCHEMAS IN DATABASE ${database.name}`
          data = await executeRequest('http://localhost:8080/snowflake/list', query);
        } catch (error) {
          console.error('Error fetching schemas:', error);
        }
        break;

      default:
        
    }
    const updatedDatabases = databases.map(db => {
      if (db.name === database.name) {
        return { ...db, tables: data };
      }
      return db;
    });
    setDatabases(updatedDatabases);
  };


  const fetchLevel2 = async(database, level0_index, level1_index) => {
    let data = [];
    switch(selectedProvider){
      case 'BigQuery':

      case 'Snowflake':
        try {
          console.log('fetchLevel1',database[level0_index], database[level0_index]['name'], database[level0_index]["tables"][level1_index]['name'])
          console.log(`fetchLevel1, ${database}, ${database[level0_index]}, ${database[level0_index][level1_index]}`)
          const tableQuery = `SHOW TABLES IN SCHEMA ${database[level0_index]['name']}.${database[level0_index]["tables"][level1_index]['name']}`;
          let tableData = await executeRequest('http://localhost:8080/snowflake/list', tableQuery);
          tableData.map(table => {return {...table, type : 'table'}})

          const viewQuery = `SHOW VIEWS IN SCHEMA ${database[level0_index]['name']}.${database[level0_index]["tables"][level1_index]['name']}`;
          let viewData = await executeRequest('http://localhost:8080/snowflake/list', viewQuery);
          viewData.map(view => {return {...view, type : 'view'}})

          data = [...tableData, ...viewData]
        } catch (error) {
          console.error('Error fetching schemas:', error);
        }
        break;

      default:
        
    }
    const updatedDatabases = [...databases];
    updatedDatabases[level0_index].tables[level1_index].tables = data;
    // setDatabases(updatedDatabases);
    console.log('updated', updatedDatabases)
    setDatabases(updatedDatabases);
  };

  const handleRefresh = () => {
    // Call the onRefresh callback with the selected provider value
    fetchDatabases();
  };

  return (
    <SidebarWrapper isVisible={isVisible}>
      <ToggleButton onClick={onToggle}><FaBars /></ToggleButton>
      {isVisible && (
        <React.Fragment>
          <RefreshButton onClick={handleRefresh}><FaSync /></RefreshButton>
          <DatabaseProviderDropdown value={selectedProvider} onChange={handleProviderChange}>
            <option value="">Select Provider</option>
            <option value="BigQuery">Google BigQuery</option>
            <option value="Snowflake">Snowflake</option>
          </DatabaseProviderDropdown>
          <h2>{selectedProvider}</h2>
          {selectedProvider && (
            <React.Fragment>
              <SearchPanel isVisible={isVisible}>
                <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} />
              </SearchPanel>
              <DatabaseList isVisible={isVisible}>
                  {filteredDatabases.map((database, index) => (
                    <DatabaseListItem key={index}>
                      <DatabaseItemContent onClick={() => toggleExpandLevel0(index)}>
                        {database.expanded ? <FaAngleDown /> : <FaAngleRight />}
                        <DatabaseItemText>{database.name}</DatabaseItemText>
                      </DatabaseItemContent>
                      {database.expanded && database.tables && database.tables.length > 0 && (
                        <TableList>
                          {database.tables.map((schema, i) => (
                            <TableListItem key={i}>
                              <DatabaseItemContent onClick={() => toggleExpandLevel1(index, i)}>
                                {schema.expanded ? <FaAngleDown /> : <FaAngleRight />}
                                <DatabaseItemText>{schema.name}</DatabaseItemText>
                              </DatabaseItemContent>
                              {schema.expanded && schema.tables && schema.tables.length > 0 && (
                                <TableList>
                                  {schema.tables.map((table, j) => (
                                    <TableListItem key={j}>
                                      {table.name}
                                      <TableOptionsButton>...</TableOptionsButton>
                                    </TableListItem>
                                  ))}
                                </TableList>
                              )}
                            </TableListItem>
                          ))}
                        </TableList>
                      )}
                    </DatabaseListItem>
                  ))}
                </DatabaseList>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </SidebarWrapper>
  );
};
export default SidebarComponent;
