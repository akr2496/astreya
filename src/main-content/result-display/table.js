import React from 'react';
import styled from 'styled-components';

// Styled components for layout

const ResultTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
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

const NoResultData = styled.p`
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #999;
`;

const QueryResultTable = ({ resultData }) => {
    console.log('in table',resultData)
    // const fields = ['f1', 'f2', 'f3', 'f4'];
    const fields = resultData?.fields ? resultData.fields : [];
    const queryResult = resultData?.rows ? resultData.rows : [];
    
    // const queryResult = [
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // {f1: 'asd', f2: 'fsdf', f3: 'aefsd', f4: 'sfsdf'},
    // ];
    return (
        <ResultTable>
            <thead>
                <TableRow>
                    <TableHeader>S.No</TableHeader> {/* Row number column */}
                    {fields.map((field, index) => (
                    <TableHeader key={index}>{field}</TableHeader>
                    ))}
                </TableRow>
            </thead>
            <tbody>
                {queryResult.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                    <TableCell>{rowIndex + 1}</TableCell> {/* Row number */}
                    {fields.map((field, cellIndex) => (
                        <TableCell key={cellIndex}>{row[field]}</TableCell>
                    ))}
                    </TableRow>
                ))}
            </tbody>
        </ResultTable>
    );
};

export default QueryResultTable;
