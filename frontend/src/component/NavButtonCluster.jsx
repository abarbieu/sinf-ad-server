import NavButton from './NavButton.jsx';

export default function NavButtonCluster(props){
    return (
        <div style={{width: '210px', marginRight: '30px', marginTop: '25px', display: 'flex', justifyContent: 'space-between'}}>
            <NavButton text='Help'/>
            <NavButton text='Contact' />
        </div>
    )
}