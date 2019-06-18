import React, { Component } from 'react';
import { Button } from 'reactstrap';

class CostSlider extends Component {

  render() {
    const {costFilter, sliderValue, data, handleClearCost } = this.props;
    return (
      <div style={{ display:"flex", justifyContent: "flex-end", marginBottom:"40px"}}>
        <div className="sorting2">Cost</div>
        <input id="output" type="range"
          className="slider"
          value={sliderValue}
          min="0"
          max="1000"
          step="1"
          onChange={(e) => costFilter(e,data)}
        />
        <span style={{ fontWeight: "500", padding: "0 10px"}}>${sliderValue}</span>
        <Button color="danger" size="sm" onClick={handleClearCost}>Clear</Button>
    </div>
    );
  }
}

export default CostSlider;