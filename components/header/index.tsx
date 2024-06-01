import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav className="flex h-[60px] w-full">
        <div className="flex items-center w-full justify-between px-8">
          <div>
            <Link href={"/dashboard"}>
              <p className="text-xl font-semibold">
                {" "}
                Email Application Tracker{" "}
              </p>
            </Link>
          </div>

          <div>
            <Link href={"/profile"}>
              <p> Profile </p>
            </Link>
          </div>
        </div>
      </nav>
      <hr />
    </header>
  );
};

export default Header;
