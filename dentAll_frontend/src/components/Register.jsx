import React from 'react'

const Register = ({username, password, roles}) => {


  return (
    <div className='smjestaj-container'>
        <div><span>username: </span>{username}</div>
        <div><span>password: </span>{password}</div>
        <div><span>roles: </span>{roles}</div>
    </div>
  )
}

export default Register
