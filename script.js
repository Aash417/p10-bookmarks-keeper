const modal = document.querySelector('#modal');
const modalShow = document.querySelector('#show-modal');
const modalClose = document.querySelector('#close-modal');
const bookmarkForm = document.querySelector('#bookmark-form');
const websiteNameEl = document.querySelector('#website-name');
const websiteUrlEl = document.querySelector('#website-url');
const bookmarksContainer = document.querySelector('#booksmarks-container');

let bookmarks = [];

// show modal
function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}
// fetch bookmark from local storage
function fetchBookmark() {
  // if avail get bookmark from ls
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    // create bookmarks array in ls
    bookmarks = {
      name: 'github',
      url: 'githum.com',
    };

    localStorage.setItem(bookmarks, JSON.stringify(bookmarks));
  }
  console.log(bookmarks);
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
  // bookmark object
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  fetchBookmark();

  bookmarkForm.reset();
  websiteNameEl.focus();
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
    console.log('matched');
  }
  if (!urlValue.match(regex)) {
    console.log('enter correct url');
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
// On load fetch from bookmarks
fetchBookmark();
