const allImagesContainer = document.getElementById('all-images-container');
const navList = document.getElementById('nav-list');
const navListContent = document.querySelectorAll('.list-content');

// Create modal elements
const modal = document.createElement('div');
modal.className = 'modal';
const modalContent = document.createElement('div');
modalContent.className = 'modal-content';
const modalImage = document.createElement('img');
modalContent.appendChild(modalImage);
modal.appendChild(modalContent);
document.body.appendChild(modal);

async function requestImages() {
  const response = await fetch('images.json');
  const data = await response.json();
  return data[0];
}

//events
document.addEventListener('DOMContentLoaded', loadImages('nature'));
navList.addEventListener('click', filterImages);
modal.addEventListener('click', closeModal);

//events callback
function filterImages(event) {
  const clikedElement = event.target;
  
  if (clikedElement.classList.contains('list-content')) {
    allImagesContainer.innerHTML = '';

    activeState(clikedElement.textContent);

    loadImages(clikedElement.textContent.toLowerCase());
  }
}

function loadImages(category) {
  requestImages().then((imagesCategories) => {
    imagesCategories[category].forEach((imageCategory) => {
      const imageContainer = document.createElement('div');
      const image = document.createElement('img');

      imageContainer.className = 'image-container';
      image.setAttribute('src', imageCategory.src);
      image.addEventListener('click', () => openModal(imageCategory.src));

      imageContainer.appendChild(image);
      allImagesContainer.appendChild(imageContainer);
    });
  });
}

function openModal(imageSrc) {
  modalImage.src = imageSrc;
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.style.opacity = '1';
  }, 10);
}

function closeModal(event) {
  if (event.target === modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
}

//function
function activeState(clickedElementTextContent) {
  navListContent.forEach((listContent) => {
    if (listContent.textContent === clickedElementTextContent) {
      listContent.classList.add('active');
    } else {
      listContent.classList.remove('active');
    }
  });
}

