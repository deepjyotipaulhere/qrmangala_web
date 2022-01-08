import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Master from './Master'
import qrmAxios from '../qrmAxios';
import Image from 'next/image';


export default function Index() {


  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    qrmAxios.get("locationvisit").then(response => {
      console.log(response.data);
      setData(response.data)

      setLoading(false)
    })
  }, [])

  return (
    <Master title="Location Hits">
      <div style={{ width: '100%', }}>
        {/* <h3>Scans</h3> */}
        <Image src="/qrm1.png" alt='graph1' width="100%" height="100%" layout="responsive" objectFit="contain" />
      </div>
      <br></br>
      <div style={{ width: '100%', position: '' }}>
        <Image src="/qrm2.png" alt='graph1' width="100%" height="100%" layout="responsive" objectFit="contain" />
      </div>
    </Master>
  )
}
