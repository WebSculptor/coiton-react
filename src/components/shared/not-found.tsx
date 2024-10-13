import { motion } from "framer-motion";
import { variants } from "@/static";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  const { fadeIn } = variants;

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <motion.h1
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{
          once: true,
          amount: 0.7,
        }}
        className="text-primary"
      >
        Page Under Construction
      </motion.h1>
      <motion.p
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView={"show"}
        viewport={{
          once: true,
          amount: 0.7,
        }}
        className="font-sans_regular max-w-4xl text-base md:text-[23px] md:leading-[30px]"
      >
        This section is currently under development. Please check back soon for
        updates, explore our current listings in the meantime, or go back to
        home page.
      </motion.p>

      <div className="mt-4 flex w-full flex-col items-center justify-center gap-4 sm:flex-row md:mt-6">
        <motion.div
          className="w-[calc(100%-10%)] sm:w-max"
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: true,
            amount: 0.7,
          }}
        >
          <Link className="w-full sm:w-max" to="/">
            <Button className="w-full sm:w-max" size={"lg"}>
              Return to Home
            </Button>
          </Link>
        </motion.div>
        <motion.div
          className="w-[calc(100%-10%)] sm:w-max"
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: true,
            amount: 0.7,
          }}
        >
          <Link className="w-[calc(100%-10%)] sm:w-max" to="/listings">
            <Button
              className="w-[calc(100%-10%)] sm:w-max"
              size={"lg"}
              variant={"link"}
            >
              Browse Listings
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
