import React, { Component } from 'react'
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    FormGroup, Label, Input
} from 'reactstrap';
import { Link } from 'react-router-dom'
import axios from 'axios'

class Modals extends Component {

    state = {
        modal: false,
        suppName: '',
        address: '',
        phone: ''

    }

    toggle = () => {
        axios.post('http://localhost:5000/supplier/add', {
            supplierName: this.state.suppName,
            address: this.state.address,
            phone: this.state.phone
        }).then(res => {
            console.log(res.data)
        })

        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        return (
            <div>
                <Button color="primary" onClick={this.toggle}>Add</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add Supplier</ModalHeader>
                    <ModalBody>
                        <FormGroup style={{ marginLeft: '200px' }}>
                            <Label>Supplier Name</Label>
                            <Input onChange={(e) => this.setState({ suppName: e.target.value })} style={{ width: '200px', height: '30px' }} type="text" />
                        </FormGroup>
                        <FormGroup style={{ marginLeft: '200px' }}>
                            <Label>Address</Label>
                            <Input onChange={(e) => this.setState({ address: e.target.value })} style={{ width: '200px', height: '30px' }} type="text" />
                        </FormGroup>
                        <FormGroup style={{ marginLeft: '200px' }}>
                            <Label>Phone</Label>
                            <Input onChange={(e) => this.setState({ phone: e.target.value })} style={{ width: '200px', height: '30px' }} type="text" />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Save</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Modals