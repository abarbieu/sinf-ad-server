import NavButton from "./NavButton.jsx";
import { Link } from "react-router-dom";

export default function NavButtonCluster(props) {
   return (
      <div
         style={{
            width: "210px",
            marginRight: "30px",
            marginTop: "25px",
            display: "flex",
            justifyContent: "space-between",
         }}
      >
         <Link to='/'>
            <NavButton text='Home' />
         </Link>
         <NavButton text='Help' />
      </div>
   );
}
