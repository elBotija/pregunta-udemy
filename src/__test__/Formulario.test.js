import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Formulario from '../components/Formulario';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

const crearCita = jest.fn();

//no es necesario en ultimas verciones
afterEach(cleanup);

test('<Formulario/> cargar formulario', () => {
  // const wrapper = render(<Formulario/>);
  // wrapper.debug();

  // const { getByText } = render(<Formulario/>);
  // expect(getByText('Crear Cita')).toBeInTheDocument()

  // or

  render(<Formulario crearCita={crearCita} />);
  expect(screen.getByText('Crear Cita')).toBeInTheDocument();

  //header
  const titulo = screen.getByTestId('titulo');
  expect(titulo.textContent).toBe('Crear Cita');
  expect(titulo.textContent).not.toBe('otro texto');

  expect(titulo.tagName).toBe('H2');
  expect(titulo.tagName).not.toBe('H1');

  //button
  const btn = screen.getByTestId('btn-submit');
  expect(btn.tagName).toBe('BUTTON');
  expect(btn.textContent).toBe('Agregar Cita');
  expect(btn.textContent).not.toBe('Nueva Cita');

})

test('<Formulario /> Validar formulario', () => {
  render(<Formulario crearCita={crearCita} />);
  
  // click en submit
  const btnSubmit = screen.getByTestId('btn-submit');
  fireEvent.click(btnSubmit);

  // revisar alert
  const alerta = screen.getByTestId('alert'); 
  expect( alerta).toBeInTheDocument();
  expect( alerta.textContent).toBe('Todos los campos son obligatorios');
  expect( alerta.tagName).toBe('P');
  expect( alerta.tagName).not.toBe('BUTTON');

})

test('<Formulario /> Validar formulario 2', () => {
  render(<Formulario crearCita={crearCita} />);

  userEvent.type(screen.getByTestId('mascota'),'Hook');
  userEvent.type(screen.getByTestId('propietario'),'Carlos');
  userEvent.type(screen.getByTestId('date'),'2021-09-10');
  userEvent.type(screen.getByTestId('hour'),'10:30');
  userEvent.type(screen.getByTestId('sintomas'),'solo duerme');

  // fireEvent.change(screen.getByTestId('mascota'), {
  //   target: { value: 'Hook' }
  // })

  // fireEvent.change(screen.getByTestId('propietario'), {
  //   target: { value: 'Carlos' }
  // })

  // click
  const btnSubmit = screen.getByTestId('btn-submit');
  userEvent.click(btnSubmit);

    // revisar alert
    const alerta = screen.queryByTestId('alert'); 
    expect( alerta).not.toBeInTheDocument();

    // Esperar que se llame crear cita
    expect( crearCita ).toHaveBeenCalledTimes(1);
});