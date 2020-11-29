import Button from "react-bootstrap/Button";

export default function NavButton(props) {
   return (
      <Button
         variant='outline-light'
         style={{ width: "100px", height: "50px", fontSize: "20px" }}
      >
         {props.text}
      </Button>
   );
}
