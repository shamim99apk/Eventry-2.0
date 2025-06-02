import Image from "next/image";
import Link from "next/link";

function Navbar() {
  return (
    <nav>
      <div className="container flex justify-between items-center py-4">
        <div className="nav-brand">
          <Link href="/">
            <Image
              src="/eventryfinal.png"
              alt="Eventry"
              className="w-32 sm:w-40 md:w-56 lg:w-64"
              width={150}
              height={150}
            />
          </Link>
        </div>

        <ul className="flex gap-4 text-[#9C9C9C]">
          <li>About</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
