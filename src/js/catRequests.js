//imports
import { fetchDataWithTimeout } from "./httpRequests.js";
import { createCardElement } from "./htmlElements.js";


const catAPIKey = process.env.catAPIKey;

console.log(catAPIKey);

//Get Cats Data
async function fetchCatImagesData() {
    try {
        const response = await fetchDataWithTimeout(`https://api.thecatapi.com/v1/images/search?limit=8&breed_ids=beng&api_key=${catAPIKey}`, {timeout: 6000});
        return response;
    } catch (error) {
        console.error('Error fetching cats:', error);
    }
}

//Load cat image
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error(`Failed to load image from ${url}`));
    });
}

//Load cat images in parallel
export async function loadCatImages() {
    try {
        const cats = await fetchCatImagesData(); //(3) [{…}, {…}, {…}]{breads: [{weight, id, name}], url}
        const imagesPromises = cats?.map((cat) => loadImage(cat.url));
        const images = await Promise.allSettled(imagesPromises);
        images.forEach(image => createCardElement(image.value));
    } catch (error) {
        console.error(error);
    } 
}
