import React from 'react';
import Image from 'next/image';
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-todo-main z-50">
      <nav className="container mx-auto py-2 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/images/logo-white.svg"
            width={230}
            height={230}
            alt="Logo"
            className="ml-2"
          />
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;