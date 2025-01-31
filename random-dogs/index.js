const perricosArray = ['https://images.dog.ceo/breeds/affenpinscher/n02110627_10439.jpg'];
console.log(perricosArray);


// Funcion para sumar los likes y dislikes al span
function addSocialListeners() {
  // Cogemos los botones de like
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



// Añade los perros en el array con un nuevo html que incluye la imagen de la api
function renderPerricoArray() {
  const dogList = document.querySelector('#dog-list');
  dogList.innerHTML = '';

  perricosArray.forEach((dogImage, index) => {
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

// setInterval (() => {
//   addPerrico();
// }, 10000);

const timeOutId = setTimeout (() => {
  alert("Pulsa algún botón para añadir perricos");
}, 1000);



// Añadimos la imagen
const addPerrico = async (addToStart) => {
  const perricoImg = await getRandomDogImage();

  // Añadimos la imagen al principio del array o al final
  if (addToStart) {
    perricosArray.unshift(perricoImg);
  } else {
    perricosArray.push(perricoImg);
  }

  const dogList = document.querySelector('#dog-list');

  const isAnyFilterSelected = document.querySelector('.filter-selected');

  const htmlAdd = `<div class="card" ${isAnyFilterSelected ? 'style="display:none"' : ''}>
  <img src="${perricoImg}" alt="Perro" />
  <br />
  <p><span class="like-count"></span>❤️ <span class="dislike-count"></span>🤮</p>
  <button class="like">Preciosísimo</button> <button class="dislike">Feísisimo</button>
  </div>`;

  if (addToStart) {
    dogList.innerHTML = htmlAdd + dogList.innerHTML;
  } else {
    dogList.innerHTML = dogList.innerHTML + htmlAdd;
  }
  addSocialListeners();
};

document.querySelector('#add-1-perrico').addEventListener('click', function () {
  const isFilterSelected = document.querySelector('#like-filter').classList.contains('filter-selected');
  if (isFilterSelected) {
    alert('no se puede bro');
    return;
  }
  addPerrico();
});

document.querySelector('#add-1-perrico-start').addEventListener('click', function () {
  addPerrico(true);
});

document.querySelector('#add-5-perricos').addEventListener('click', function () {
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