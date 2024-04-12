import React, { useState, useEffect } from 'react';
import styled,  { keyframes }  from 'styled-components';
import Dropdown from '../../utility-feature/dropdown/dropdown';
import { FaPlay, FaCopy, FaDownload, FaDatabase } from 'react-icons/fa';


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

  &:hover {
    background-color: #d777; /* Change the background color on hover */
  }
  &:active {
    filter: brightness(1.8); /* Reduce the brightness to indicate the button is clicked */
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

  useEffect(() => {
    // Fetch databases when component mounts
    fetchDatabases();
  }, []);

  const fetchDatabases = async () => {
    try {
      // Fetch databases from API
    //   const response = await fetch('your_api_endpoint_for_databases');
    //   const data = await response.json();
      const data = ['db1', 'db2', "db3", "db4", "db5", "db6", "db7"];
      setDatabases(data);
    } catch (error) {
      console.error('Error fetching databases:', error);
    }
  };

  const fetchSchemas = async (database) => {
    try {
      // Fetch schemas based on selected database from API
      const response = await fetch(`your_api_endpoint_for_schemas?database=${database}`);
      const data = await response.json();
      setSchemas(data);
    } catch (error) {
      console.error('Error fetching schemas:', error);
    }
  };

  const handleRun = () => {
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
        setProcessing(false);
    })
    .catch(error => {
      // Handle error
      console.error('Error executing SQL queries:', error);
      setProcessing(false);
    });
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
    <>
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
                <>
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
                </>
              )}
        </Context>

        <Dropdown buttonContent="More Options" items={['Item 1', 'Item 2', 'Item 3']} />
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
