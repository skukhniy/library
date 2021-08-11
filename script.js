if (localStorage.hasOwnProperty("Library") === false){
    console.log("hi")
    localStorage.setItem('Library',JSON.stringify([]))
    console.log(localStorage.Library)
}
var myLibrary = JSON.parse(localStorage.getItem('Library'))

// set up a book obj
function Book(title,author,numPages) {
    this.title = title
    this.author = author
    this.numPages = numPages
    this.readStatus = false
}

Object.prototype.changeStatus = function(){
    if (this.readStatus === false){
        this.readStatus = true
    }else{
        this.readStatus = false
    }
}
// add new book object to the Lib
function addBookToLibrary(bookObj) {
    myLibrary.push(bookObj)
    localStorage.setItem('Library',JSON.stringify(myLibrary))
    console.log(myLibrary)
}

// test variable so I dont have to do this 1000 times
// var testobj = new Book('GOT','GRRM','1000')
// addBookToLibrary(testobj)



// query Selectors that select elements related to the modal popup form
const openModalButton = document.querySelector('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-modal-close]')
const overlay = document.getElementById('overlay')
const btnSubmit = document.getElementById('btnSubmit')

//will add an active class so the form pops up
openModalButton.addEventListener('click',() =>{
    const modal = document.querySelector(openModalButton.dataset.modalTarget)
    openModal(modal)
})
// removes the active class so the form goes down
closeModalButtons.forEach(button => {
    button.addEventListener('click',() =>{
    const modal = button.closest('.modal')
    closeModal(modal)
    })
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



// on clicking submit the inputs will be gathered to create a new card.
btnSubmit.addEventListener('click',()=>{
    console.log('title =')
    var title = document.getElementById('title').value
    console.log(title)
    var author = document.getElementById('author').value
    console.log(author)
    var numPage = document.getElementById('numPage').value
    console.log(author)
    var book = new Book(title,author,numPage) //create new book obj
    addBookToLibrary(book) // push book to lib array
    document.getElementById("bookForm").reset() //reset the form
    displayArray(myLibrary)
})

//creates the display for each book object in the library array
const container = document.getElementById("bookCards")
function displayArray(array){
    if (array.length === 0){ //returns an empty display if the array is empty
        return
    }else if (array.every(element => element === null)){ //if the entire array is full of nulls reset the local storage
        localStorage.clear()
        localStorage.setItem('Library',JSON.stringify([]))
        return
    }else{
        document.querySelectorAll('.bookCard').forEach(e => e.remove())
        array.forEach((book,index) => {
            if (book === null){ //checks if the array has null values
                return
            }else{
                const newCard = document.createElement('div')
                newCard.classList.add('bookCard')

                htitle = document.createElement('h2')
                htitle.innerHTML = book.title
                p1 = document.createElement('p')
                p1.innerHTML = 'by<br>' + book.author +'<br><br># of pages: ' + book.numPages
                readButton = document.createElement('button')
                readButton.classList.add("readButton")
                if (book.readStatus === false){
                    readButton.innerHTML= 'Reading'
                    readButton.style.color = 'darkmagenta'
                }else{
                    readButton.innerHTML = 'Finished'
                    readButton.style.color='green'
                }
                readButton.setAttribute('data-read-index',index)
                deleteButton = document.createElement('button')
                deleteButton.classList.add('deleteButton')
                deleteButton.setAttribute('data-delete-index',index)
                deleteButton.innerHTML = 'Remove Book'

                newCard.appendChild(htitle)
                newCard.appendChild(p1)
                newCard.appendChild(readButton)
                newCard.appendChild(deleteButton)

                container.appendChild(newCard)

                const deleteButtonID = document.querySelector("[data-delete-index=\'" + index + "\']")
                deleteButtonID.addEventListener('click',() => {
                    index = deleteButtonID.getAttribute('data-delete-index')
                    console.log(index)
                    deleteButtonID.closest('.bookCard').remove()
                    // myLibrary.splice(parseInt(index),1)
                    delete myLibrary[parseInt(index)]
                    localStorage.setItem('Library',JSON.stringify(myLibrary))
                    console.log(localStorage.Library)

                    
                })
                // const readButtonID = document.querySelector("[data-read-index =\'" + index + "\']")
                // readButtonID.addEventListener('click',() => {
                //     changeButtonStatus(readButtonID)
                //     console.log(myLibrary)
                //     })
            }
            })
        }
    const readButtonID = document.querySelectorAll("[data-read-index]")
    readButtonID.forEach(button => {
            button.addEventListener('click',() => {
            changeButtonStatus(button)
            console.log(myLibrary)
            })
    })
    }
displayArray(myLibrary) //displays the current array on page startup


// function to change a book objs read status on button click
function changeButtonStatus (button) {
    index = button.getAttribute('data-read-index')
    console.log(index)
    myLibrary[index].changeStatus()
    console.log(myLibrary[index].title)
    var status = myLibrary[index].readStatus
    console.log(status)
    console.log('button press')
    if (status === false){
        button.innerHTML= 'Reading'
        button.style.color = 'darkmagenta'
        button.readStatus = true
        localStorage.setItem('Library',JSON.stringify(myLibrary))
    }else{
        button.innerHTML = 'Finished'
        button.style.color='green'
        button.readStatus = false
        localStorage.setItem('Library',JSON.stringify(myLibrary))
    }
}

// TODO:
// Add a button to each books card to remove it from the lib
// Add a button to change a book cards read status
// ?? maybe add localstorage options (or cloud storage if we wanna get crzy)

// const readingButtons = document.querySelectorAll('.readButton')
// readingButtons.forEach(button =>{
//     button.addEventListener('click',() => {
//     changeButtonStatus(button)
//     console.log(myLibrary)
//     })
// })
// const deleteButtons = document.querySelectorAll('.deleteButton')
//     deleteButtons.forEach(button => {
//         button.addEventListener('click',() => {
//             index = button.getAttribute('data-index')
//             console.log(index)
//             button.closest('.bookCard').remove()
//             myLibrary.splice(parseInt(index))
//             console.log(myLibrary)
