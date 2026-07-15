import { z } from "zod"

export const bookShema = z.object({
    title: z.string().min(3 , "Title must be at least 3 characters"),
    author: z.string().min(1 , "Author is required"),
    isbn: z.string().min(1, "ISBN is required"),
    category: z.string().min(1, "Category is required"),
    publicationYear: z.number(),
    description: z.string().min(10, "Description must be at least 10 characters"),
})

export type BookInput = z.infer<typeof bookShema>