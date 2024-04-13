import React from 'react';
import styled from 'styled-components';

const ResultTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  border: none;
  padding: 6px 8px;
  text-align: left;
  background-color: #f8f8f8;
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  `;

const TableCell = styled.td`
  border: none;
  padding: 6px 8px;
  font-size: 14px;
  color: #666;
`;

const NoHistoryMessage = styled.p`
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #999;
`;

const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#ffffcc'; // Light yellow
      case 'Done':
        return '#ccffcc'; // Light green
      case 'Failed':
        return '#ffcccc'; // Light red
      default:
        return 'inherit';
    }
  };

  const handleRowHeight = (viewOption) => {
    let rowHeight = 'auto';
    if (viewOption === 'Column') {
      rowHeight = '15px'; // Set desired height for "Column" view
    }
    return rowHeight;
  };  

const QueryRecordsTable = ({ queryRecords, viewOption }) => {
  console.log(viewOption)
  return (
    queryRecords.length > 0 ? (
      <ResultTable>
        <thead>
          <TableRow style={{ height:handleRowHeight(viewOption)}}> 
            <TableHeader>Status</TableHeader>
            <TableHeader>Duration</TableHeader>
            <TableHeader>Start Time</TableHeader>
            <TableHeader>Query ID</TableHeader>
            <TableHeader>SQL</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {queryRecords.map((record, index) => (
            record && (
              <TableRow key={index} style={{ height:handleRowHeight(viewOption) , backgroundColor: getStatusColor(record.status) }}>
              <TableCell>{record.status}</TableCell>
              <TableCell>{record.duration}</TableCell>
              <TableCell>{record.start}</TableCell>
              <TableCell>{record.queryId}</TableCell>
              <TableCell>{record.SQL}</TableCell>
            </TableRow>
          )
          ))}
        </tbody>
      </ResultTable>
    ) : (
      <NoHistoryMessage>No History</NoHistoryMessage>
    )
  );
};

export default QueryRecordsTable;
