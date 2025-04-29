const addBtn = document.querySelector(".add");
const popUp = document.querySelector("dialog");
const closeBtn = document.querySelector("#close");
const form = document.querySelector("form");
const container = document.querySelector(".books");
const myLibrary = [];

addBtn.addEventListener("click", () => {
  popUp.showModal();
});

closeBtn.addEventListener("click", () => {
  popUp.close();
})

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const Data = new FormData(form);
  const book = Data.get("book");
  const author = Data.get("author");
  const read = Data.get("read") === "on";

  addBookToLibrary(book, author, read);
  popUp.close();
})

function Book(name, author, hasRead){
  this.name = name;
  this.author = author;
  this.hasRead = hasRead;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(name, author, hasRead){
  const newBook = new Book(name, author, hasRead);
  myLibrary.push(newBook);
  displayBooks(myLibrary);
}

function displayBooks(array){
  container.innerHTML = ""
  array.forEach(book => {
    const myBook = document.createElement("div");
    myBook.classList.add("book");

    myBook.innerHTML = `
      <h2>Book: ${book.name}</h2>
      <h3>Author: ${book.author}</h3>
      <h3>Read: ${book.hasRead ? "Yes" : "No"}</h3>
      <p>ID: ${book.id}</p>
      <div class="disp">
        <button class="mark">${book.hasRead ? "Unread" : "Read"}</button>
        <button class="bookDel" data-id="${book.id}">Delete</button>
      </div>
    `;
    container.appendChild(myBook);

    const markBtn = myBook.querySelector(".mark");
    const delBtn = myBook.querySelector(".bookDel");

    markBtn.addEventListener("click", () => {
      const index = myLibrary.findIndex(bk => bk.id === book.id);
      if (index !== -1){
        myLibrary[index].hasRead = !myLibrary[index].hasRead;
        displayBooks(myLibrary);
      }
    });

    delBtn.addEventListener("click", () => {
      const index = myLibrary.findIndex(bk => bk.id === book.id);
      if (index !== -1){
        myLibrary.splice(index, 1);
        displayBooks(myLibrary);
      }
    })
  });
}