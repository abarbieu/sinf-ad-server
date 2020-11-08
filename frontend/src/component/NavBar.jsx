import NavButtonCluster from './NavButtonCluster.jsx'

function NavBar(props){
    return (
        <div style={{
        width: '100vw', 
        height: '100px', 
        backgroundColor: '#2B6CB3', 
        color: '#fff', 
        display: 'flex', 
        justifyContent: 'space-between',
        top: '0px',
        opacity: '.9'}}>
            <h1 style={{color: '#fff', fontWeight: '150', margin: '20px 0 0 30px', fontSize: '48px'}}>Ad Server</h1>
            <NavButtonCluster />
        </div>
    )
}

export default NavBar