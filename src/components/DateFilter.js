import React from 'react';
import { Button, Form, FormGroup, Input} from 'reactstrap';


const DateFilter = ({ handleChangeDate, data , filterDate, ClearDate, startDate , endDate}) => {
  return (
    <Form inline style={{ display: "flex", justifyContent: "flex-end", padding: "0 0 20px"}}>
        <FormGroup>
          <Input type="date" name="startDate" value={startDate} placeholder="StartDate" style={{ maxWidth: "80%", padding: "0px"}} onChange={handleChangeDate}/>
        </FormGroup>
        <FormGroup>
          <Input type="date" name="endDate" value={endDate} placeholder="EndDate" style={{ maxWidth: "80%",padding: "0px"}} onChange={handleChangeDate}/>
        </FormGroup>
        <Button size="sm" onClick={() => filterDate(data)}>Filter</Button>
        <Button color="danger" size="sm" onClick={() => ClearDate(data)}>Clear</Button>
    </Form>
  );
};

export default DateFilter;