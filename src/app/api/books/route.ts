import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Book from "@/models/Book"
import { bookShema } from "@/lib/validators";

export async function GET() {
    try {
        await connectToDatabase();
        const books = await Book.find();
        return NextResponse.json(books)
    } catch (error) {
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();

        const body = await request.json();
        const result = bookShema.safeParse(body);

        if(!result.success) {
            return NextResponse.json(
                { error: result.error.issues },
                { status: 400}
            );
        }

        const existingBook = await Book.findOne({isbn : result.data.isbn})

        if (existingBook) {
            return NextResponse.json(
                { error : "A book with this ISBN already exists" },
                { status : 400}
            );
        }

        const book = await Book.create(result.data)
        return NextResponse.json(book , { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error : "Server error"},
            { status: 500 }
        );
    }
}