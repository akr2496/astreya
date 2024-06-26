import React, {Fragment, useState} from 'react';
import styled from 'styled-components';
import { FaCopy, FaDownload, FaExpand , FaFileJson, FaFileCsv, FaFileDownload} from 'react-icons/fa';
import QueryResultTable from './table';
import { useResultData } from './../../context/context';

// Styled components for layout
const ResultWindowContainer = styled.div`
  flex: 13;
  height: calc(55vh - 5px); /* Subtracting the height of the navigation bar and padding */
  background-color: #f5f5f5; /* Lighter shade for background */
  overflow-y: auto;
  position: relative;
  box-sizing: border-box;
  border: 2px solid #ddd; /* Add border with light gray color */
  border-radius: 10px; /* Add border radius for rounded corners */
  
`;

const NavigationBar = styled.div`
  background-color: rgba(0, 166, 255, 0.9); /* White background for navigation bar */
  padding: 5px; /* Increased padding for better spacing */
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

const WindowName = styled.h4`
  margin: 0;
  color: #333333; /* Darker text color */
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px; /* Larger font size for icons */
  margin-left: 10px;
  color: #666666; /* Lighter text color for icons */
`;

const ExpandedWindow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.95); /* Semi-transparent white background */
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ExpandedContent = styled.div`
  width: 90%;
  height: 90%;
  max-height: 90%;
  background-color: #ffffff; /* White background */
  overflow-y: auto;
  padding: 20px; /* Increased padding for better spacing */
  border-radius: 10px; /* Rounded corners for a softer look */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
`;

const ResultWindowComponent = () => {
  const [expanded, setExpanded] = useState(false);
  const { resultData }  = useResultData();
  console.log('resultData inside result window cmp', resultData)
  // Function to copy the content of the result window
  const copyResult = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    
    if (selectedText) {
        try {
            navigator.clipboard.writeText(selectedText);
            alert('Selected text copied to clipboard');
            console.log('Selected text copied to clipboard');
        } catch (err) {
            alert(`error : ${err}`);
            console.error('Unable to copy selected text to clipboard:', err);
        }
    } else {
        alert('No text selected')
        console.warn('No text selected');
    }
  };

  // Function to download the content of the result window
const downloadJSON = () => {
    const jsonContent = JSON.stringify(resultData.rows, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const anchorElement = document.createElement('a');
    anchorElement.href = URL.createObjectURL(blob);
    anchorElement.download = 'result.json';
    anchorElement.click();
};

const jsonToCsv = (jsonObject) => {
    const csvRows = [];
    const headers = jsonObject.fields;
    csvRows.push(headers.join(','));

    jsonObject.rows.forEach((obj) => {
        const values = headers.map(header => {
        const value = obj[header];
        if (typeof value === 'string' && value.includes(',')) {
            return `"${value}"`;
        }
        return value;
        });
        csvRows.push(values.join(','));
    });
    return csvRows.join('\n');
};

const downloadCSV = () => {
    const csvContent = jsonToCsv(resultData);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const anchorElement = document.createElement('a');
    anchorElement.href = URL.createObjectURL(blob);
    anchorElement.download = 'result.csv';
    anchorElement.click();
};

const expandWindow = () => {
    setExpanded(!expanded);
};


  return (
    <Fragment>
        { !expanded && (
            <ResultWindowContainer className="result-window">
            <div >
                <NavigationBar>
                    <WindowName>Result Window</WindowName>
                    <div>
                    <IconButton title="Copy Result" onClick={copyResult}>
                        <FaCopy />
                    </IconButton>
                    <IconButton title="Download JSON" onClick={downloadJSON}>
                        <FaFileDownload />
                    </IconButton>
                    <IconButton title="Download CSV" onClick={downloadCSV}>
                        <FaFileCsv />
                    </IconButton>
                    <IconButton title="Expand Window" onClick={expandWindow}>
                        <FaExpand />
                    </IconButton>
                    </div>
                </NavigationBar>
                <QueryTableContainer>
                    <QueryResultTable  resultData = {resultData}/>
                </QueryTableContainer>
            </div>
        </ResultWindowContainer>
        )} 
        {expanded && (
            <ExpandedWindow>
                <NavigationBar>
                    <WindowName>Result Window</WindowName>
                    <div>
                    <IconButton title="Copy Result" onClick={copyResult}>
                        <FaCopy />
                    </IconButton>
                    <IconButton title="Download JSON" onClick={downloadJSON}>
                        <FaFileDownload />
                    </IconButton>
                    <IconButton title="Download CSV" onClick={downloadCSV}>
                        <FaFileCsv />
                    </IconButton>
                    <IconButton title="Expand Window" onClick={expandWindow}>
                        <FaExpand />
                    </IconButton>
                    </div>
                </NavigationBar>
                <ExpandedContent>
                    <QueryTableContainer>
                        <QueryResultTable  resultData = {resultData}/>
                    </QueryTableContainer>
                </ExpandedContent>
            </ExpandedWindow>
        )}
    </Fragment>

  );
};

export default ResultWindowComponent;
