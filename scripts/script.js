let apiUrl = 'https://randomfox.ca/floof/';

let response;
let pagination = document.getElementById('pagination');
let content = document.getElementById('content');
let loading = document.getElementById('loader')

async function requestAPIData() {
  let req = await fetch(apiUrl);
  return await req.json();
}

async function getData() {
  loader();
  response = await requestAPIData();
  console.log(response);
  buildUI(response);
  loading.innerHTML = '';
}

function loader() {
  loading.innerHTML = `<div class="d-flex justify-content-center">
  <div class="spinner-border text-light" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  </div>`;
}

getData();
async function refresh() {
  loader();
  response = await requestAPIData();
  let card = document.querySelector('.jumbotron');
  appendCard(card, response);
  loading.innerHTML = '';
}

function buildUI(data) {
  content.innerHTML = '';
  // create card
  let card = createElement('div');
  setAttribute(card, 'class', 'jumbotron');
  appendCard(card, data);
  appendChild(content, card);
}

function appendCard(card, data) {
  card.innerHTML = '';

  // append reload button to card
  let reload = createElement('i');
  setAttribute(reload, 'class', 'fas fa-sync-alt refresh');
  setAttribute(reload, 'onclick', 'refresh()');
  appendChild(card, reload);

  // append image to card
  let img = createElement('img');
  img.src = data.image;
  setAttribute(img, 'class', 'card-img-top img-fluid');
  appendChild(card, img);

  let cardBody = createElement('div');
  setAttribute(cardBody, 'class', 'card-body text-center');
  appendChild(card, cardBody);

  let title = createElement('a');
  title.innerText = data.link;
  setAttribute(title, 'class', 'cat-btn');
  setAttribute(title, 'href', data.link);
  setAttribute(title, 'target', '_blank');
  appendChild(cardBody, title);
}
