import React from "react";
import placeholder from "./img/placeholder.png";
import FormTemplate from "./FormTemplate.jsx";
import Modal from "react-modal";
import axios from "axios";

export default class AdTemplate extends React.Component {
   constructor() {
      super();
      this.state = {
         image: placeholder,
         flightId: "",
         adName: "",
         mainText: "",
         subtext: "",
         linkText: "",
         linkLocation: "",
         height: 0,
         width: 0,
         modalState: false,
         errState: "",
         msgColor: "red",
         url: "http://localhost:8080/",
      };
   }

   fileChangedHandler = (e) => {
      const reader = new FileReader();

      reader.onload = () => {
         if (reader.readyState === 2) {
            this.setState({ image: reader.result });

            var image = new Image();
            image.src = reader.result;
            image.onload = () => {
               this.setState({ height: image.height });
               this.setState({ width: image.width });
               // console.table(this.state)
            };
         }
      };
      reader.readAsDataURL(e.target.files[0]);
   };

   uploadHandler = () => {
      if (
         this.state.adName !== "" &&
         this.state.image !== "" &&
         this.state.mainText !== "" &&
         this.state.subtext !== "" &&
         this.state.linkText !== "" &&
         this.state.linkLoc !== "" &&
         this.state.flightId !== ""
      ) {
         axios
            .post(this.state.url + "api/inventory", {
               image: this.state.image,
               adDataObject: {
                  adName: this.state.adName,
                  mainText: this.state.mainText,
                  subText: this.state.subtext,
                  linkText: this.state.linkText,
                  linkLoc: this.state.linkLoc,
                  height: this.state.height,
                  width: this.state.width,
                  flightId: this.state.flightId,
               },
            })
            .then(() => {
               this.setState({
                  errState: "Success",
                  msgColor: "green",
                  modalState: false,
               });
            })
            .catch((err) => {
               this.setState({ modalState: false });
               this.setState({
                  errState: "Error occured while submitting",
                  msgColor: "red",
               });
               window.scrollTo(0, 0);
            });
      } else {
         this.setState({ modalState: false });
         this.setState({ errState: "Incomplete form", msgColor: "red" });
         window.scrollTo(0, 0);
      }
   };

   updateTitleState = (s) => {
      this.setState({ adName: s });
   };

   updateMainState = (s) => {
      this.setState({ mainText: s });
   };

   updateSubState = (s) => {
      this.setState({ subtext: s });
   };

   updateLinkTextState = (s) => {
      this.setState({ linkText: s });
   };

   updateLinkToState = (s) => {
      this.setState({ linkLocation: s });
      console.log("changed");
   };

   updateFlightState = (s) => {
      this.setState({ flightId: s });
   };

   styleButton = {
      color: "#fff",
      width: "150px",
      height: "50px",
      backgroundColor: "#2B6CB3",
      borderRadius: "10px",
      border: "none",
   };

   render() {
      return (
         <>
            <Modal
               isOpen={this.state.modalState}
               onRequestClose={() => this.setState({ modalState: false })}
               style={{
                  overlay: {
                     backgroundColor: "#1e1e1e",
                  },
               }}
            >
               <h2>Does this information look correct?</h2>
               <p>{this.state.adName}</p>
               <p>{this.state.mainText}</p>
               <p>{this.state.subtext}</p>
               <p>{this.state.linkText}</p>
               <p>{this.state.linkLocation}</p>
               <p>{this.state.flightId}</p>
               <div
                  style={{
                     display: "flex",
                     justifyContent: "space-evenly",
                     marginBottom: "20px",
                  }}
               >
                  <button
                     style={this.styleButton}
                     onClick={() => this.setState({ modalState: false })}
                  >
                     Cancel
                  </button>
                  <button
                     style={this.styleButton}
                     onClick={() => this.uploadHandler()}
                  >
                     Confirm
                  </button>
               </div>
            </Modal>

            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  color: "#2B6CB3",
               }}
            >
               <div
                  style={{
                     flexDirection: "column",
                     display: "flex",
                     justifyContent: "center",
                     width: "60vw",
                  }}
               >
                  <h1 style={{ marginTop: "40px" }}>Create Ad</h1>
                  <h4 style={{ color: this.state.msgColor }}>
                     {this.state.errState}
                  </h4>
                  <div style={{ margin: "30px 0 10px 0" }}>
                     <input
                        type='file'
                        accept='image/x-png,image/gif,image/jpeg'
                        onChange={this.fileChangedHandler}
                     />
                  </div>
                  <div
                     style={{
                        marginBottom: "10px",
                        textAlign: "center",
                        border: "1px solid gray",
                     }}
                  >
                     <img
                        alt=''
                        src={this.state.image}
                        style={{
                           width: "auto",
                           maxWidth: "100%",
                           height: "250px",
                           padding: "10px",
                        }}
                     />
                  </div>
                  <FormTemplate
                     title={this.updateTitleState}
                     main={this.updateMainState}
                     sub={this.updateSubState}
                     flight={this.updateFlightState}
                     linkText={this.updateLinkTextState}
                     linkLoc={this.updateLinkToState}
                  />
                  <div style={{ marginBottom: "20px", textAlign: "center" }}>
                     <button
                        onClick={() => {
                           this.setState({ modalState: true });
                           console.table(this.state);
                        }}
                        style={this.styleButton}
                     >
                        Submit
                     </button>
                  </div>
               </div>
            </div>
         </>
      );
   }
}
