import React from 'react'

function InicioSesion() {
  return (
    <form className='col-10 col-sm-6 col-md-3 m-auto mt-5'>
        <h1>Iniciar Sesión</h1>
        <hr />
        <div className='form-group mt-1 '>
        <label>Email address</label>
        <input
            value=''
            type='email'
            name='email'
            className='form-control'
            placeholder='Enter email'
        />
        </div>
        <div className='form-group mt-1 '>
        <label>Password</label>
        <input
            value=''
            type='password'
            name='password'
            className='form-control'
            placeholder='Password'
        />
        </div>
        <button type='submit' className='btn btn-light mt-3'>Iniciar Sesión</button>
    </form>
  )
}

export default InicioSesion