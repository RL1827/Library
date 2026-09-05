
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

Book.setStatus = function(status){
    this.status = status
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
        let parent= event.target.parentElement
        let parentID = parent.getAttribute("id")
        for (let i = Library.length - 1; i >= 0; i--) {
            if (Library[i].id === parentID) {
                Library.splice(i, 1); // Removes 1 element at index i
            }
        }
        parent.remove()
        }
    )
    toggleRead = document.createElement("button")
    toggleRead.textContent = "Toggle Read"
    toggleRead.addEventListener("click", ()=>{
        if (book.status === "not-read"){
            book.status = "ongoing"
        }else if (book.status === "ongoing"){
            book.status = "read"
        } else{
            book.status = "not-read"
        }
        statusText.textContent = `Reading Status: ${book.status}`
        console.log(book)
    })
    parentCard.appendChild(titleText)
    parentCard.appendChild(authorText)
    parentCard.appendChild(pageText)
    parentCard.appendChild(statusText)
    parentCard.appendChild(idText)
    parentCard.appendChild(removeButton)
    parentCard.appendChild(toggleRead)
    

    parentCard.classList.add("cardDiv")
    parentCard.setAttribute('id', `${book.id}`)
    titleText.classList.add("cardText")
    authorText.classList.add("cardText")
    pageText.classList.add("cardText")
    statusText.classList.add("cardText")
    idText.classList.add("cardText")

    return parentCard
}
