import React, { useState } from 'react'
import placeholder from './img/placeholder.png'
import FormTemplate from './FormTemplate.jsx'
import Modal from 'react-modal'
import axios from 'axios'

export default function AdTemplate(props){
    var s = {
        image: placeholder,
        flightId: "",
        adName: "",
        mainText: "",
        subtext: "",
        linkText: "",
        linkLocation: "",
        height: -1, 
        width: -1,
    }

    const getFlights = async () => {
        axios.get('api/____')
        .catch((err) => {console.error(err)})
        .then(console.log('Flights loaded successfully'))
    }

    const [ adContents, setAdContents ] = useState(s)
    const [ modalState, setModalState ] = useState(false)
    const [ errState, setErrState ] = useState("")

    const fileChangedHandler = (e) => {
        const reader = new FileReader()
        reader.onload = () =>{
          if(reader.readyState === 2){
            setAdContents({image: reader.result})
          }
        }
        reader.readAsDataURL(e.target.files[0])
      }
      
      const uploadHandler = () => {
        axios
        .post('/api/inventory', adContents)
        .catch((err) => {
            setModalState(false)
            setErrState("An error occured while submitting.")
            window.scrollTo(0, 0)
         })
      }

      const styleButton = {color: '#fff', width: '150px', height: '50px', backgroundColor: '#2B6CB3', borderRadius: '10px', border: 'none'}


        return (
            <>
            <Modal isOpen={modalState} onRequestClose={() => setModalState(false)} style={{
                overlay: {
                    backgroundColor: '#1e1e1e'
                }
            }}>
                        <h2>Does this information look correct?</h2>
                        <p>{adContents.adName}</p>
                        <p>{adContents.mainText}</p>
                        <p>{adContents.subtext}</p>
                        <p>{adContents.linkText}</p>
                        <p>{adContents.linkLocation}</p>
                        <p>{adContents.flightId}</p>
                        <div style={{display: 'flex', justifyContent: 'space-evenly', marginBottom: '20px'}}>
                            <button style={styleButton} onClick={() => setModalState(false)}>Cancel</button>
                            <button style={styleButton} onClick={() => uploadHandler()}>Confirm</button>
                        </div>
            </Modal>

            <div style={{display: 'flex', justifyContent: 'center', width: '100%', color: '#2B6CB3'}}>
                <div style={{flexDirection: 'column', display: 'flex', justifyContent: 'center', width: '60vw'}}>
                    <h1 style={{marginTop: '40px'}}>Create Ad</h1>
                    <h4 style={{color: 'red'}}>{errState}</h4>
                    <div style={{margin: '30px 0 10px 0'}}>
                        <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={fileChangedHandler} />
                    </div>
                    <div style={{marginBottom: '10px', textAlign: 'center', border: '1px solid gray'}}>
                        <img src={adContents.selectedFile} style={{width: 'auto', maxWidth: '100%', height: '250px', padding: '10px'}} />
                    </div>
                    <FormTemplate />
                    <div style={{marginBottom: '20px', textAlign: 'center'}}>
                        <button onClick={() => {
                            setModalState(true)
                            }} style={styleButton}>Submit</button>
                    </div>
                    
                </div>
            </div>
            </>
        )
    
}