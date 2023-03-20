const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

let isInitialLoad = true; // NEW LINE ****

// Unsplash API
let initialCount = 5;

// Unsplash API
const count = 5;
const apiKey = 'H5jWdrxOXEcudjTUH6ETu2pBiDuVQzFuuThXriNtDfc';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function updateAPIURLWithNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to set Attribute on DOM

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photoArray.length;

  // Run function for each object in photoArray
  photoArray.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement('a');

    setAttributes(item, { href: photo.links.html, target: '_blank' });

    // Create <img> for photo
    const img = document.createElement('img');

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    // Put  <img> inside <a> , then both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    if (isInitialLoad) {
      // NEW LINE ****
      updateAPIURLWithNewCount(30); // NEW LINE ****
      isInitialLoad = false; // NEW LINE ****
    }
    displayPhotos();
  } catch (error) {
    console.error(error);
  }
}

// check if the scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// on Load
getPhotos();
