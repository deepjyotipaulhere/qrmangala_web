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
      <img src="/qrm1.png" alt='graph1' style={{width:'100%'}} />
      <img src="/qrm2.png" alt='graph1' style={{width:'100%'}} />
    </Master>
  )
}
