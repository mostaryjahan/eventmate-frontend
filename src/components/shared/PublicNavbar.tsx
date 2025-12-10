import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { getCookie } from "@/services/auth/tokenHandlers";
import { getUserInfo } from "@/services/auth/getUserInfo";
import LogoutButton from "./LogoutButton";
import UserDropdown from "../modules/Dashboard/UserDropdown";
import Logo from "../../assets/logo/logo";

const PublicNavbar = async () => {
  const navItems = [
    { href: "/events", label: "Explore Events" },
    { href: "/about", label: "About" },
    { href: "/become-host", label: "Become a Host" },
    { href: "/contact", label: "Contact" },
  ];

  const accessToken = await getCookie("accessToken");
  const userInfo = accessToken ? await getUserInfo() : null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur  dark:bg-background/95">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Logo />
          <p className="text-xl font-bold text-primary">EventMate</p>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-black uppercase hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          {userInfo ? (
            <div className="flex items-center gap-2">
              <UserDropdown userInfo={userInfo} />

              <LogoutButton />
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button>Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                {" "}
                <Menu />{" "}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className=" font-medium uppercase"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t pt-4 flex flex-col space-y-4">
                  {userInfo ? (
                    <div className="flex flex-col gap-2">
                      <UserDropdown userInfo={userInfo} />
                      <LogoutButton />
                    </div>
                  ) : (
                    <>
                      <Link href="/login" className="text-lg font-medium">
                        <Button>Login</Button>
                      </Link>
                      <Link href="/register" className="text-lg font-medium">
                        <Button>Register</Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
