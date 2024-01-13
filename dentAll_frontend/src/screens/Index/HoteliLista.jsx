import React from 'react'
import GoogleMap from '../GoogleMap'

export default function HoteliLista({hoteli}) {
  return (
    <>
      {hoteli.map((hotel) => (<h1 key={hotel.id}>{hotel.name}</h1>))}
     <GoogleMap /> 
    </>
  )
}
