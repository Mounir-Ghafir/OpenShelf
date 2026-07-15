import Link from "next/link";

export default function Header() {
    return (
        <header>
            <h1>OpenShelf</h1>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/books/create">Add a Book</Link>
            </nav>
        </header>
    )
}