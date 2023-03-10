// unSplash API 
const apiKey = 'QAq6wdLygiMqGawRh-zhhWj6S06NtpVu2x1IJnuWQUQ';
let initialCount = 5;
let isInitialLoad = true;

let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateAPIURLWithNewCount(picCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`
}

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}


const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

//funcion auxiliar para establecer atributos a elementos de DOM
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//crea elementos paera los enlaces y fotos, agregarlos al DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each objets in photosArray
    photosArray.forEach((photo) => {
        //create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '.blank',
        });
        //create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded); 
        //put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

//obtener las imagenes desde UnsSplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad) {
            updateAPIURLWithNewCount(30);
            isInitialLoad = false
        }
    } catch (error) {
        //Manejar el error aqui
        console.log(error);
    }
}

getPhotos();

