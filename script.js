
const body = document.querySelector('body');
const container = document.getElementById('container');
const search_btn = document.getElementById('search-btn');
const themeToggler = document.getElementById('themeToggler');
let darkModeEnabled = false;

document.getElementById('themeToggler').addEventListener('change', changeTheme);
function changeTheme(e) {
    body.style.filter = 'blur(2px)';
    const navbar = document.querySelector('.navbar');
    const cards = document.querySelectorAll('.card');

    switch(e.target.value) {
        case 'dark': 
            body.classList.add('toggle-theme');
            navbar.style.backgroundColor = 'rgb(40, 34, 34)';
            search_btn.style.color = 'white';
            themeToggler.style.borderColor = 'white';
            themeToggler.style.color = 'white';
            if(cards) {
                cards.forEach((div) => {
                    div.style.backgroundColor = 'rgb(40, 34, 34)';
                })
            }
            darkModeEnabled = true;
            break;

        case 'light': 
            body.classList.remove('toggle-theme');
            navbar.style.backgroundColor = 'white';
            search_btn.style.color = 'black';
            themeToggler.style.borderColor = 'cadetblue';
            themeToggler.style.color = 'cadetblue';
            if(cards) {
                cards.forEach((div) => {
                    div.style.backgroundColor = 'white';
                })
            }
            darkModeEnabled = false;
            break;
    }

    setTimeout(() => {
        body.style.filter = 'blur(0)';
    }, 500);
}

async function getData() {
    console.log('get data called');
    container.innerHTML = null;
    search_btn.innerHTML = null;
    const loader = document.createElement('div');
    loader.className = 'loader';
    search_btn.append(loader);
    search_btn.setAttribute('disabled', true);
    search_btn.classList.add('btn-searching');

    const containerLoading = document.createElement('p');
    containerLoading.className = 'container-loading'
    containerLoading.innerText = 'Loading....';
    container.appendChild(containerLoading);

    try {
        const res = await fetch(`https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=50`);
        const data = await res.json();
        if(data) {
            setTimeout(() => {
                search_btn.innerHTML = null;
                search_btn.innerText = 'Get Data';
                appendData(data.photos);
            }, 3000);
        }
    } catch (error) {
        console.log(error);
    }
}

function appendData(data) {
    container.innerHTML = null;

    data.forEach(({description, title, url}, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        if(darkModeEnabled) {
            card.style.backgroundColor = 'rgb(40, 34, 34)';
        }

        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        const image = document.createElement('img');
        image.src = url;
        image.alt = title;
        image.style.width = '100%';
        imageContainer.append(image);

        const infoContainer = document.createElement('div');
        infoContainer.className = 'info-container';

        const itemTitle = document.createElement('p');
        itemTitle.innerText = `Title: ${title}`;
        
        const des = document.createElement('p');
        des.innerText = `Description: ${description}`;

        infoContainer.append(itemTitle, des);

        card.append(imageContainer, infoContainer);
        container.append(card);
    });

    search_btn.removeAttribute('disabled');
    search_btn.classList.remove('btn-searching');
}