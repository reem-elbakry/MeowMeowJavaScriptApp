//Get Elements
const catsContainerElement = document.getElementById('images-container');


//Append images to HTML
export async function appendElements(url) {

    catsContainerElement.appendChild(url);

}
