// Array que guarda los perros agregados
const perricosArray = []; 

// Objeto que lleva un registro de cuántos perros de cada raza se han agregado
const breedsCount = {}; 

// Array que contiene las razas filtradas
const breedsFiltersApplied = []; 

// Almacena la raza seleccionada, aunque actualmente no se usa
let breedSelected = ''; 

// Temporizador para mostrar un mensaje de advertencia después de 3 segundos
const timeoutId = setTimeout(() => {
  document.querySelector('#add-warning').style.display = '';
}, 3000);

// Función para limpiar el mensaje de advertencia
function clearWarningMessage() {
  clearTimeout(timeoutId);  // Elimina el temporizador (setTimeout) previamente establecido.
  document.querySelector('#add-warning').style.display = 'none';  // Oculta el mensaje de advertencia.
}

// Función para agregar los eventos de "me gusta" y "no me gusta" a los perros
function addSocialListeners() {
  document.querySelectorAll('.like').forEach((buttonNode) => {
    buttonNode.addEventListener('click', function () {
      const hermanico = buttonNode.previousElementSibling;
      const likeCountNode = hermanico.querySelector('.like-count');
      likeCountNode.innerText = Number(likeCountNode.innerText) + 1;  // Incrementa el contador de "me gusta".
    });
  });

  document.querySelectorAll('.dislike').forEach((buttonNode) => {
    buttonNode.addEventListener('click', function () {
      const likeCountNode = buttonNode.closest('.card').querySelector('.dislike-count');
      likeCountNode.innerText = Number(likeCountNode.innerText) + 1;  // Incrementa el contador de "no me gusta".
    });
  });
}

// Función que filtra los perros mostrados según las razas seleccionadas en los filtros
function renderPerricoArray() {
  const filteredArray = breedsFiltersApplied.length === 0 
  ? perricosArray 
  : perricosArray.filter(perrico => {
      return breedsFiltersApplied.includes(perrico.breed);  // Filtra perros por las razas seleccionadas.
    });
  console.log(filteredArray);  // Imprime el array filtrado.

  const dogList = document.querySelector('#dog-list');
  dogList.innerHTML = '';
  filteredArray.forEach((perricoInfo) => {
    renderPerrico(perricoInfo);
  })
}

// Función para obtener las razas de perros de la API y mostrarlas en un select
const renderBreeds = async () => {
  const allBreeds = await getAllBreeds();  // Obtiene las razas de perros desde una API.
  const select = document.querySelector('#breeds');
  
  for (let breed in allBreeds) {
    const option1 = document.createElement('option');
    option1.innerText = breed;
    option1.value = breed;
    select.appendChild(option1);  // Añade las opciones de razas al select en el HTML.
  }
};

// Función para agregar un botón de filtro de raza
function addBreedButton(breed) {
  const buttonFilterNode = document.querySelector('.breed-filters');
  let existingButton = buttonFilterNode.querySelector(`#${breed}-filter`);

  if (!existingButton) {
    breedsCount[breed] = 1;  // Si no existe el botón, inicializa el contador de perros de esa raza.
    const filterNode = document.createElement('button');
    filterNode.className = 'breed-filter';
    filterNode.id = `${breed}-filter`;
    filterNode.innerHTML = `${breed} (1)`;  // Añade el nombre de la raza y el contador.
    buttonFilterNode.appendChild(filterNode);  // Añade el botón de filtro al HTML.

    filterNode.addEventListener('click', function() {
      const index = breedsFiltersApplied.indexOf(breed);
  
      if(index === -1) {
        breedsFiltersApplied.push(breed);  // Añade la raza al filtro si no está presente.
        filterNode.classList.add('filter-selected');
      } else {
        breedsFiltersApplied.splice(index, 1);  // Elimina la raza del filtro si ya está aplicada.
        filterNode.classList.remove('filter-selected');
      }

      renderPerricoArray();  // Vuelve a renderizar los perros con el filtro aplicado.
    });
  } else {
    breedsCount[breed] += 1;  // Si ya existe el botón, actualiza el contador.
    existingButton.innerHTML = `${breed} (${breedsCount[breed]})`;  // Muestra el nuevo contador.
  }
}

// Función para crear y mostrar la tarjeta de un perro en la interfaz
function renderPerrico (perricoInfo, addToStart) {
  const dogList = document.querySelector('#dog-list');
  // const isAnyFilterSelected = document.querySelector('.filter-selected');

  const perricoCardElement = document.createElement('div');
  perricoCardElement.className = 'card';
  // perricoCardElement.style.display = isAnyFilterSelected ? 'none' : '';  // Oculta el perro si hay filtros aplicados.

  perricoCardElement.innerHTML = `
    <img src="${perricoInfo.imgUrl}" alt="Perro" />
    <br />
    <p><span class="like-count"></span>❤️ <span class="dislike-count"></span>🤮</p>
    <button class="like">Preciosísimo</button> <button class="dislike">Feísisimo</button>
  `;

  if (addToStart) {
    dogList.prepend(perricoCardElement);  // Si `addToStart` es true, agrega al principio.
  } else {
    dogList.appendChild(perricoCardElement);  // Si es `false`, agrega al final.
  }

  addBreedButton(perricoInfo.breed);  // Añade el botón de raza para filtros.

  // Eventos para los botones de "me gusta" y "no me gusta".
  const likeButton = perricoCardElement.querySelector('.like');
  likeButton.addEventListener('click', function () {
    const likeCountNode = perricoCardElement.querySelector('.like-count');
    likeCountNode.innerText = Number(likeCountNode.innerText) + 1;
  });

  const dislikeButton = perricoCardElement.querySelector('.dislike');
  dislikeButton.addEventListener('click', function () {
    const likeCountNode = perricoCardElement.querySelector('.dislike-count');
    likeCountNode.innerText = Number(likeCountNode.innerText) + 1;
  });
}

// Función para agregar un perro al array y renderizarlo
const addPerrico = async (addToStart) => {
  const breed = document.querySelector('#breeds').value;  // Obtiene la raza seleccionada.
  const perricoInfo = await getBreeds(breed);  // Obtiene la información del perro (API).
  perricoInfo.breed = breed;
  
  if (addToStart) {
    perricosArray.unshift(perricoInfo);  // Si es `true`, agrega al inicio.
  } else {
    perricosArray.push(perricoInfo);  // Si es `false`, agrega al final.
  }

  renderPerrico(perricoInfo, addToStart);  // Muestra el perro en la interfaz.
};

// Funciones para agregar perros a la lista con diferentes comportamientos
document.querySelector('#add-1-perrico').addEventListener('click', function () {
  clearWarningMessage();
  addPerrico();  // Llama a `addPerrico` para agregar un perro al final.
});

document.querySelector('#add-1-perrico-start').addEventListener('click', function () {
  clearWarningMessage();
  addPerrico(true);  // Llama a `addPerrico` para agregar un perro al principio.
});

document.querySelector('#add-5-perricos').addEventListener('click', function () {
  clearWarningMessage();
  addPerrico();  // Llama a `addPerrico` 5 veces para agregar 5 perros.
  addPerrico();
  addPerrico();
  addPerrico();
  addPerrico();
});

// Función para agregar filtros de "me gusta"
const likeFilterButton = document.querySelector('#like-filter');

likeFilterButton.addEventListener('click', function () {
  likeFilterButton.classList.toggle('filter-selected');
  filterPerricos();  // Filtra los perros según los "me gusta".
});

// Función para agregar filtros de "no me gusta"
const dislikeFilter = document.querySelector('#dislike-filter');

dislikeFilter.addEventListener('click', function () {
  dislikeFilter.classList.toggle('filter-selected');
  filterPerricos();  // Filtra los perros según los "no me gusta".
});

// Función para filtrar los perros mostrados según los filtros aplicados
function filterPerricos() {
  const isLikeFilterSelected = likeFilterButton.classList.contains('filter-selected');
  const isDislikeSelected = dislikeFilter.classList.contains('filter-selected');
  console.log('filtering', {
    isLikeFilterSelected,
    isDislikeSelected
  });

  document.querySelectorAll('.card').forEach((perricoNode) => {
    // Si no hay ningún filtro aplicado, lo muestra
    if (!isLikeFilterSelected && !isDislikeSelected) {
      perricoNode.style.display = '';
      return;
    }
    // Si preciosismo aplicado y hay preciosisimo lo muestra
    const likeCount = perricoNode.querySelector('.like-count').innerText;
    if (likeCount !== '' && isLikeFilterSelected) {
      perricoNode.style.display = '';
      return;
    }

    // Si feísimo aplicado y hay feísimo lo muestra
    const dislikeCount = perricoNode.querySelector('.dislike-count').innerText;
    if (dislikeCount !== '' && isDislikeSelected) {
      perricoNode.style.display = '';
      return;
    }

    perricoNode.style.display = 'none';  // Si no se cumple ningún filtro, oculta el perro.
  });
};

// Evento para los filtros de "no me gusta"
document.querySelector('#dislike-filter').addEventListener('click', function () {
  console.log('dislike filter clicked');
});

// Renderiza el array de perros inicialmente y las razas disponibles
renderPerricoArray();
renderBreeds();
