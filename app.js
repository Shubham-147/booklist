//ES5 classes

function Book(title, author, ISBN){
  this.title =title;
  this.author = author;
  this.ISBN=ISBN;
}

function UI(){}

UI.prototype.deleteBook = function (target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove()
  }
}

UI.prototype.clearFeilds = function(){
  document.querySelector('#title').value ='';
  document.querySelector('#author').value ='';
  document.querySelector('#isbn').value ='';

}

UI.prototype.addBookToList = function(book) {
  const list =document.querySelector('#book-list')
  const row = document.createElement('tr')
  row.innerHTML =`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.ISBN}</td>
    <td><a href ="#" class='delete'> x </a></td>
  `
  list.appendChild(row)
  }

UI.prototype.showAlert = function (message , cls) {
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
  ui.clearFeilds()
  ui.showAlert('Book Added Successfully','success')
}
e.preventDefault()
})

document.querySelector('#book-list').addEventListener('click',function(event){
const ui = new UI();
ui.deleteBook(event.target)
event.preventDefault()
ui.showAlert("Successfully deleted",'success')
  
})