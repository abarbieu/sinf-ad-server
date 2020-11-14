import React from 'react'
import FlowButton from './FlowButton.jsx'
import placeholder from './img/placeholder.png'
import FormTemplate from './FormTemplate.jsx'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class AdTemplate extends React.Component{
    state = {
        selectedFile: placeholder,
        flight: "",
        header: "",
        subtext: "",
        linkText: "",
        linkURL: ""
    }

    fileChangedHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2){
            this.setState({selectedFile: reader.result})
          }
        }
        reader.readAsDataURL(e.target.files[0])
      };
      
      uploadHandler = () => {
        axios.post('#', this.state)
      }

    

    render(){
        return (
            <div style={{display: 'flex', justifyContent: 'center', width: '100%', color: '#2B6CB3'}}>
                <div style={{flexDirection: 'column', display: 'flex', justifyContent: 'center', width: '60vw'}}>
                    <h1 style={{marginTop: '40px'}}>Create Ad</h1>
                    <div style={{margin: '30px 0 10px 0'}}>
                        <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={this.fileChangedHandler} />
                    </div>
                    <div style={{marginBottom: '10px', textAlign: 'center', border: '1px solid gray'}}>
                        <img src={this.state.selectedFile} style={{width: 'auto', maxWidth: '100%', height: '250px', padding: '10px'}} />
                    </div>
                    <FormTemplate />
                    <div style={{marginBottom: '10px', textAlign: 'center'}}>
                        <Link to='/inventory'><FlowButton text='Submit' onClick={this.uploadHandler} w='20vw' h='50px' /></Link>
                    </div>
                </div>
            </div>
        )
    }
    
}