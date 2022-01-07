import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Form, Input } from 'semantic-ui-react'
import Master from './Master'
import qrmAxios from '../qrmAxios'

export default function Locations() {
    const [locations, setLocations] = useState([])

    const [name, setName] = useState('')
    const [next, setNext] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getLocation()
    }, [])

    const getLocation = () => {
        qrmAxios.get("location").then(response => {
            setLocations(response.data.map(loc => {
                return {
                    key: loc.id,
                    text: loc.name,
                    value: loc.id,
                }
            }))
        })
    }

    const saveLocation = () => {
        setLoading(true)
        qrmAxios.post("location/", {
            name: name,
            next: next,
            icon: 'deafult',
            color: 'black'
        }).then(res => {
            setName('')
            setNext([])
            getLocation()
            setLoading(false)
        })
    }


    return (
        <Master title="Locations">
            <Form>
                <Form.Group inline>
                    <Input placeholder="Location Name" onChange={e => setName(e.target.value)} /><br />
                    <Dropdown placeholder='Places that can be reached from here' selection multiple options={locations} onChange={(e, { value }) => setNext(value)} />
                    <Button loading={loading} primary onClick={saveLocation}>Save</Button>
                </Form.Group>
            </Form>
            <h3>Saved Locations</h3>
            {locations.map((loc, i) => (
                <li key={loc.id}>{loc.text}</li>
            ))}
        </Master>
    )
}
