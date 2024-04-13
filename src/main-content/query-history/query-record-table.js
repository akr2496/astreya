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
  padding: 16px;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;

  /**  &:hover {
    background-color: #f0f0f0; /* Light background color on hover */
  /* }  */
`;

const NoHistoryMessage = styled.p`
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #999;
`;

const QueryRecordsTable = ({ queryRecords }) => {
  return (
    queryRecords.length > 1 ? (
      <ResultTable>
        <thead>
          <TableRow>
            <TableHeader>Status</TableHeader>
            <TableHeader>Duration</TableHeader>
            <TableHeader>Start Time</TableHeader>
            <TableHeader>Query ID</TableHeader>
            <TableHeader>SQL</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {queryRecords.map((record, index) => (
            record && (<TableRow key={index}>
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
