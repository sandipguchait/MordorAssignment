import React, { Component } from 'react';
import axios from 'axios';
import "../App.css";

//components
import SearchBar from '../components/searchBar';
import UIComponent from '../components/UIcomponent';
import Loading from '../components/Loading';
import CostSlider from '../components/CostSlider';
import DateFilter from '../components/DateFilter';

const BASE_URL = 'https://modorapi.senzakash101.now.sh/reports/';

class ReportList extends Component {

  state = {
    data: [],
    updatedSearch:[],
    searchTerm:'',
    sliderValue: 0,
    updatedData: [],
    startDate: "",
    endDate: '',
    filterDate: []
  }

  componentDidMount() {
    this.fetchList();
  };

  // Fetching from API
  fetchList = async() => {
    const response = await axios.get(BASE_URL);
    this.setState({ data: response.data })
  };

  // Callback function to SearchBar and search function logic
  handleChange = (e, data) => {
    this.setState({
      searchTerm: e.target.value,
     })
     if(e.target.value) {
      const result = data.filter(term => (
       term.title.toLowerCase().includes(e.target.value.toLowerCase()) || term.cost.toLowerCase().includes(e.target.value.toLowerCase()) 
      ))
      // Onsearching setting the result and clearing the rest
    this.setState({ 
       updatedSearch: result,
       updatedData: [], 
       sliderValue: 0 ,
       endDate:'',
       startDate:'',
       filterDate: [] 
      })
      } else 
      this.setState({ updatedSearch: []})
  };

  //sorting in ascending order
  sortBypriceAsc = () => {
    const { updatedData } = this.state;

    const sortedData = updatedData.length > 0 ? (this.state.updatedData.sort((a,b) => a.cost > b.cost ? 1 : b.cost > a.cost ? -1 : 0)) :
    (this.state.data.length > 0 && 
    this.state.data.sort((a,b) => a.cost > b.cost ? 1 : b.cost > a.cost ? -1 : 0))
    //Checking if UpdatedData is present then we want to setState on that data else on original data
    updatedData.length > 0 ? 
    (this.setState({ 
      updatedData: sortedData
    })) : (this.setState({ 
      data: sortedData
    }))
  };

  //sorting in descending order
  sortBypriceDsc = () => {
    const { updatedData } = this.state;
    //If updatedData is true then we sort on that else on Original Data
    const sortedData = updatedData.length > 0 ? (
    this.state.updatedData.sort((a,b) => a.cost > b.cost ? -1 :
     b.cost > a.cost ? 1 : 0)) :
    (this.state.data.length > 0 && 
    this.state.data.sort((a,b) => a.cost > b.cost ? -1 : b.cost > a.cost ? 1 : 0))
    //Checking if UpdatedData is present then we want to setState on that data else on original data
    updatedData.length > 0 ? 
    (this.setState({ 
      updatedData: sortedData
    })) : (this.setState({ 
      data: sortedData
    }))
  }

  //sorting according to date
  sortBypublish = () => {
    const { updatedData } = this.state;
    //Conditionally rendering UI
    const sortedDate = updatedData.length > 0 ? (
      this.state.updatedData.sort((a,b) => Date.parse(a.publishdate) > Date.parse(b.publishdate) ? -1 
      :
       Date.parse(b.publishdate) > Date.parse(a.publishdate) ? 1 : 0)) : 
        (this.state.data.length > 0 && 
      this.state.data.sort((a,b) => Date.parse(a.publishdate) > Date.parse(b.publishdate) ? -1 
      : 
      Date.parse(b.publishdate) > Date.parse(a.publishdate) ? 1 : 0))
      //If updatedData is true thn we setState on updateddata else on original data
      updatedData.length > 0 ? 
      (this.setState({ 
        updatedData: sortedDate
      })) : (this.setState({ 
        data: sortedDate
      }))
  };

  //Filtering the cost with sliderValue
  costFilter = (e, data) => {
    this.setState({
      sliderValue: [e.target.value]
    });
    const newdata = [...data];
    const result = (newdata.filter(item => (
      (Number(item.cost) > 0 && Number(item.cost) < e.target.value)
    )))
    const sortedResult = result.sort((a,b) => a.cost > b.cost ? 1 : b.cost > a.cost ? -1 : 0)
    this.setState({ updatedData: sortedResult })
  };

  //Clearingout the costfilter
  handleClearCost = data => {
    this.setState({
      updatedData: data,
      sliderValue: 0
    })
  };

  //Getting the event value for Date and setting on state
  handleChangeDate = (e) => {
     this.setState({[e.target.name] : (e.target.value)})
  }

  //Filtering the Date and converting date to number with Date.parse()
  filterDate = (data) => {
    const { startDate, endDate } = this.state;

    const newData = [...data];
     const filteredDate = newData.filter(item => (
       Date.parse(item.publishdate) > Date.parse(startDate) && Date.parse(item.publishdate) < Date.parse(endDate)
     ));
     this.setState({
       filterDate: filteredDate
     })
  };

  //Clearing the Input and resetting the list
  ClearDate = data => {
     this.setState({ 
       filterDate: data,
       startDate: '',
       endDate: ''
     })
  };


  render() {
    const { data, searchTerm, updatedSearch, sliderValue,updatedData, filterDate, startDate, endDate } = this.state;

    return (
      <div>
        <SearchBar 
          searchTerm={searchTerm} 
          handleChange={this.handleChange}
          data={data}
        />
        
        {/* Sorting feature  */}
        {<div className="sorting">SortBy: <div className="sorting2" onClick={this.sortBypriceAsc}>Price--Low to High</div> 
        
        <div className="sorting2" onClick={this.sortBypriceDsc}>Price--High to Low</div>
        
        <div className="sorting2" onClick={this.sortBypublish}>Recent-Published</div></div>}

        {/* DateFilter */}
          <DateFilter handleChangeDate={this.handleChangeDate} filterDate={this.filterDate} data={data} ClearDate={this.ClearDate}
          startDate={startDate} endDate={endDate}
          />

        {/* COST SLIDER  */}
        <CostSlider costFilter={this.costFilter} sliderValue={sliderValue} data={data} handleClearCost={() => this.handleClearCost(data)}/>

        {/* Search Feature and displayingUI */}

        { filterDate.length > 0 ? filterDate.map(item => (
          <UIComponent item={item} key={item.id}/>
        )) :
        ( updatedData.length > 0 ? (updatedData.map(item => (
          <UIComponent item={item} key={item.id}/>
        ))) : 
          (updatedSearch.length > 0 ? (updatedSearch.map(item => (
          <UIComponent item={item} key={item.id}/>
        ))) : 
        (data.length > 0 ? (
          data.map(item => (
           <UIComponent item={item} key={item.id} />
          ))
        ): <Loading/>)))}
      </div>
    );
  }
}

export default ReportList;