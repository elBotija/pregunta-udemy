import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import App from '../App';

afterEach(cleanup);

test('render component <App/> and validate content', () => {
  render(<App />);
  expect(screen.getByText('Administrador de Pacientes')).toBeInTheDocument();
  expect(screen.getByTestId('nombre-app').textContent).toBe("Administrador de Pacientes");
  expect(screen.getByTestId('nombre-app').tagName).toBe("H1");

  expect(screen.getByText('Crear Cita')).toBeInTheDocument(); 
  expect(screen.getByText('No hay citas')).toBeInTheDocument();
}); 

test('compleate form, submit and validate result', async () => {
  render(<App />);
  userEvent.type(screen.getByTestId('mascota'),'Hook');
  userEvent.type(screen.getByTestId('propietario'),'Carlos');
  userEvent.type(screen.getByTestId('date'),'2021-09-10');
  userEvent.type(screen.getByTestId('hour'),'10:30');
  userEvent.type(screen.getByTestId('sintomas'),'solo duerme');

  // click
  userEvent.click(screen.getByTestId('btn-submit'));
  //delay for async
  await new Promise(resolve => setTimeout(resolve, 1000));
  // screen.debug()
  expect(screen.getByTestId('titulo-dinamico').textContent).toBe('Administra tus Citas');
  expect(screen.getByTestId('titulo-dinamico').textContent).not.toBe('No hay citas');
})