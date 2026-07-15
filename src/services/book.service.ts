import Book from "@/models/Book";

export async function getAllBooks() {
    const books = await Book.find();
    return books; 
}

export async function getBookById(id: string) {
    const book = await Book.findById(id);
    return book
}

export async function createBook(bookData: {
    title: string;
    author: string;
    isbn: string;
    category: string;
    publicationYear: number;
    description: string;
}) {
    const book = await Book.create(bookData)
    return book
}

export async function updateBook(
    id : string,
    bookData: {
        title: string;
        author: string;
        isbn: string;
        category: string;
        publicationYear: number;
        description: string;
    }
) {
    const book = await Book.findByIdAndUpdate(id , bookData, {new: true});
    return book;
}

export async function deleteBook(id: string) {
    const book = await Book.findByIdAndDelete(id);
    return book;
}