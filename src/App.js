import React from 'react';
import './App.css';
import { Container } from 'reactstrap';

//components
import ReportList  from './components/ReportList';

function App() {
  return (
    <Container>
     <ReportList/>
    </Container>
  );
}

export default App;
