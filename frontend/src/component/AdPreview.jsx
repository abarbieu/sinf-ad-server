import { Link } from 'react-router-dom'

export default function AdPreview(props){
    return (
    <div style={{color: 'white', width: '100%', height: '100px', backgroundColor: '#2B6CB3', marginBottom: '5px', borderRadius: '10px'}}>
        <div style={{display: 'block', padding: '15px 0 0 15px'}}>
            <h3>{props.header}</h3>
            <p>ID: {props.id}</p>
        </div>
    <Link to={`/inventory/${props.id}`}><button class='detailsButton'>Details</button></Link>
    </div>
    )
}