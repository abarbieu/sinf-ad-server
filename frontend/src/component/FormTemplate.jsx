import { Form } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import React, { Component } from 'react';
import axios from 'axios'
//import { Link } from 'react-router-dom'

export default class FormTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // flightId: "",
            // adName: "",
            // mainText: "",
            // subtext: "",
            // linkText: "",
            // linkLocation: "",
            button: "Select a flight",
            flights: []
        }
      }

    componentDidMount() {
        this.setState({flights: axios
            .get('api/inventory/flights')
            .catch((err) => console.error(err))
            .then(console.log('Flights received'))
        })
    }
    
    render() {
    return (
    <div style={{marginBottom: '30px'}}>
        <br />
        <Dropdown>
            <Dropdown.Toggle variant="warning" id="dropdown-basic">
                {this.state.button}
            </Dropdown.Toggle>          

            <Dropdown.Menu>
                {/* {
                    this.state.flights.map(f => {
                        <Dropdown.Item onClick={this.updateText(f)}>{f}</Dropdown.Item>
                    })
                } */}
                <Dropdown.Item onClick={() => {
                    this.props.flight('Test')
                    this.setState({button: 'Test'})
                    }}>
                        Test</Dropdown.Item>
                <Dropdown.Item> + </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

        <Form.Group>
        <br />
        <h3>Ad Name</h3>
        
        <Form.Control type="text" onChange={(e) => {this.props.title(e.target.value)}} />
        <br />
        <h3>Main text</h3>
        
        <Form.Control type="text"  onChange={(e) => {this.props.main(e.target.value)}} />
        <br />
        <h3>Sub text</h3>
        
        <Form.Control type="text"  onChange={(e) => {this.props.sub(e.target.value)}} />
        <br />
        <h3>Link Text</h3>
        
        <Form.Control type="text"  onChange={(e) => {this.props.linkText(e.target.value)}} />
        <br />
        <h3>Link Location</h3>
        
        <Form.Control type="text" placeholder="http://..." onChange={(e) => {this.props.linkLoc(e.target.value)}} />
        </Form.Group>
    </div>

    )
    }
}