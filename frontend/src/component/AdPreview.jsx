import { Link } from "react-router-dom";
import axios from "axios";
//import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";

export default function AdPreview(props) {
   const resetWindow = () => {
      window.scrollTo(0, 0);
   };

   //console.log(props.adObj.id)
   return (
      // <Card style={{ height: '200px'}}>
      //     <Card.Body style={{textAlign: 'left'}}>
      //         <Card.Title>{props.header}</Card.Title>
      //         <Card.Text>{props.id}</Card.Text>
      //         <Button variant="danger" onClick={() => deleteAd()} style={{fontSize: '12px'}}>Delete</Button>
      //     </Card.Body>
      //     <Card.Img variant='top' src={placeholder} style={{height: '60%', width: 'auto', objectFit: 'contain'}} />
      // </Card>

      <div
         style={{
            color: "white",
            width: "100%",
            height: "100px",
            backgroundColor: "#2B6CB3",
            marginBottom: "5px",
            borderRadius: "10px",
         }}
      >
         <div style={{ display: "block", padding: "15px 0 0 15px" }}>
            <h3>{props.adObj.adName}</h3>
            <p>ID: {props.adObj.adId}</p>
         </div>
         <div
            className='detailsAndDelete'
            style={{ display: "flex", justifyContent: "space-evenly" }}
         >
            <Link
               to={{
                  pathname: `/inventory/${props.adObj.adId}`,
                  state: {
                     adObj: props.adObj,
                  },
               }}
            >
               <button className='detailsButton' onClick={resetWindow}>
                  Details
               </button>
            </Link>
            <Button
               variant='danger'
               onClick={() =>
                  props.deleteAd(props.adObj.adId, props.adObj.adName)
               }
               style={{ fontSize: "12px" }}
            >
               Delete
            </Button>
         </div>
      </div>
   );
}
