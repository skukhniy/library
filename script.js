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

const openModalButton = document.querySelector('[data-modal-target]')
const closeModalButton = document.querySelector('[data-modal-close]')
const overlay = document.getElementById('overlay')

openModalButton.addEventListener('click',() =>{
    const modal = document.querySelector(openModalButton.dataset.modalTarget)
    openModal(modal)
})
closeModalButton.addEventListener('click',() =>{
    const modal = closeModalButton.closest('.modal')
    closeModal(modal)
})
function openModal(modal){
    if(modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}
function closeModal(modal){
    if(modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

// TODO:
// Add a function that loops thru the Lib array and displays each book on a card
// Add a NEW BOOK button that brings up a form to create a new book obj
// Add a button to each books card to remove it from the lib
// Add a button to change a book cards read status
// ?? maybe add localstorage options (or cloud storage if we wanna get crzy)