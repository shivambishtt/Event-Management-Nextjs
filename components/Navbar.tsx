import Image from "next/image";
import Link from "next/link";

function Navbar() {
  return (
    <header>
      <nav className="h-20">
          <Link href="/" className="app- flex gap-2 items-center">
            <Image src="/icons/logo.png" alt="appLogo" width={24} height={24} />

            <p>Dev Events</p>
          </Link>

        <ul >
          <Link href="/home">Home</Link>
          <Link href="/events">Events</Link>
          <Link href="/create-events">Create Events</Link>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
