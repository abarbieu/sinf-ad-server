export default function FlowButton(props){
    return (
        <button style={{fontSize: '20px', border: 'none', opacity: '.9', borderRadius: '10px' ,width: '50vw', height: '70px', color: '#fff', backgroundColor: '#2B6CB3', marginBottom: '15px'}}>{props.text}</button>
    )
}