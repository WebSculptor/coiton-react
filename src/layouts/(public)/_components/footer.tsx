import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { BsYoutube } from "react-icons/bs";
import MaxWrapper from "@/components/shared/max-wrapper";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { footer_routes } from "@/static";
import { assets } from "@/assets";

export default function Footer() {
  return (
    <footer className="bg-[#062623] text-primary-foreground">
      <div className="w-full py-24">
        <MaxWrapper className="flex flex-col justify-between gap-6 lg:flex-row">
          <img
            src={assets.svgs.logoIcon}
            alt="Coiton Logo"
            width={270}
            height={270}
            className="mx-auto size-[270px] object-contain lg:mx-0"
          />

          <h1 className="mx-auto mb-6 mt-4 flex text-center md:px-8 lg:hidden">
            Invest in Real Estate, Reinvented.
          </h1>

          <div className="flex flex-wrap items-start gap-[59px] md:justify-between">
            {footer_routes.map((route: ROUTES) => (
              <div
                key={route.label}
                className="flex w-full flex-col gap-4 md:w-max md:max-w-[168px] md:gap-6"
              >
                <p className="font-sans_bold text-lg">{route.label}</p>

                <ul className="flex flex-col md:gap-2">
                  {route.path.map((path: string) => (
                    <Link
                      to="/"
                      key={path}
                      className="md:font-sans_regular sm:font-sans_medium text-sm capitalize leading-[26.46px] transition-transform duration-300 sm:text-base md:text-[15px] md:hover:translate-x-2"
                    >
                      {path}
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex w-full flex-col gap-4 md:w-max md:max-w-[168px] md:gap-6">
              <p className="font-sans_bold text-lg">Our Office</p>

              <ul className="flex flex-col md:gap-2">
                <p className="md:font-sans_regular sm:font-sans_medium text-sm capitalize leading-[26.46px] transition-transform duration-300 sm:text-base md:text-[15px] md:hover:translate-x-2">
                  29 Abadek Avenue by MTN, off Akin Ogunlewe Rd, Igbogbo
                  Ikorodu, Igbogbo, Lagos
                </p>
              </ul>
            </div>
          </div>
        </MaxWrapper>
      </div>
      <div className="border-t py-8">
        <MaxWrapper className="flex flex-col justify-center gap-4 md:items-center lg:flex-row lg:justify-between">
          <div className="w-full text-center lg:w-[268px] lg:text-left">
            <p className="font-sans_light md:font-sans_regular text-sm md:text-[15px]">
              © 2024 Coiton All rights reserved.
            </p>
          </div>

          <ul className="flex flex-1 items-start justify-center gap-8">
            <li className="font-sans_light md:font-sans_regular text-sm md:text-[15px]">
              Privacy
            </li>
            <li className="font-sans_light md:font-sans_regular text-sm md:text-[15px]">
              Security
            </li>
            <li className="font-sans_light md:font-sans_regular text-sm md:text-[15px]">
              Terms
            </li>
          </ul>

          <div className="flex w-full items-center justify-center gap-4 lg:w-[268px] lg:justify-end">
            <Button
              className="size-9 rounded-full"
              size={"icon"}
              variant={"secondary"}
            >
              <Link
                to="https://www.linkedin.com/in/coiton-nigeria-b59b6831a/"
                target="_blank"
                className="flex size-full items-center justify-center"
              >
                <FaLinkedinIn size={19} className="text-foreground" />
              </Link>
            </Button>
            <Button
              className="size-9 rounded-full"
              size={"icon"}
              variant={"secondary"}
            >
              <Link
                to="https://x.com/_COiTON"
                target="_blank"
                className="flex size-full items-center justify-center"
              >
                <FaXTwitter size={19} className="text-foreground" />
              </Link>
            </Button>
            <Button
              className="size-9 rounded-full"
              size={"icon"}
              variant={"secondary"}
              disabled
            >
              <Link
                to="/"
                target="_blank"
                className="flex size-full items-center justify-center"
              >
                <FaFacebookF size={19} className="text-foreground" />
              </Link>
            </Button>
            <Button
              className="size-9 rounded-full"
              size={"icon"}
              variant={"secondary"}
              disabled
            >
              <Link
                to="/"
                target="_blank"
                className="flex size-full items-center justify-center"
              >
                <SiInstagram size={19} className="text-foreground" />
              </Link>
            </Button>
            <Button
              className="size-9 rounded-full"
              size={"icon"}
              variant={"secondary"}
              disabled
            >
              <Link
                to="/"
                target="_blank"
                className="flex size-full items-center justify-center"
              >
                <BsYoutube size={19} className="text-foreground" />
              </Link>
            </Button>
          </div>
        </MaxWrapper>
      </div>
    </footer>
  );
}
