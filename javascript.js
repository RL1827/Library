const Book={
    author: "",
    title: "",
    pages: 0,
    status: "",
    id: 0
}

const Library = []

function Book(author, title, pages, status){
    this.author = author
    this.title = title
    this.pages = pages
    this.status = status
    this.id = crypto.randomUUID()
}

