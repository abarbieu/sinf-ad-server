import { Form } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import React, { useState } from 'react';
import {Link} from 'react-router-dom'

export default function FormTemplate(props) {
    const [button, setButton] = useState("Select Flight")

    const updateText = newText => {
        //setButton(newText)
    }

    return (
    <div style={{marginBottom: '30px'}}>
        <br />
        <Dropdown>
            <Dropdown.Toggle variant="warning" id="dropdown-basic">
                {button}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={updateText('Flight 1')}>1</Dropdown.Item>
                <Dropdown.Item onClick={updateText('Flight 2')}>2</Dropdown.Item>
                <Dropdown.Item onClick={updateText('Flight 3')}>3</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

        <Form.Group>
        <br />
        <h3>Header</h3>
        
        <Form.Control type="text" />
        <br />
        <h3>Description</h3>
        
        <Form.Control type="text" />
        <br />
        <h3>Link Text</h3>
        
        <Form.Control type="text" />
        <br />
        <h3>Click Through URL</h3>
        
        <Form.Control type="text" placeholder="http://..." />
        </Form.Group>
    </div>

    )
}