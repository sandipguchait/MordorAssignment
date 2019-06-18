import { Container, Input } from 'reactstrap';
import React from 'react';

const componentName = ({ searchTerm, handleChange, data }) => {
  return (
    <Container style={{ marginBottom: "30px"}}>
       <div style={{ marginTop: "80px"}}>
         <Input type="search" 
          img='https://icon.now.sh/search'
          value={searchTerm}
          style={{ width: "40%", marginLeft: "30%"}}
          placeholder="Search Reports" 
          onChange={(e)=>handleChange(e, data)} 
          />
        </div>
    </Container>
  );
};

export default componentName;