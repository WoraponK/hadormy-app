// Lib
import React from 'react'

const Dorm = ({ params }: { params: { dormId: string } }) => {
  return (
    <div>
      <h1>{params.dormId}</h1>
    </div>
  )
}

export default Dorm
