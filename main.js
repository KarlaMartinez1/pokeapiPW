document.getElementById('pokemonForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const pokemonInput = document.getElementById('pokemonInput').value.toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(data => {
            const pokemonContainer = document.createElement('div');
            pokemonContainer.classList.add('pokemon-container');

            const nameElement = document.createElement('h2');
            nameElement.textContent = data.name.toUpperCase();

            const idElement = document.createElement('p');
            idElement.innerHTML = `<strong style="color: #95b198;">ID:</strong> ${data.id}`;

            const spriteElement = document.createElement('img');
            spriteElement.src = data.sprites.front_default;

            const heightElement = document.createElement('p');
            heightElement.innerHTML = `<strong style="color: #95b198;">Altura:</strong> ${data.height / 10} m`;

            const weightElement = document.createElement('p');
            weightElement.innerHTML = `<strong style="color: #95b198;">Peso:</strong> ${data.weight / 10} kg`;

            const typesElement = document.createElement('p');
            typesElement.innerHTML = `<strong style="color: #95b198;">Tipo(s):</strong> ${data.types.map(typeInfo => typeInfo.type.name).join('<br>')}`;

            const abilitiesElement = document.createElement('p');
            abilitiesElement.innerHTML = `<strong style="color: #95b198;">Habilidades:</strong> ${data.abilities.map(abilityInfo => abilityInfo.ability.name).join('<br>')}`;

            pokemonContainer.appendChild(nameElement);
            pokemonContainer.appendChild(idElement);
            pokemonContainer.appendChild(spriteElement);
            pokemonContainer.appendChild(heightElement);
            pokemonContainer.appendChild(weightElement);
            pokemonContainer.appendChild(typesElement);
            pokemonContainer.appendChild(abilitiesElement);

            const pokemonInfo = document.getElementById('pokemonInfo');

            pokemonInfo.insertBefore(pokemonContainer, pokemonInfo.firstChild);

            pokemonInfo.classList.remove('hidden');
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
});
