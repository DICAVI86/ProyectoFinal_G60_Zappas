import React, { useState, useEffect } from 'react';

function Perfil() {




  return (
    <div>
  <div className="container my-5">
    <div className="row">
      {/* Primera columna: Perfil del usuario */}
      <div className="col-md-3 text-center">
        <img
          src="https://via.placeholder.com/150"
          alt="Foto del Usuario"
          className="profile-photo"
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
        <h3 className="mt-3">Nombre del Usuario</h3>
        <button className="btn btn-secondary btn-sm mt-2">Editar Información</button>
        <button className="custom-button">Agregar Producto</button>
      </div>

      {/* Otras tres columnas: Carts */}
    


      <div className="col-md-3">
      
      </div>

    </div>
  </div>


    </div>
  )
}

export default Perfil