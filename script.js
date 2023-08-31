const modal = document.querySelector('#modal');
const modalShow = document.querySelector('#show-modal');
const modalClose = document.querySelector('#close-modal');
const bookmarkForm = document.querySelector('#bookmark-form');
const websiteNameEl = document.querySelector('#website-name');
const websiteUrlEl = document.querySelector('#website-url');
const bookmarksContainer = document.querySelector('#booksmarks-container');

// show modal
function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

function storeBookmark(e) {
  e.preventDefault();

  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;

  if (!urlValue.includes('https://', 'https://')) {
    urlValue = `https://${urlValue}`;
  }
  if (!validate(nameValue, urlValue)) {
    return false;
  }
}

// Validate form
function validate(nameValue, urlValue) {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

  // gaurd clause
  if (!nameValue || !urlValue)
    alert(`Please submit both valued in input fields`);

  const regex = new RegExp(expression);
  if (urlValue.match(regex)) {
    console.log('mat');
  }
  if (!urlValue.match(regex)) {
    console.log('didnt');
  }

  return true;
}

// Event listner
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => {
  modal.classList.remove('show-modal');
});
window.addEventListener('click', (e) => {
  //   e.target.classList[0] === 'modal-container'
  e.target === modal ? modal.classList.remove('show-modal') : false;
  //   console.log(e.target.classList[0]);
  e.p;
});

bookmarkForm.addEventListener('submit', storeBookmark);
