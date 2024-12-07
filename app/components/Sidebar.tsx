"use client";

import Link from "next/link";

const Sidebar = () => {
  const items = [
    { label: 'ToDo lists', href: '/lists' },
  ];

  return (
    <div className="w-64 h-screen fixed top-16 left-0 bg-todo-side text-white p-5">
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index}>
            <Link href={item.href} className="text-lg text-black hover:underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;