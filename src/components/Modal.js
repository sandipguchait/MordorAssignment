import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalForm extends React.Component {

  render() {
    const { modal, toggle, item } = this.props;
    return (
      <div>
        <Modal isOpen={modal} toggle={toggle} className={this.props.className}>
          <ModalHeader toggle={toggle}>{item.title}</ModalHeader>
          <ModalBody>
            {item.description}
            <br/>
            <br/>
            Published: {item.publishdate}
            <br/>
            Cost: ${item.cost}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalForm;