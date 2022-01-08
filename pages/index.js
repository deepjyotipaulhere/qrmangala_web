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
        <img src="https://eeonitus.sirv.com/qrm1.png" style={{width:'100%',height:'auto'}} />
        <img src="https://eeonitus.sirv.com/qrm2.png" style={{width:'100%',height:'auto'}} />
    </Master>
  )
}
