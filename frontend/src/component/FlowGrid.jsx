import FlowButton from "./FlowButton";
import { Link } from "react-router-dom";

export default function FlowGrid(props) {
   return (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            top: "200px",
            position: "absolute",
            textAlign: "center",
         }}
      >
         <Link to='/create'>
            <FlowButton text='Create Ad' w='50vw' h='70px' />
         </Link>
         <Link to='/inventory'>
            <FlowButton text='Inventory' w='50vw' h='70px' />
         </Link>
         <Link to='/statistics'>
            <FlowButton text='Campaign Statistics' w='50vw' h='70px' />
         </Link>
      </div>
   );
}
