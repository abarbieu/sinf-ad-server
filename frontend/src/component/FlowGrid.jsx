import FlowButton from "./FlowButton"

export default function FlowGrid(props){
    return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <FlowButton text='Create Ad'/>
        <FlowButton text='Inventory' />
        <FlowButton text='Campaign Statistics' />    
    </div>)
}