const modal = document.querySelector('#modal');
const modalShow = document.querySelector('#show-modal');
const modalClose = document.querySelector('#close-modal');
const bookmarkForm = document.querySelector('#bookmark-form');
const websiteNameEl = document.querySelector('#website-name');
const websiteUrlEl = document.querySelector('#website-url');
const bookmarksContainer = document.querySelector('#bookmarks-container');
const deleteBookmarkEl = document.getElementById('delete-bookmark');

let bookmarks = [];

// show modal
function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

// Build Bookmarks
function buildBookmarks() {
  // Remove all bookmark elements
  bookmarksContainer.textContent = '';
  // Build items
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    const template = `<div class="item"><i
      class="fas fa-times"
       id="delete-bookmark"
      title="delete-bookmark"></i>
      <div class="name">
      <img
      src="https://s2.googleusercontent.com/s2/favicons?domain=${url}"
      alt="favicon"/>
      <a href="${url}" target="_blank">${name}</a>
      </div>
      </div>`;

    bookmarksContainer.insertAdjacentHTML('beforeend', template);
  });
}

// fetch bookmark from local storage
function fetchBookmark() {
  // if avail get bookmark from ls
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    // create bookmarks array in ls
    bookmarks = [
      {
        name: 'github',
        url: 'https://github.com',
      },
    ];

    localStorage.setItem(bookmarks, JSON.stringify(bookmarks));
  }
  console.log(bookmarks);
  buildBookmarks();
}

// Delete bookmarks
function deleteBookmark() {}

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

// Modal Event listner
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

// Event Listner
bookmarkForm.addEventListener('submit', storeBookmark);

// On load fetch from bookmarks
fetchBookmark();
