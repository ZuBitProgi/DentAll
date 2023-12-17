import React from 'react'

export default function HoteliLista({hoteli}) {
  return (
    <>
      {hoteli.map((hotel) => (<h1 key={hotel.id}>{hotel.name}</h1>))}
    </>
  )
}
