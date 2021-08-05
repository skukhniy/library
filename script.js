let myLibrary = [];

// set up a book obj
function Book(author,title,numPages,readStatus) {
    this.author = author
    this.title = title
    this.numPages = numPages
    this.readStatus = readStatus
}

// add new book object to the Lib
function addBookToLibrary(bookObj) {
    myLibrary.push(bookObj)
}

// TODO:
// Add a function that loops thru the Lib array and displays each book on a card
// Add a NEW BOOK button that brings up a form to create a new book obj
// Add a button to each books card to remove it from the lib
// Add a button to change a book cards read status
// ?? maybe add localstorage options (or cloud storage if we wanna get crzy)