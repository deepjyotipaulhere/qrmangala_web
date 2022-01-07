import React, { useEffect, useState } from 'react'
import { Button, Divider, Dropdown, Form, Grid, GridColumn, Image } from 'semantic-ui-react'
import Master from './Master'
import qrmAxios from '../qrmAxios'

export default function Addqr() {
    const [qrs, setQrs] = useState([])
    const [loading, setLoading] = useState(true)
    const [partner, setPartner] = useState([])
    const [types, setTypes] = useState([])
    const [locations, setLocations] = useState([])

    const [selectedPartner, setSelectedPartner] = useState('')
    const [selectedLocation, setSelectedLocation] = useState('')

    const getQRCodes = () => {
        setLoading(true)
        qrmAxios.get("scan").then(response => {
            setQrs(response.data)
            setLoading(false)
        })
    }

    const getLocation = () => {
        qrmAxios.get("location").then(response => {
            setLocations(response.data.map(loc => {
                return {
                    text: loc.name, key: loc.id, value: loc.id
                }
            }))
        })
    }

    const getPartners = () => {
        qrmAxios.get("partner").then(response => {
            setPartner(response.data.map(part => {
                return {
                    text: part.name, 
                    key: part.id,
                    value: part.id
                }
            }))
        })
    }

    const getTypes = () => {
        qrmAxios.get("type").then(response => {
            setTypes(response.data)
        })
    }

    const createQRCode=()=>{
        qrmAxios.post("qrview/",{
            partner: selectedPartner,
            location: selectedLocation
        }).then(response=>{
            getQRCodes()
        })
    }

    useEffect(() => {
        getQRCodes()
        // getTypes()
        getPartners()
        getLocation()
        console.log(qrmAxios.defaults);
    }, [])


    return (
        <Master title='Add QR Code'>
            <Dropdown options={locations} placeholder='Select Location' selection onChange={(e,{value})=>setSelectedLocation(value)} />
            <Dropdown options={partner} placeholder='Partner' selection onChange={(e,{value})=>setSelectedPartner(value)} />
            <Button primary onClick={createQRCode}>Generate</Button>
            <Divider />
            {
                loading ? 'loading' :
                    <Grid columns={3}>
                        {qrs.data.map(qr => (
                            <GridColumn key={qr.id}>
                                <Image fluid src={`//${qrs.host}${qr.image}`} />
                                <center>
                                    {qr.location.name}
                                </center>
                            </GridColumn>

                        ))}
                    </Grid>
            }
        </Master>
    )
}
