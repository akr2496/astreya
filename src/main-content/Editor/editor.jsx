import React, { useState } from 'react';
import './editor.css';

function Editor() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);

  const executeQuery = () => {
    // Send query to backend for execution
    fetch('http://localhost:5000/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    })
    .then(response => response.json())
    .then(data => {
      setResults(data.results);
      setHistory([...history, query]);
    })
    .catch(error => console.error('Error executing query:', error));
  };

  return (
    <div className="App">
      <div className="sidebar">
        <h2>Database Details</h2>
        {/* Display database details here */}
      </div>
      <div className="editor">
        <textarea 
          placeholder="Enter your SQL query here..." 
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button onClick={executeQuery}>Execute</button>
      </div>
      <div className="display">
        <h2>Query Results</h2>
        <table>
          <thead>
            <tr>
              {/* Table headers */}
            </tr>
          </thead>
          <tbody>
            {results.map((row, index) => (
              <tr key={index}>
                {/* Display row data */}
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Query History</h2>
        <ul>
          {history.map((query, index) => (
            <li key={index}>{query}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default Editor;
