import React, { useState } from 'react';
import styled from 'styled-components';
import SidebarComponent from './Sidebar/sidebar';
import EditorComponent from './main-content/Editor/editor';
import ResultWindowComponent from './main-content/result-display/result-display';
import { ResultDataProvider } from './context/context';

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

// Query history component
const QueryHistoryComponent = () => (
  <div style={{ flex: 7, backgroundColor: '#d0d0d0', overflowY: 'auto' }}>
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
        <ResultDataProvider>
          <EditorComponent />
          {/* Other components */}
        
        
          <div style={{ display: 'flex', flex: 1 }}>
            <ResultWindowComponent />
            <QueryHistoryComponent />
            
          </div>
        </ResultDataProvider>
      </MainContent>
    </Container>
  );
};

export default App;
