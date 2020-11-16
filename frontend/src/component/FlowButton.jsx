export default function FlowButton(props){
    return (
        <button className="flowButton" style={{width: props.w, height: props.h}}>{props.text}</button>
    )
}