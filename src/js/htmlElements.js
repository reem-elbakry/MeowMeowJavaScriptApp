//Get Elements
const catsContainerElement = document.getElementById('cats-container');


//Create HTML Elements
function createCardElements() {
    let catCardContainer = document.createElement('div');
    catCardContainer.classList.add('col-lg-3', 'col-md-6', 'mb-4', 'mb-lg-0', 'mt-4');

    let catCard = document.createElement('div');
    catCard.classList.add('card', 'shadow-sm', 'border-0', 'rounded', 'h-100', 'mh-100');

    let catCardBody = document.createElement('div');
    catCardBody.classList.add('card-body', 'p-0');

    return [catCardContainer, catCard, catCardBody]; 
}

function createCardImageElement(catCardImage) {
    catCardImage.classList.add('img-fluid', 'd-inline-block', 'w-100', 'h-100', 'mw-100', 'mh-100','card-img-top');
    catCardImage.alt = 'meow';

    return catCardImage;
}

//Append all elements to HTML
export async function createCardElement(url) {
    let [catCardContainer, catCard, catCardBody] = createCardElements();

    catCardBody.appendChild(createCardImageElement(url));

    catCard.appendChild(catCardBody);

    catCardContainer.appendChild(catCard);

    catsContainerElement.appendChild(catCardContainer);
}
