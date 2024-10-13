import { assets } from "@/assets";
import MaxWrapper from "@/components/shared/max-wrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { nav_routes } from "@/static";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FiMenu } from "react-icons/fi";
import { env } from "@/lib/envs";

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logoImage = (
    <img
      src={assets.svgs.logoIcon}
      alt="Coiton Logo"
      width={38}
      height={38}
      className="size-[38px] cursor-pointer object-contain"
    />
  );

  const getInTouch = (
    <Button variant={"black"} className="font-sans_medium h-12 rounded-full">
      {env.dev ? "Test Contract" : "Get in Touch"}
    </Button>
  );

  const renderBtn =
    pathname === "/starknet-test" ? (
      getInTouch
    ) : (
      <Link to="/starknet-test">{getInTouch}</Link>
    );

  return (
    <header className="sticky left-0 top-0 z-50 w-full py-4 backdrop-blur-3xl md:py-6">
      <MaxWrapper className="flex size-full items-center justify-between">
        <div className="w-44">
          {pathname === "/" ? (
            <div className="size-[38px]">{logoImage}</div>
          ) : (
            <Link to="/">{logoImage}</Link>
          )}
        </div>

        <ul className="hidden flex-1 items-center justify-center gap-10 md:flex lg:gap-12">
          {nav_routes.map((route: ROUTES) => {
            const isActive = pathname === route.path;

            return (
              <li key={route.path} className="group relative">
                {isActive ? (
                  <span className="font-sans_medium cursor-pointer px-2 text-lg capitalize leading-none text-primary">
                    {route.label}
                  </span>
                ) : (
                  <Link
                    to={route.path}
                    className="font-sans_medium cursor-pointer px-2 text-lg capitalize leading-none text-primary"
                  >
                    {route.label}
                  </Link>
                )}

                <span
                  className={cn(
                    "absolute -bottom-1 size-1 -translate-x-1/2 rounded-lg bg-primary transition-all duration-300",
                    {
                      "left-0 opacity-0 group-hover:left-1/2 group-hover:opacity-100":
                        !isActive,
                      "left-1/2 opacity-100": isActive,
                    },
                  )}
                />
              </li>
            );
          })}
        </ul>

        <div className="hidden w-full max-w-40 items-center justify-end md:flex lg:max-w-44">
          {renderBtn}
        </div>

        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger>
              <FiMenu className="size-6 cursor-pointer" />
              <span className="sr-only">Menu</span>
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-between">
              <SheetHeader className="mt-12">
                {nav_routes.map((route: ROUTES) => (
                  <SheetClose
                    className="group relative !mt-0 w-full border-b border-border/50 px-2 py-3 text-left outline-none last:border-b-0 focus:outline-none"
                    key={route.path}
                    onClick={() => navigate(route.path)}
                  >
                    <p className="font-sans_medium text-left text-base capitalize text-primary md:text-lg">
                      {route.label}
                    </p>
                  </SheetClose>
                ))}
              </SheetHeader>
              <SheetFooter className="mt-auto">
                <SheetClose asChild className="flex flex-col">
                  {renderBtn}
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </MaxWrapper>
    </header>
  );
}
