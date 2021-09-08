//DOM bindings go here

//Add a function to the script that can take user's inmput and store the new book 
//objcts into an array. 

let myLibrary = [];

function Book (name, author, read, pages) {
  this.name = name;
  this.author = author;
  this.read = read;
  this.pages = pages;
}

const addBookToLibrary = (book) => {
  myLibrary.push(book);
};

const harryPotter = new Book("Harry Potter & The Philosopher's stone", "J.K. Rowling", true, 389);
const siddhartha = new Book("Siddhartha", "Hermann Hesse", false, 402);
addBookToLibrary(harryPotter);
addBookToLibrary(siddhartha);

const displayBookList = () => {
  for (book of myLibrary) {
    console.log(book.name);
  }
};

displayBookList();