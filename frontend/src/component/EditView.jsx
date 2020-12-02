import { useState } from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom'

export default function EditView(props){
    const ad = props.location.state.adObj
    const [adInfo, setAdInfo] = useState(
        {
            image: ad.image,
            flightId: ad.flightId,
            adName: ad.adName,
            mainText: ad.mainText,
            subText: ad.subText,
            linkText: ad.linkText,
            linkLocation: ad.linkLoc,
            height: ad.height,
            width: ad.width,
         }
    )

    const fileChangedHandler = (e) => {
        const reader = new FileReader();
  
        reader.onload = () => {
           if (reader.readyState === 2) {
              setAdInfo({ image: reader.result });
  
              var image = new Image();
              image.src = reader.result;
              image.onload = () => {
                setAdInfo({ height: image.height });
                setAdInfo({ width: image.width });
              };
           }
        };
        reader.readAsDataURL(e.target.files[0]);
     };

    const uploadHandler = () => {
        if (
           adInfo.adName !== "" &&
           adInfo.image !== "" &&
           adInfo.mainText !== "" &&
           adInfo.subText !== "" &&
           adInfo.linkText !== "" &&
           adInfo.linkLoc !== "" &&
           adInfo.flightId !== ""
        ) {
           axios
              .put(`/api/inventory/${ad.adId}`, {
                 image: adInfo.image,
                 adDataObject: {
                    adName: adInfo.adName,
                    mainText: adInfo.mainText,
                    subText: adInfo.subText,
                    linkText: adInfo.linkText,
                    linkLoc: adInfo.linkLoc,
                    height: adInfo.height,
                    width: adInfo.width,
                    flightId: adInfo.flightId,
                 },
              })
              .catch((err) => {console.error(err)});
        }
     };
  
    const updateTitleState = (s) => {
        setAdInfo({ adName: s });
     };
  
    const updateMainState = (s) => {
        setAdInfo({ mainText: s });
     };
  
    const updateSubState = (s) => {
        setAdInfo({ subText: s });
     };
  
    const updateLinkTextState = (s) => {
        setAdInfo({ linkText: s });
     };
  
    const updateLinkToState = (s) => {
        setAdInfo({ linkLocation: s });
     };
  
    const updateFlightState = (s) => {
        setAdInfo({ flightId: s });
     };

    const editView = (
        <>
        <Form.Group>
            <br />
            
            <h3>Ad Name</h3>
            <Form.Control style={{width: '70%'}} type="text" value={adInfo.adName} onChange={(e) => {updateTitleState(e.target.value)}} />
                
            <br />                
            
            <h3>ID: {ad.adId} &#128274;</h3>
            <br />

            <div style={{ margin: "30px 0 10px 0" }}>
                <input
                type='file'
                accept='image/x-png,image/gif,image/jpeg'
                onChange={fileChangedHandler}
                />
            </div>
            <img style={{border: '2px solid #2B6CB3', marginBottom: '20px'}} src={adInfo.image} alt='' />
            
            <Dropdown>
                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                    {adInfo.flightId}
                </Dropdown.Toggle>          

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => {
                        updateFlightState('1')
                        }}>
                            1</Dropdown.Item>

                    <Dropdown.Item onClick={() => {
                        updateFlightState('2')
                        }}>
                            2</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <h3>Main text</h3>
            <Form.Control style={{width: '70%'}} type="text" value={adInfo.mainText} onChange={(e) => {updateMainState(e.target.value)}} />
            
            <br />

            <h3>Sub text</h3>
            
            <Form.Control style={{width: '70%'}} type="text" value={adInfo.subText} onChange={(e) => {updateSubState(e.target.value)}} />
            <br />
            <h3>Link Text</h3>
            
            <Form.Control style={{width: '70%'}} type="text" value={adInfo.linkText} onChange={(e) => {updateLinkTextState(e.target.value)}} />
            <br />
            <h3>Link Location</h3>
            
            <Form.Control style={{width: '70%'}} type="text" value={adInfo.linkLoc} onChange={(e) => {updateLinkToState(e.target.value)}} />
        </Form.Group>

        <button className='editButton' onClick={uploadHandler} >Done</button>
        </>
    )
    


    return (
        <div style={{margin: '40px 4% 60px 4%', color: '#2B6CB3'}}>
            <Link to={`/inventory`} ><button className='backButton'>Back</button></Link>
            {editView}
        </div>
    )
}