// book class

class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}



//ui class
class UI {
    static displayBooks() {
       
        const books = Store.getBooks()
       books.forEach((book)=>{
        UI.addBookToList(book)
       })
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list')
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete" >X</a></td>
        `

        list.appendChild(row)


    }


    static clearFields() {
        document.querySelector("#title").value = ''
        document.querySelector("#Autor").value = ''
        document.querySelector("#Isbn").value = ''
    }

    static deleteBook(Ele) {
        if (Ele.classList.contains('delete')) {
            Ele.parentElement.parentElement.remove()
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div')
        div.className = `font-weight-bold text-center alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')
        container.insertBefore(div, form)

        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 3000)
    }
}

// store class
class Store {
   static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = []

        }
        else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }

    static addBook(book){
        const books = Store.getBooks()
        books.push(book)

        localStorage.setItem('books' , JSON.stringify(books))
    }

    static removeBook(isbn){
        const books = Store.getBooks()

        books.forEach((book , index)=>{
            if(book.isbn === isbn){
                books.splice(index , 1)
            }
        })

        localStorage.setItem('books' , JSON.stringify(books))
    }
} 


// event display books
document.addEventListener('DOMContentLoaded', UI.displayBooks)



// event add book

document.querySelector('#book-form').addEventListener('submit', (e) => {

    e.preventDefault()

    const title = document.querySelector('#title').value
    const author = document.querySelector('#Autor').value
    const Isbn = document.querySelector('#Isbn').value

    // Validate
    if (title === '' || author === '' || Isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger')
       


    } else {
        // add book To list 
        const book = new Book(title, author, Isbn)
        UI.addBookToList(book)

        // add book to store 
        Store.addBook(book)


        // show Success message
        UI.showAlert('book Added ', 'success')

        // clear fields
        UI.clearFields()
    }



})
// del book

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target)

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    // show succcess message to remove
    UI.showAlert('Book Removed ' , 'success')

})