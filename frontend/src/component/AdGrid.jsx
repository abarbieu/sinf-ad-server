//import React, { useState, useEffect } from "react";
import AdPreview from "./AdPreview.jsx";
import axios from 'axios'
//import placeholder from "./img/placeholder.png";

export default function AdGrid(props) {
   //const [inv, setInv] = useState([]);
   const url = 'localhost:8080/';
   var getItems = [];

   axios.get(url+'api/inventory')
      .then((res) => {
          getItems = res;
       })
       .catch((err) => {
          console.error(err);
          console.log('Could not load data');
       })

   return (
      <div
         style={{
            width: "90%",
            position: "absolute",
            top: "150px",
            left: "5%",
            display: "flex",
            flexDirection: "column",
         }}
      >
         {getItems.map((v) => (
            <AdPreview key={v.adId} adObj={v} />
         ))}
      </div>
   );
}
