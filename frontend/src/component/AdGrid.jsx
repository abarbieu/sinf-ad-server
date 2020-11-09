import React, { useState, useEffect } from 'react'
import AdPreview from './AdPreview.jsx'
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'


export default function AdGrid(props){
    const [inv, setInv] = useState([])

    useEffect(() => {
        getItems()
    }, [])

    const getItems = async () => {
        // const fetchItems = await fetch('')
        // const items = await fetchItems.json()
        const items = [
            {
                header: 'header 1',
                id: '10293-1028',
                flight: 'Mobile'
            },
            {
                header: 'header 2',
                id: '59341-4392',
                flight: 'Computer'
            },
            {
                header: 'header 3',
                id: '46984-1957',
                flight: 'Mobile'
            }
        ]
        setInv(items)
    }

    return (
    <div style={{width: '90%', position: 'absolute', top: '150px', left: '5%' , display: 'flex', flexDirection: 'column'}}>
        {inv.map(v => (
            <AdPreview header={v.header} id={v.id} flight={v.flight} />
        ))}
    </div>
    )
}