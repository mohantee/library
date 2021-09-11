//DOM bindings go here
const btnAddBook = Array.from(document.querySelectorAll('.btn-add-book'));
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

//Add a function to the script that can take user's inmput and store the new book
//objcts into an array.

let myLibrary = [];

function Book(name, author, read, pages, imageURL) {
	this.name = name;
	this.author = author;
	this.read = read;
	this.pages = pages;
	this.imageURL = imageURL;
}

const addBookToLibrary = book => {
	myLibrary.push(book);
};

const renderBook = book => {
	const newBookElement = document.createElement('div');
	newBookElement.className = 'card';
	newBookElement.innerHTML = `
		<img
			src="${book.imageURL}"
			alt="${book.name}"
			class="card__img"
		/>
		<p class="card__title">${book.name}</p>
		<p class="card__author">by ${book.author}</p>
		<div class="card__chip">
			<p class="card__status chip">${
				book.bookReadStatus ? 'Finished' : 'Yet to read'
			}</p>
			<p class="card__pages chip">${book.pages} pages</p>
			<a href="#" class="card--remove chip">Remove</a>
		</div>
	`;
	const container = document.querySelector('.container');
	const placeholder = document.querySelector('.placeholder');
	container.insertBefore(newBookElement, placeholder);
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
		inputPages.value === '' ||
		inputURL.value === ''
	) {
		alert('Input fields cannot be left empty');
		return;
	}

	const name = inputTitle.value;
	const author = inputAuthor.value;
	const pages = inputPages.value;
	const imageURL = inputURL.value;
	let bookReadStatus;

	if (document.getElementById('yes').checked) {
		bookReadStatus = true;
	} else {
		bookReadStatus = false;
	}

	const book = new Book(name, author, bookReadStatus, pages, imageURL);
	addBookToLibrary(book);
	renderBook(book);
	clearFormInput();
	toggleModalBackdrop();
	console.log(myLibrary);
};

for (btn of btnAddBook) {
	btn.addEventListener('click', toggleModalBackdrop);
}

formCancel.addEventListener('click', toggleModalBackdrop);

formSubmit.addEventListener('click', getUserInput);

displayBookList();
