import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cartas, setCartas] = useState([]);
  const [coleccion, setColeccion] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://api.tcgdex.net/v2/en/sets/base1',{
  method: 'GET'
})
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al conectar con TCGDex');
        }

        return response.json();
      })
      .then(data => {
        if (!data.cards || data.cards.length === 0) {
          throw new Error('No se encontraron cartas');
        }

        setCartas(data.cards.slice(0, 12));
        setColeccion(data.name);
      })
      .catch(error => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  return (
    <div className="app">
      <header className="encabezado">
        <p className="etiqueta">POKÉMON TRADING CARD GAME</p>
        <h1>Pokémon TCG</h1>
        <p className="subtitle">
          Descubre algunas de las cartas clásicas de Pokémon.
        </p>
      </header>

      <main>
        <div className="titulo-coleccion">
          <div>
            <h2>Galería de cartas</h2>
            <p>Una selección de nuestra colección</p>
          </div>

          <span className="cantidad">
            {cartas.length} cartas
          </span>
        </div>

        {cargando && <p className="mensaje">Cargando cartas...</p>}

        {error && <p className="mensaje">{error}</p>}

        <div className="cartas">
          {cartas.map(carta => (
            <div className="carta" key={carta.id}>
              <img
                src={carta.image ? `${carta.image}/low.webp` : ''}
                alt={carta.name}
              />

              <div className="informacion-carta">
                <h3>{carta.name}</h3>
                <p>{coleccion}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer>
        <p>Datos e imágenes proporcionados por TCGDex API</p>
      </footer>
    </div>
  );
}

export default App;