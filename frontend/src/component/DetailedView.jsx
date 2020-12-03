//import { useState } from "react";
//import { Form } from "react-bootstrap";
//import axios from "axios";
//import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

export default function DetailedView(props) {
   const ad = props.location.state.adObj;

   const detailView = (
      <>
         <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Title: {ad.adName}</h1>
            <Link
               to={{
                  pathname: `/inventory/${ad.adId}/edit`,
                  state: {
                     adObj: ad,
                  },
               }}
            >
               <button className='editButton' onClick={console.log("clicked")}>
                  Edit
               </button>
            </Link>
         </div>
         <h1>ID: {ad.adId}</h1>
         <h3>Flight: {ad.flightId}</h3>
         <img
            style={{ border: "2px solid #2B6CB3", marginBottom: "20px" }}
            src={ad.imageLoc}
            alt=''
         />
         <h3>Main text: {ad.mainText}</h3>
         <h3>Subtext: {ad.subText}</h3>
         <h3>Link text: {ad.linkText}</h3>
         <h3>Link Location: {ad.linkLoc}</h3>
      </>
   );

   return (
      <div style={{ margin: "40px 4% 60px 4%", color: "#2B6CB3" }}>
         <Link to='/inventory'>
            <button className='backButton'>Back</button>
         </Link>
         {detailView}
      </div>
   );
}
