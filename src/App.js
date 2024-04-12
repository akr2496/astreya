import React, { useState } from 'react';
import styled from 'styled-components';
import SidebarComponent from './Sidebar/sidebar';
import EditorComponent from './main-content/Editor/editor';
// Styled components for layout
const Container = styled.div`
  display: flex;
  height: 100vh;
`;

// const Sidebar = styled.div`
//   width: 20%;
//   background-color: #f0f0f0;
//   overflow-y: auto;
// `;

const MainContent = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const ToggleButton = styled.button`
  margin-bottom: 10px;
`;

// Sidebar component
// const SidebarComponent = () => (
//   <Sidebar>
//     <h2>Database Details</h2>
//     {/* Sidebar content goes here */}
//   </Sidebar>
// );

// Editor component
// const EditorComponent = () => (
//   <textarea
//     placeholder="Enter your SQL query here..."
//     style={{ width: '100%', height: '50vh', backgroundColor: '#fff', border: '1px solid #ccc', resize: 'none' }}
//   />
// );

// Result window component
const ResultWindowComponent = () => (
  <div style={{ flex: 6, backgroundColor: '#e0e0e0', overflowY: 'auto' }}>
    <h2>Result Window</h2>
    {/* Result content goes here */}
  </div>
);

// Query history component
const QueryHistoryComponent = () => (
  <div style={{ flex: 4, backgroundColor: '#d0d0d0', overflowY: 'auto' }}>
    <h2>Query History</h2>
    {/* Query history content goes here */}
  </div>
);

// Main component
const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleRefresh = () => {
    // Handle refresh logic here
    console.log('Refreshing...');
  };

  return (
    <Container>
      {/* Sidebar */}
      {<SidebarComponent isVisible={sidebarVisible} onToggle={toggleSidebar} />}

      {/* Main Content */}
      <MainContent>
        {/* Toggle Sidebar Button */}

        {/* Editor */}
        <EditorComponent />

        {/* Query History and Result Window */}
        <div style={{ display: 'flex', flex: 1 }}>
          <ResultWindowComponent />
          <QueryHistoryComponent />
          
        </div>
      </MainContent>
    </Container>
  );
};

export default App;
