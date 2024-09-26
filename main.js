document.getElementById('pokemonForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const pokemonInput = document.getElementById('pokemonInput').value.toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokemon no encontrado');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('name').textContent = data.name.toUpperCase();
            document.getElementById('id').textContent = data.id;
            document.getElementById('sprite').src = data.sprites.front_default;
            document.getElementById('height').textContent = data.height / 10 + ' m';
            document.getElementById('weight').textContent = data.weight / 10 + ' kg';

            const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
            document.getElementById('types').textContent = types;

            const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
            document.getElementById('abilities').textContent = abilities;

            document.getElementById('pokemonInfo').classList.remove('hidden');
        })
        .catch(error => {
            alert('Error: ' + error.message);
            document.getElementById('pokemonInfo').classList.add('hidden');
        });
});
