import React, { useState, useEffect } from "react";
import AdPreview from "./AdPreview.jsx";
//import axios from 'axios'
import placeholder from "./img/placeholder.png";

export default function AdGrid(props) {
   const [inv, setInv] = useState([]);

   useEffect(() => getItems(), []);

   const getItems = async () => {
      // axios.get('api/inventory')
      // .then((res) => {
      //     return res.data.map((ad) => {
      //        setInv(inv.append(ad));
      //     });
      //  })
      //  .catch((err) => {
      //     console.error(err);
      //     console.log('Could not load data')
      //  })
      const items = [
         {
            header: "header 1",
            id: "10293-1028",
            flight: "Mobile",
         },
         {
            header: "header 2",
            id: "59341-4392",
            flight: "Computer",
         },
         {
            header: "header 3",
            id: "46984-1957",
            flight: "Mobile",
         },
      ];

    const getItems = async () => {
        // axios.get('api/inventory')
        // .then((res) => {
        //     return res.data.map((ad) => {
        //        setInv(inv.append(ad));
        //     });
        //  })
        //  .catch((err) => {
        //     console.error(err);
        //     console.log('Could not load data')
        //  })
        const items = [
            {
                adName: 'header 1',
                adId: '102931028',
                mainText: 'main',
                subText: 'sub',
                linkText: 'link text',
                linkLoc: '#',
                flightId: 'Mobile',
                image: placeholder
            },
            {
                adName: 'header 2',
                adId: '534514312',
                mainText: 'main',
                subText: 'sub',
                linkText: 'link text',
                linkLoc: '#',
                flightId: 'Desktop',
                image: placeholder
            },
            {
                adName: 'header 3',
                adId: '830170283',
                mainText: 'main',
                subText: 'sub',
                linkText: 'link text',
                linkLoc: '#',
                flightId: 'Mobile',
                image: placeholder
            }
        ]

        setInv(items)
    }

    return (
        <div style={{width: '90%', position: 'absolute', top: '150px', left: '5%' , display: 'flex', flexDirection: 'column'}}>
            {inv.map(v => (
                <AdPreview key={v.adId} adObj={v} />
            ))}
        </div>
        )
}
