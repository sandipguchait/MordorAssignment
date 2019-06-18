import React from 'react';
import ModalForm from './Modal';


class UIComponent extends React.Component {

  state = {
    modal:false
  };

  //toggle on/off feature for modal
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  //Date Formatting
  renderDate = date => {
    let options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    let formattedDate = new Date(date);
    return formattedDate.toLocaleString('en-us', options)
  }


  render(){
    const {item} = this.props;
    const { modal } = this.state;
    return (
      <div>
      <div className="container" onClick={this.toggle}>
          <div className="row" style={{ marginBottom: "30px", backgroundColor:"aliceblue"}}>
              <div className="col-12 mt-3">
                  <div className="card">
                      <div className="card-horizontal">
                      <div className="card-img-body">
                        <img className="card-img" src={item.image} alt={item.title} />
                      </div>
                          <div className="card-body">
                              <h4 className="card-title">{item.title}</h4>
                              <p className="card-text">{item.description}</p>
                              <p><strong>Published: </strong> {this.renderDate(item.publishdate)}</p>
                              <p><strong>Cost Of Report:</strong> ${item.cost}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      { modal && <ModalForm item={item} modal={modal} toggle={this.toggle}/> }
      </div>
    );
  }
};

export default UIComponent;
