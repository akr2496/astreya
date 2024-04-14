import React, { useState, useEffect, Fragment } from 'react';
import styled,  { keyframes }  from 'styled-components';
import Dropdown from '../../utility-feature/dropdown/dropdown';
import { FaPlay, FaCopy, FaDownload, FaDatabase } from 'react-icons/fa';
import { useResultData, useQueryDetailsData } from './../../../context/context';

// Styled components for layout
const WorksheetTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  padding: 10px;
  resize: none;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  position: relative; /* Position relative for absolute positioning */
  z-index: 0; /* Set z-index lower than dropdown content */
  background-color: transparent; /* Transparent background */
  color: #333; /* Text color */
  border-radius: 5px; /* Rounded corners */
  border: 1px solid #ddd; /* Border */
`;

const InfoBarContainer = styled.div`
  background-color: #eee;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 10px; /* Match border radius of worksheet container */
  border-top-right-radius: 10px; /* Match border radius of worksheet container */
`;

const Button = styled.button`
  background-color: #007bff; /* Blue button color */
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px 15px;
  margin-right: 10px;
  border-radius: 5px; /* Rounded corners */
  transition: background-color 0.3s ease; /* Smooth transition on hover */

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
`;

const Context = styled.div`
  flex-grow: 1;
`;

const DatabaseProviderDropdown = styled.select`
  position: relative;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  border: 3px solid rgba(0, 0, 0, 0.1); /* Light background */
  border-top: 2px solid #6c9eff; /* Metallic blue color */
  border-radius: 50%;
  width: 12px;
  height: 12px;
  animation: ${spin} 1s linear infinite;
`;

const DatabaseDropdown = styled.select`
  position: relative;
`;

const DatabaseSchemaDropdown = styled.select`
  position: relative;
`;

const Worksheet = ({ content, onChange }) => {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [processing, setProcessing] = useState(false);
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [selectedSchema, setSelectedSchema] = useState('');
  const [databases, setDatabases] = useState([]);
  const [schemas, setSchemas] = useState([]);
  const [queryResult, setQueryResult ] = useState([]);
  const { setResultData } = useResultData();
  const { setQueryDetailsData } = useQueryDetailsData();
  const [allotedQueryID, setAllotedQueryID] = useState(1);

  useEffect(() => {
    // Fetch databases when component mounts
    fetchDatabases();
  }, []);

  const fetchDatabases = async () => {
    try {
      const data = ['db1', 'db2', "db3", "db4", "db5", "db6", "db7"];
      setDatabases(data);
    } catch (error) {
      console.error('Error fetching databases:', error);
    }
  };

  const fetchSchemas = async (database) => {
    try {
      const response = await fetch(`your_api_endpoint_for_schemas?database=${database}`);
      const data = await response.json();
      setSchemas(data);
    } catch (error) {
      console.error('Error fetching schemas:', error);
    }
  };

  const updateQueryDetails = (status = 'pending', duration = null, start = null, queryId = null, SQL = null, provider = null ) => {
    const updatedQueryDetails = {
        status : status,
        duration : `${duration} ms`,
        start : `${start}`,
        queryId : queryId,
        SQL : SQL,
        provider : provider
    }
    setQueryDetailsData(updatedQueryDetails);
  }

  const handleRun = () => {
    const startDate = new Date();
    updateQueryDetails('pending', null, startDate,  allotedQueryID, content);
    const starttime = performance.now();

    setProcessing(true);
    const endpoint = 'http://localhost:8080/google/run';
    // Send a POST request to the server
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({sqlQuery:content})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to execute SQL queries');
      }
      return response.json()
      // Handle success
    })
    .then(data => {
        console.log(data);
        setResultData(data);
        const endtime = performance.now();
        updateQueryDetails('Done', endtime - starttime, startDate, allotedQueryID, content, selectedProvider);

        setProcessing(false);
    })
    .catch(error => {
      // Handle error
      updateQueryDetails('Failed - Error', null, startDate, allotedQueryID, content, selectedProvider);
      console.error('Error executing SQL queries:', error);
      setProcessing(false);
    });
    setAllotedQueryID(allotedQueryID+1)
  };

  const handleDatabaseChange = (e) => {
    const selectedDatabase = e.target.value;
    setSelectedDatabase(selectedDatabase);
    setSelectedSchema(''); // Reset selected schema when database changes
    // Fetch schemas for the selected database
    fetchSchemas(selectedDatabase);
  };

  const handleSchemaChange = (e) => {
    const selectedSchema = e.target.value;
    setSelectedSchema(selectedSchema);
  };
  

  const handleSelectAll = () => {
    // Logic to select all queries
    
  };

  const handleCopy = () => {
    // Copy worksheet content into clipboard
    navigator.clipboard.writeText(content)
      .then(() => alert('Content copied to clipboard'))
      .catch(err => console.error('Failed to copy content: ', err));
  };

  const handleDownload = () => {
    // Download worksheet content as text file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'worksheet.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };


  const handleProviderChange = (e) => {
    setSelectedProvider(e.target.value);
    // Logic to fetch databases for the selected provider
  };

  const items = ['Item 1', 'Item 2', 'Item 3'];

  return (
    <Fragment>
      <InfoBarContainer>
        <Button onClick={handleRun}>
            {processing && <LoadingSpinner />}
            {!processing && <FaPlay />}
        </Button>
    
        <Button onClick={handleSelectAll}>
            {"ALL"}
        </Button>
    
        <Button onClick={handleCopy}>
            <FaCopy />
        </Button>
        
        <Button onClick={handleDownload}>
            <FaDownload />
        </Button>
        <Context>
            **CONTEXT**
            <DatabaseProviderDropdown value={selectedProvider} onChange={handleProviderChange}>
                <option value="">Select Provider</option>
                <option value="BigQuery">Google BigQuery</option>
                <option value="Snowflake">Snowflake</option>
            </DatabaseProviderDropdown>

            {selectedProvider === 'Snowflake' && (
                <Fragment>
                  <DatabaseProviderDropdown value={selectedDatabase} onChange={handleDatabaseChange}>
                    <option value="">Select Database</option>
                    {databases.map(database => (
                      <option key={database.id} value={database.id}>{database.name}</option>
                    ))}
                  </DatabaseProviderDropdown>
        
                  <DatabaseSchemaDropdown value={selectedSchema} onChange={handleSchemaChange}>
                    <option value="">Select Schema</option>
                    {schemas.map(schema => (
                      <option key={schema.id} value={schema.id}>{schema.name}</option>
                    ))}
                  </DatabaseSchemaDropdown>
                </Fragment>
              )}
        </Context>

        <Dropdown buttonContent="..." items={['Item 1', 'Item 2', 'Item 3']} />
      </InfoBarContainer>

      
        <WorksheetTextarea
          value={content}
          onChange={onChange}
          placeholder="Write your SQL queries here..."
        />
      
    </Fragment>
  );
};

export default Worksheet;
