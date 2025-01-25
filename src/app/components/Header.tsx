import Link from 'next/link';
import React from 'react';

const navItems = ["home", "about", "menu"];

export default function Header() {
  return (
    <header className="absolute left-0 right-0 top-0 z-50 h-full px-6 py-4 hd:h-32/48">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[auto,auto] items-center gap-6 md:grid-cols-[1fr,auto,1fr]">
        <Link href="/">
          <img src="/path/to/logo.png" alt="Old Dhaka" className="h-full"/>
        </Link>
        <nav className="col-span-full row-start-2 md:col-span-1 md:col-start-2 md:row-start-1">
          <ul className="flex flex-wrap items-center justify-center gap-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link href={`/${item}`} className="~text-lg/xl">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
      </div>
    </header>
  );
}
