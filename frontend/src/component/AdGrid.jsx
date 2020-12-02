import React, { useState, useEffect } from "react";
import AdPreview from "./AdPreview.jsx";
import axios from 'axios'
//import placeholder from "./img/placeholder.png";

export default function AdGrid(props) {
   //const [inv, setInv] = useState([]);
   const url = 'http://localhost:8080/';
   const [items, setItems] = useState([])

    axios.get(url+'api/inventory')
      .then((res) => {
          setItems(res.data.adDataObjects);
          //console.table(getItems);
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
         {items.map((v) => (
            <AdPreview key={v.adDataObject.adId} adObj={v.adDataObject} />
         ))}
      </div>
   );
}
