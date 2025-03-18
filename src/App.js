import React, { useEffect, useState } from 'react';
import './style.css';

function App() {
    const [pokemon, setPokemon] = useState(null);
    const [pokemonName, setPokemonName] = useState('');
    const [loading, setLoading] = useState(false); 

    function loadAPI(name) {
        setLoading(true); 
        let url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokémon não encontrado!');
                }
                return response.json();
            })
            .then(json => {
                console.log(json);
                setPokemon(json);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setPokemon(null);
                setLoading(false);
                alert(err.message);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pokemonName.trim() === '') {
            alert('Por favor, digite o nome de um Pokémon.');
            return;
        }
        loadAPI(pokemonName);
    };

    return (
        <div className='container'>
            <header>
                <strong>Pokedex</strong>
            </header>

            {}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Digite o nome do Pokémon"
                    value={pokemonName}
                    onChange={(e) => setPokemonName(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>

            {}
            {loading && <div>Carregando...</div>}

            {}
            {pokemon && !loading && (
                <div className="pokemon-info">
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <div>Nome: {pokemon.name}</div>
                    <div>ID: {pokemon.id}</div>
                    <div>Peso: {pokemon.weight / 10} kg</div>
                    <div>Altura: {pokemon.height / 10} m</div>
                    <div>Tipo(s): {pokemon.types.map((type) => type.type.name).join(', ')}</div>
                </div>
            )}

            {}
            {!pokemon && !loading && <div>Nenhum Pokémon encontrado.</div>}
        </div>
    );
}

export default App;