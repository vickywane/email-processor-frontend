import Link from "next/link";
import { LuUserCircle2 } from "react-icons/lu";

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
              <div className="flex gap-4">
                <div>
                  <LuUserCircle2 size={32} />
                </div>

                <div className="flex items-center" >
                  <p> Profile </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </nav>
      <hr />
    </header>
  );
};

export default Header;
