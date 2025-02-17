const perricosArray = [];
let breedSelected = '';
console.log(perricosArray);

const timeoutId = setTimeout(() => {
  document.querySelector('#add-warning').style.display = '';
}, 3000);
// console.log(getRandomDogImage());

// addPerrico();

function clearWarningMessage() {
  clearTimeout(timeoutId);
  document.querySelector('#add-warning').style.display = 'none';
}

function addSocialListeners() {
  document.querySelectorAll('.like').forEach((buttonNode) => {
    buttonNode.addEventListener('click', function () {
      const hermanico = buttonNode.previousElementSibling;
      const likeCountNode = hermanico.querySelector('.like-count');
      likeCountNode.innerText = Number(likeCountNode.innerText) + 1;
    });
  });

  document.querySelectorAll('.dislike').forEach((buttonNode) => {
    buttonNode.addEventListener('click', function () {
      console.log(buttonNode.closest('.card'));
      const likeCountNode = buttonNode.closest('.card').querySelector('.dislike-count');
      likeCountNode.innerText = Number(likeCountNode.innerText) + 1;
    });
  });
}

function renderPerricoArray() {
  const dogList = document.querySelector('#dog-list');
  dogList.innerHTML = '';

  perricosArray.forEach((dogImage, index) => {
    addPerrico(dogImage,false);
    const htmlAdd = `<div class="card">
  <img src="${dogImage}" alt="Perro" />
  <br />
  <p><span class="like-count"></span>❤️ <span class="dislike-count"></span>🤮</p>
  <button class="like">Preciosísimo</button> <button class="dislike">Feísisimo</button>
</div>`;

    dogList.innerHTML += htmlAdd;
  });

  addSocialListeners();
}

const renderBreeds = async () => {
  const allBreeds = await getAllBreeds(); //llamamos a la api
  const select = document.querySelector('#breeds'); 
  const filter = document.querySelector('#filter-breed');

  for (let breed in allBreeds) {  //recorremos el objeto de la api con todas las razas
    const option1 = document.createElement('option');
    option1.innerText = breed; // añadimos la raza al option, la raza se coge en el bucle for in
    option1.value = breed; // Establece el valor del option como el nombre de la raza
    select.appendChild(option1); // añadimos el elemento al select
  }
};

function addBreedButton(breed) {
  const buttonFilter = document.querySelector('#buttons-filter');
  const buttons = buttonFilter.querySelectorAll('.breed-filter');
  if(![...buttons].some(button => button.innerHTML === breed)) { 
    const newButton = document.createElement('button');
    newButton.className = 'breed-filter';
    newButton.innerHTML = breed;
    
    buttonFilter.appendChild(newButton);
    
    newButton.addEventListener('click', function () {
      const allCards = document.querySelectorAll('.card');
      const isActive = newButton.classList.contains('active');

      // Remove 'active' class from all buttons
      document.querySelectorAll('.breed-filter').forEach(btn => btn.classList.remove('active'));

      if (isActive) {
        // If the button is already active, show all cards again
        allCards.forEach(card => card.style.display = 'inline-block');
      } else {
        // Set this button as active
        newButton.classList.add('active');

        // Filter the cards
        allCards.forEach(card => {
          const altAttribute = card.querySelector('img').alt;
          card.style.display = (altAttribute === breed) ? 'inline-block' : 'none';
        });
      };
    });    
  };
};

const addPerrico = async (addToStart) => {

  document.querySelector('#add-1-perrico-start').disabled = true;
  const breed = document.querySelector('#breeds').value;
  
  const perricoImg = await getBreeds(breed);

  if (addToStart) {
    perricosArray.unshift(perricoImg);
  } else {
    perricosArray.push(perricoImg);
  }

  const dogList = document.querySelector('#dog-list');

  const isAnyFilterSelected = document.querySelector('.filter-selected');

  const perricoCardElement = document.createElement('div');
  perricoCardElement.className = 'card';
  perricoCardElement.style.display = isAnyFilterSelected ? 'none' : '';

  perricoCardElement.innerHTML = `
  <img src="${perricoImg}" alt="${breed}" />
  <br />
  <p><span class="like-count"></span>❤️ <span class="dislike-count"></span>🤮</p>
  <button class="like">Preciosísimo</button> <button class="dislike">Feísisimo</button>`;

  if (addToStart) {
    dogList.prepend(perricoCardElement);
  } else {
    dogList.appendChild(perricoCardElement);
  }

  addBreedButton(breed);

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
  document.querySelector('#add-1-perrico-start').disabled = false;

};

document.querySelector('#add-1-perrico').addEventListener('click', function () {
  clearWarningMessage();

  addPerrico();
});

document.querySelector('#add-1-perrico-start').addEventListener('click', function () {
  clearWarningMessage();
  
  addPerrico(true);
});

document.querySelector('#add-5-perricos').addEventListener('click', function () {
  clearWarningMessage();

  addPerrico();
  addPerrico();
  addPerrico();
  addPerrico();
  addPerrico();
});

const likeFilterButton = document.querySelector('#like-filter');

likeFilterButton.addEventListener('click', function () {
  likeFilterButton.classList.toggle('filter-selected');
  filterPerricos();
});

const dislikeFilter = document.querySelector('#dislike-filter');

dislikeFilter.addEventListener('click', function () {
  dislikeFilter.classList.toggle('filter-selected');
  filterPerricos();
});

function filterPerricos() {
  const isLikeFilterSelected = likeFilterButton.classList.contains('filter-selected');
  const isDislikeSelected = dislikeFilter.classList.contains('filter-selected');
  console.log('filtering', {
    isLikeFilterSelected,
    isDislikeSelected
  });

  document.querySelectorAll('.card').forEach((perricoNode) => {
    // si no hay ningún filtro aplicado, lo muestra
    if (!isLikeFilterSelected && !isDislikeSelected) {
      perricoNode.style.display = '';
      return;
    }
    // si preciosismo aplicado y hay preciosisimo lo muestra
    const likeCount = perricoNode.querySelector('.like-count').innerText;
    if (likeCount !== '' && isLikeFilterSelected) {
      perricoNode.style.display = '';
      return;
    }

    // si feísimo aplicado y hay feísimo lo muestra
    const dislikeCount = perricoNode.querySelector('.dislike-count').innerText;
    if (dislikeCount !== '' && isDislikeSelected) {
      perricoNode.style.display = '';
      return;
    }

    perricoNode.style.display = 'none';
  });
}

document.querySelector('#dislike-filter').addEventListener('click', function () {
  console.log('dislike filter clicked');
});

renderPerricoArray();
renderBreeds();

// let automaticPerrosCount = 0;
// const intervalId = setInterval(() => {
//   addPerrico();
//   automaticPerrosCount++;

//   if (automaticPerrosCount === 2) {
//     clearInterval(intervalId);
//   }
// }, 1000);