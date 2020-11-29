import NavButtonCluster from "./NavButtonCluster.jsx";
import { Link } from "react-router-dom";

function NavBar(props) {
   return (
      <div
         style={{
            width: "100vw",
            height: "100px",
            backgroundColor: "#2B6CB3",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            top: "0px",
         }}
      >
         <Link to='/' style={{ textDecoration: "none" }}>
            <h1
               style={{
                  color: "#fff",
                  fontWeight: "150",
                  margin: "25px 0 0 30px",
                  fontSize: "48px",
               }}
            >
               SINF Ad Server
            </h1>
         </Link>
         <NavButtonCluster />
      </div>
   );
}

export default NavBar;
