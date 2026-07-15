# Service vs Route Handler — What is the Difference?

## The Short Answer

- **Service** — talks to the database, gives you data
- **Route Handler** — handles the request from the browser, calls the service, sends back a response

---

## The Librarian Analogy

Think of it like a library:

- **Service** = the librarian who goes and finds the book
- **Route Handler** = the front desk where you make your request

You do not go to the shelves yourself. You ask the front desk, the front desk asks the librarian, the librarian brings the book back.

---

## Side by Side

|                          | Service (`getAllBooks`)    | Route (`GET`)            |
| ------------------------ | -------------------------- | ------------------------ |
| File                     | `services/book.service.ts` | `app/api/books/route.ts` |
| Talks to database        | Yes                        | No                       |
| Handles HTTP requests    | No                         | Yes                      |
| Returns JSON response    | No                         | Yes                      |
| Knows about status codes | No                         | Yes                      |
| Knows about errors       | No                         | Yes                      |

---

## Example

### Service — just gets the data

```ts
export async function getAllBooks() {
  const books = await Book.find();
  return books;
}
```

### Route — handles the full request

```ts
export async function GET() {
  try {
    await connectToDatabase();
    const books = await Book.find();
    return NextResponse.json(books); // send JSON to browser
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 } 
    );
  }
}
```

---

## Why do we need both?

- If the service also handled requests, it would do too many things
- If the route handler also talked to the database, every route would repeat the same code
- Keeping them separate makes the code clean and easy to change
