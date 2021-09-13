//DOM bindings go here
const btnAddBook = document.querySelector('.btn-add-book');
const btnRemoveBook = document.querySelector('.card--remove');
const btnStatusBook = document.querySelector('.card__status');
const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');
const formSubmit = document.querySelector('.btn--active');
const formCancel = document.querySelector('.btn--passive');
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const inputPages = document.getElementById('pages');
const inputURL = document.getElementById('image-url');
const container = document.querySelector('.container');

let myLibrary = [];

function Book(
	name,
	author,
	read,
	pages,
	imageURL = 'https://gender.indiana.edu/images/publications/book-cover-placeholder.jpg'
) {
	this.name = name;
	this.author = author;
	this.read = read;
	this.pages = pages;
	this.imageURL = imageURL;
	this.id = Math.floor(Math.random() * 100000 + 1).toString();
}

const addBookToLibrary = book => {
	myLibrary.push(book);
};

const btnRemoveBookHandler = element => {
	for (book of myLibrary) {
		if (element.className.includes(book.id)) {
			element.parentElement.removeChild(element);
			const index = myLibrary.indexOf(book);
			if (index !== -1) {
				myLibrary.splice(index, 1);
			}
		}
	}
};

const createNewBookCard = book => {
	const newBookElement = document.createElement('div');
	newBookElement.className = `card data-id="${book.id}"`;
	newBookElement.innerHTML = `
			<img
				src="${book.imageURL}"
				alt="${book.name}"
				class="card__img"
			/>
			<p class="card__title">${book.name}</p>
			<p class="card__author">by ${book.author}</p>
			<div class="card__chip">
				<p class="card__status chip">${book.read ? 'Finished' : 'Yet to read'}</p>
				<p class="card__pages chip">${book.pages} pages</p>
				<a href="#" class="card--remove chip">Remove</a>
			</div>
		`;
	return newBookElement;
};

const renderLibrary = () => {
	container.innerHTML = `
		<div class="card placeholder">
			<a href="#" class="placeholder__symbol">+</a>
		</div>
	`;
	container.lastElementChild.addEventListener('click', toggleModalBackdrop);
	myLibrary.forEach(book => {
		const placeholder = container.lastElementChild;
		const newBookCard = createNewBookCard(book);
		container.insertBefore(newBookCard, placeholder);
		newBookCard.lastElementChild.lastElementChild.addEventListener(
			'click',
			btnRemoveBookHandler.bind(this, newBookCard)
		);
	});
	console.log(myLibrary);
};

const toggleModalBackdrop = () => {
	modal.classList.toggle('visible');
	backdrop.classList.toggle('visible');
};

const clearFormInput = () => {
	inputTitle.value = '';
	inputAuthor.value = '';
	inputPages.value = '';
	inputURL.value = '';
};

const getUserInput = () => {
	if (
		inputTitle.value === '' ||
		inputAuthor.value === '' ||
		inputPages.value === ''
	) {
		alert('Please fill the book details to add to library');
		return;
	}

	const name = inputTitle.value;
	const author = inputAuthor.value;
	const pages = inputPages.value;
	let imageURL;

	if (!inputURL.value) {
		imageURL =
			'http://give-me-something-to-read.herokuapp.com/static/img/default-book-cover.png';
	} else {
		imageURL = inputURL.value;
	}

	let bookReadStatus;

	if (document.getElementById('yes').checked) {
		bookReadStatus = true;
	} else {
		bookReadStatus = false;
	}

	const book = new Book(name, author, bookReadStatus, pages, imageURL);
	addBookToLibrary(book);
	renderLibrary();
	clearFormInput();
	toggleModalBackdrop();
};

btnAddBook.addEventListener('click', toggleModalBackdrop);

formCancel.addEventListener('click', toggleModalBackdrop);

formSubmit.addEventListener('click', getUserInput);

const siddhartha = new Book(
	'Siddhartha',
	'Hermann Hesse',
	false,
	478,
	'https://m.media-amazon.com/images/I/51b6GXNJTlL.jpg'
);

const harry = new Book(
	'Harry Potter',
	'J.K. Rowling',
	true,
	254,
	'https://www.boredpanda.com/blog/wp-content/uploads/2016/10/harry-potter-book-covers-illustration-olly-moss-3.jpg'
);
addBookToLibrary(siddhartha);
addBookToLibrary(harry);
renderLibrary();
