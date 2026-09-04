
const Library = []

function Book(author, title, pages, status){
    this.author = author
    this.title = title
    this.pages = pages
    this.status = status
    this.id = crypto.randomUUID()
}

let displayCard  = document.querySelector(".display")
Book.prototype.toString = function(){
    return `${this.author}, {this.title}, ${this.pages}, ${this.status}, ${this.id}`
}

let listening = document.querySelector("#bookform")
let authorname = ""
let titlename = ""
let numberofpages = ""
let readstatus = ""
listening.addEventListener("submit", (event)=> {
    event.preventDefault()
    let elements = event.target.elements

    for (let target of elements){
        switch(target.id){
            case "author":
                authorname = target.value
                break
            case "title":
                titlename = target.value
                break
            case "number-of-pages":
                numberofpages = target.value
                break
            case "not-read":
            case "ongoing":
            case "read":
            if (target.checked){
                readstatus = target.value
            }
            break
        }
    
    }
    let dialog = document.querySelector("dialog")
    let newBook = new Book(authorname, titlename,numberofpages,readstatus)
    console.log(newBook)
    Library.push(newBook)
    let child = createCards(newBook)
    displayCard.appendChild(child)
    dialog.hidePopover()
})


function createCards(book){
    
    parentCard = document.createElement("div")
    titleText = document.createElement("p")
    titleText.textContent = `Title: ${book.title}`
    authorText = document.createElement("p")
    authorText.textContent = `Author: ${book.author}`
    pageText = document.createElement("p")
    pageText.textContent = `Number of Pages: ${book.pages}`
    statusText = document.createElement("p")
    statusText.textContent = `Reading Status: ${book.status}`
    idText = document.createElement("p")
    idText.textContent = `ID: ${book.id}`
    removeButton = document.createElement("button")
    removeButton.textContent = "Remove Book"
    removeButton.addEventListener("click", (event)=>{
        parentCard.remove()
        const index = Library.findIndex(b => b.id === book.id);
        if (index !== -1) {
            Library.splice(index, 1);
            console.log(`✅ Removed: ${book.title}`);
            console.log(`📚 Library now has ${Library.length} books`);
        } else {
            console.log(`❌ Book not found: ${book.title}`);
        }
    }
    )
    parentCard.appendChild(titleText)
    parentCard.appendChild(authorText)
    parentCard.appendChild(pageText)
    parentCard.appendChild(idText)
    parentCard.appendChild(removeButton)

    parentCard.classList.add("cardDiv")
    titleText.classList.add("cardText")
    authorText.classList.add("cardText")
    pageText.classList.add("cardText")
    idText.classList.add("cardText")

    return parentCard
}
