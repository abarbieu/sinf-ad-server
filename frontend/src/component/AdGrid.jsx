import AdPreview from "./AdPreview.jsx";
import axios from "axios";
//import placeholder from "./img/placeholder.png";
import React, { Component } from "react";

export default class AdGrid extends Component {
   constructor(props) {
      super(props);
      this.state = {
         items: [],
      };
      this.url = "http://localhost:8080/";
      this.inventoryURL = "http://localhost:8080/api/inventory/";
   }

   componentDidMount() {
      axios
         .get(this.url + "api/inventory")
         .then((res) => {
            this.setState({ items: res.data.adDataObjects });
            //console.table(getItems);
         })
         .catch((err) => {
            console.error(err);
            console.log("Could not load data");
         });
   }

   deleteAd = (id, adName) => {
      console.log("Deleting ad " + id);
      let newItems = [];
      this.state.items.forEach((item) => {
         if (item.adDataObject.adId != id) {
            newItems.push(item);
         }
      });
      this.setState({ items: newItems });
      // console.log(adName);
      axios
         .delete(this.inventoryURL + id, {
            data: {
               adName,
            },
         })
         .catch((err) => console.error(err))
         .then((res) => {
            console.log(res);
         })
         .catch((err) => {
            console.error(err);
         });
   };

   render() {
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
            {this.state.items.map((v) => (
               <AdPreview
                  key={v.adDataObject.adId}
                  adObj={v.adDataObject}
                  deleteAd={this.deleteAd}
               />
            ))}
         </div>
      );
   }
}
