import React from 'react'
import './App.css';
import { AppRouter } from './routes/AppRouter';
import { Provider } from 'react-redux'
import { store } from './store/store';

// En este componente deberias cargar tus rutas.
export function App() {
  return (
    <AppRouter/>
  );
}
export default App;