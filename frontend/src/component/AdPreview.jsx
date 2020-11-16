import { Link } from 'react-router-dom'
import axios from 'axios'

export default function AdPreview(props){
    const resetWindow = () => {
        window.scrollTo(0, 0)
    }

    const deleteAd = () => {
        console.log('Deleting ad ' + props.id)
        axios
            .delete('/inventory/' + props.id)
            .catch((err) => console.error(err))
    }

    return (
    <div style={{color: 'white', width: '100%', height: '100px', backgroundColor: '#2B6CB3', marginBottom: '5px', borderRadius: '10px'}}>
        <div style={{display: 'block', padding: '15px 0 0 15px'}}>
            <h3>{props.header}</h3>
            <p>ID: {props.id}</p>
        </div>
        <div className="detailsAndDelete" style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Link to={`/inventory/${props.id}`}><button className='detailsButton' onClick={resetWindow}>Details</button></Link>
            <button className="delete" onClick={deleteAd}>&#10005;</button>
        </div>
    </div>
    )
}