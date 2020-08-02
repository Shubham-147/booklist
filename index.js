//ES6 classes


class Book {

  constructor(title,author,ispn) {
    this.title= title
    this.author = author
    this.ispn = ispn
  }
}
class UI {

  addBookToList(book){
    console.log(book)
    const list =document.querySelector('#book-list')
    const row = document.createElement('tr')
    row.innerHTML =`
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.ispn}</td>
      <td><a href ="#" class='delete'> x </a></td>
    `
    list.appendChild(row)
  }

  showAlert(message,cls){
    const div = document.createElement('div')
    div.className =`alert ${cls}`
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector('.container')
    const form =document.querySelector('#book-form')
    container.insertBefore(div, form)
    setTimeout(function(){
      document.querySelector('.alert').remove()
    },3000)
  }

  deleteBook(target){
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove()
    }
  }

  clearFeilds(){
    document.querySelector('#title').value ='';
    document.querySelector('#author').value ='';
    document.querySelector('#isbn').value ='';
  }

}

class Store {
  static getBook(){
    let books ;
    if(localStorage.getItem('books') === null){
      books = [ ];
    }
    else{
      books = JSON.parse(localStorage.getItem('books'))
    }
    console.log(typeof(books))
    return books
  }

  static displayBook(){
    const books = Store.getBook()
    books.forEach(function(book){
      const ui = new UI()
      ui.addBookToList(book)
    });
  }

  static addBook(book) {
    const books = Store.getBook()
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books))
  }

  static removeBook(ispn) {
    const books = Store.getBook()
    console.log('remove', books)
    books.forEach(function(book,index){
      if(book.ispn === ispn){
        books.splice(index,1)
      }
    })
    console.log(ispn)
    localStorage.setItem('books',JSON.stringify(books))

  }
}

document.addEventListener('DOMContentLoaded',Store.displayBook)
document.querySelector('#book-form').addEventListener('submit',function(e){

  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const isbn = document.querySelector('#isbn').value
  
  const book =new Book(title, author, isbn)
  const ui = new UI();
  
  if( title === '' || author === '' || isbn === ''){
    ui.showAlert('Please Fill all Required Feilds','error')
  }
  else{
    ui.addBookToList(book)
    Store.addBook(book)
    ui.clearFeilds()
    ui.showAlert('Book Added Successfully','success')
  }
  e.preventDefault()
  })
  
  document.querySelector('#book-list').addEventListener('click',function(event){
  const ui = new UI();
  ui.deleteBook(event.target)
  Store.removeBook(event.target.parentElement.previousElementSibling.textContent)
  event.preventDefault()
  ui.showAlert("Successfully deleted",'success')
    
  })
