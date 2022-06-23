import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';
import axios from 'axios';

function App() {

  // Arreglo de citas
  const [citas, guardarCitas] = useState([]);

  // Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
    axios({
      method: 'get',
      url: `http://localhost:4000/dev/get-all-apointment`,
    }).then(res => {
      if(res.status >= 200 && res.status < 300){
        console.log("sss",res.data);
        guardarCitas(res.data.apointments);
      }
    } );
  }, [] );

  // Función que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    axios({
      method: 'post',
      url: `http://localhost:4000/dev/create-apointment/${cita.id}`,
      data: cita
    }).then(res => {
      if(res.status >= 200 && res.status < 300){
        guardarCitas([ ...citas, cita ]);
      }
    } );
  }

  // Función que elimina una cita por su id
  const eliminarCita = id => {
    axios({
      method: 'delete',
      url: `http://localhost:4000/dev/apointment/${id}`,
    }).then(res => {
      if(res.status >= 200 && res.status < 300){
        const nuevasCitas = citas.filter(cita => cita.id !== id );
        guardarCitas(nuevasCitas);
      }
    } );
  }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas';

  return (
    <Fragment>
      <h1 data-testid="nombre-app">Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
              <Formulario 
                crearCita={crearCita}
              />
          </div>
          <div className="one-half column">
              <h2 data-testid="titulo-dinamico">{titulo}</h2>
              {citas.map(cita => (
                <Cita
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
