const myLibrary = [];

function Book(title, author, year, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = read;
}

Book.prototype.toggleReadStatus = function () {
    this.read = !this.read;
};

function addBookToLibrary(title, author, year, read) {
    const newBook = new Book(title, author, year, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const bookCard = document.querySelector(".book-card");
    bookCard.innerHTML = ""; 

    myLibrary.forEach((book, index) => {
        const bookRecord = document.createElement("div");
        bookRecord.classList.add("book");
        bookRecord.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Published: ${book.year}</p>
            <p>Read: ${book.read ? "Yes" : "No"}</p>
            <div class="book-buttons">
                <button class="toggle-read" data-index="${index}">
                    ${book.read ? "Mark as Unread" : "Mark as Read"}
                </button>
                <button class="remove-btn" data-index="${index}">Delete</button>
            </div>
        `;
        bookCard.appendChild(bookRecord);
    });

    addEventListeners();
}

function addEventListeners() {
    document.querySelectorAll(".toggle-read").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.dataset.index;
            myLibrary[index].toggleReadStatus();
            displayBooks();
        });
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.dataset.index;
            myLibrary.splice(index, 1);
            displayBooks();
        });
    });
}

const addBookForm = document.getElementById("add-book-form");
const bookOverlay = document.getElementById("bookOverlay");
const addBookButton = document.getElementById("add-book");

addBookButton.addEventListener("click", () => {
    bookOverlay.style.display = "flex";
});

bookOverlay.addEventListener("click", (event) => {
    if (event.target === bookOverlay) {
        bookOverlay.style.display = "none";
    }
});

addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("book-title").value.trim();
    const author = document.getElementById("book-author").value.trim();
    const year = document.getElementById("published-year").value.trim();
    const readStatus = document.querySelector("input[name='read-status']:checked");

    if (!title || !author || !year || !readStatus) {
        alert("Please fill out all fields.");
        return;
    }

    addBookToLibrary(title, author, year, readStatus.value === "yes");
    addBookForm.reset();
    bookOverlay.style.display = "none";
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 1937, true);
addBookToLibrary("1984", "George Orwell", 1949, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 1960, true);

displayBooks();