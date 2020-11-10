export default function FlowButton(props){
    return (
        <button class="flowButton" style={{width: props.w, height: props.h}}>{props.text}</button>
    )
}