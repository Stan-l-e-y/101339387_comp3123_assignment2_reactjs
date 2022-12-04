//navbar
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center h-16 mt-10  relative shadow-sm  ">
      <div className="ml-8">
        <Link href="/">
          <span className=" hover:bg-blue-700 bg-[#0070f3] p-4 rounded-lg ">
            Home
          </span>
        </Link>
      </div>
      <div className="px-4 cursor-pointer md:hidden">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
      <div className="pr-8 md:block hidden">
        <Link href="/employee/add">
          <span className="p-4 hover:bg-blue-700 bg-[#0070f3] rounded-lg">
            Log Out
          </span>
        </Link>
      </div>
    </nav>
  );
}
