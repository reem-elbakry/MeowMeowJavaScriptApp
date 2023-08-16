//Get Elements
const catsContainer = document.getElementById('cats-container');

const API_KEY = "YOUR_API_KEY";

//Make Request
async function fetchWithTimeout(resource, options = {}) {
    try {
        const {timeout = 8000} = options;
        const controller = new AbortController();
        const timeoutId = setTimeout(()=> controller.abort , timeout);
        const response = await fetch(resource, { ...options, signal: controller.signal });
        clearTimeout(timeoutId);
        return response.json();
    } catch (error) {
        console.error('Error fetching cats:', error);
        //TODO:request recovery
    }
}

//Get Cats Data
async function fetchCatsData() {
    try {
        const response = await fetchWithTimeout(`https://api.thecatapi.com/v1/images/search?limit=8&breed_ids=beng&api_key=${API_KEY}`, 'get', {timeout: 6000});
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error fetching cats:', error);
    }
}

//Load cats images
function loadCatImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error(`Failed to load image from ${url}`));
    });
}

async function loadCatsImages() {
    try {
        const cats = await fetchCatsData(); //(3) [{…}, {…}, {…}]{breads: [{weight, id, name}], url}
        const imagesPromises = cats?.map((cat) => loadCatImage(cat.url));
        const images = await Promise.all(imagesPromises);
        images.forEach(image => createCatCardElement(image));
    } catch (error) {
        console.error(error);
    } 
}


//Create HTML Elements
function createCatCard() {
    let catCardContainer = document.createElement('div');
    catCardContainer.classList.add('col-lg-3', 'col-md-6', 'mb-4', 'mb-lg-0', 'mt-4');

    let catCard = document.createElement('div');
    catCard.classList.add('card', 'shadow-sm', 'border-0', 'rounded', 'h-100', 'mh-100');

    let catCardBody = document.createElement('div');
    catCardBody.classList.add('card-body', 'p-0');

    return [catCardContainer, catCard, catCardBody]; 
}

function createCatCardImage(catCardImage) {
    catCardImage.classList.add('img-fluid', 'd-inline-block', 'w-100', 'h-100', 'mw-100', 'mh-100','card-img-top');
    catCardImage.alt = 'meow';

    return catCardImage;
}

function createcatCardActionIcon() {
    let catCardActionContainer = document.createElement('div');
    catCardActionContainer.classList.add('p-4');

    let catCardActionIcon = new Image(20, 20);
    catCardActionIcon.classList.add('img-fluid', 'd-block', 'mx-auto', 'm-3');
    catCardActionIcon.src = 'img/meow.png';
    catCardActionIcon.alt = 'meow';
    catCardActionIcon.id = 'voteIcon';

    catCardActionContainer.appendChild(catCardActionIcon);

    return catCardActionIcon;
}

//Append all elements to HTML
function createCatCardElement(url) {
    let [catCardContainer, catCard, catCardBody] = createCatCard();
    // let catCardActionIcon = createcatCardActionIcon();

    catCardBody.appendChild(createCatCardImage(url));
    // catCardBody.appendChild(catCardActionIcon);

    catCard.appendChild(catCardBody);

    catCardContainer.appendChild(catCard);

    catsContainer.appendChild(catCardContainer);
}


loadCatsImages();


