'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="site-logo">
          <span className="logo-icon">&#128218;</span>
          OpenShelf
        </Link>
        <nav className="site-nav">
          <Link href="/" className={pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          <Link
            href="/books/create"
            className={pathname === '/books/create' ? 'active' : ''}
          >
            Add a Book
          </Link>
        </nav>
      </div>
    </header>
  );
}
