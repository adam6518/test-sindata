import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import axios from 'axios'
import './App.css';
import Modal from './Modal'

class App extends Component {
  state = {
    data: [],
    keyword: ''
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    axios.get(
      'http://localhost:5000/supplier/getdata'
    ).then(res => {
      console.log(res.data)
      this.setState({
        data: res.data
      })
    })
  }

  search = () => {
    axios.get(
      'http://localhost:5000/supplier/search', {
        params : {
          inputan : this.state.keyword
        }
      }
    ).then(res => {
      console.log(res.data)
      this.setState({
        data: res.data
      })
    })
  }

  delete = (idSupp) => {
    axios.delete('http://localhost:5000/supplier/delete',
    {
      data : {
        idSupplier : idSupp
      }
    })
  }

  renderData = () => {
    return this.state.data.map((val, idx) => {
      console.log(val)
      return (
        <tr>
          <td>{val.Supplier_Name}</td>
          <td>{val.Address}</td>
          <td>{val.Phone}</td>
          <td>
            <Button onClick={() => { this.delete(val.idsupplierName) }}>Delete</Button>
          </td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div className="col-6">
        <div>
          <FormGroup style={{ marginLeft: '200px' }}>
            <Label>Search Supplier Name</Label>
            <Input onChange={(e) => this.setState({keyword : e.target.value})} style={{ width: '200px', height: '30px' }} type="text" placeholder="Search here ..." />
            <Button onClick={this.search} style={{ width: '200px', height: '30px', marginTop: '10px' }} onClick={this.search} className="mb-1" color="primary">Search</Button>
          </FormGroup>
        </div>
        <div style={{ marginLeft: '500px', marginBottom: '20px' }}>
          <Button color="primary" className="mr-5">
            <Modal />
          </Button>
          <a href="/">
            <Button color="primary">Refresh</Button>
          </a>
        </div>
        <Table style={{ marginLeft: '500px' }}>
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.renderData()}
          </tbody>
        </Table >
      </div >
    )
  }
}

export default App;
