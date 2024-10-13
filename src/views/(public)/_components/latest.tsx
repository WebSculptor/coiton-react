import { MoveRight } from "lucide-react";
import { LiaEthereum } from "react-icons/lia";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { RxClock } from "react-icons/rx";
import MaxWrapper from "@/components/shared/max-wrapper";
import { dummy_properies, variants } from "@/static";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Latest() {
  const { fadeIn } = variants;

  const fadInAnimate = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.8,
        delay: 0.5 * index,
      },
    }),
  };

  const [activeCard, setActiveCard] = useState(1);

  return (
    <MaxWrapper>
      <div className="my-16 flex flex-col gap-7 md:my-32 md:gap-14">
        <div className="flex items-end justify-between">
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{
              once: true,
              amount: 0.7,
            }}
            className="flex flex-col gap-2 md:gap-0"
          >
            <h2 className="text-[#032724] md:leading-[80px]">Latest Updates</h2>
            <p className="text-muted-foreground">
              Below are a list of some of our featured properties,
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{
              once: true,
              amount: 0.7,
            }}
          >
            <Button variant={"black"} className="hidden px-6 md:flex">
              See More <MoveRight size={22} className="ml-3" />
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dummy_properies.map((property, _index) => (
            <motion.div
              variants={fadInAnimate}
              initial="initial"
              whileInView={"animate"}
              viewport={{
                once: true,
                amount: 0.7,
              }}
              onMouseOver={() => setActiveCard(_index + 1)}
              key={property.image[0]}
              custom={_index}
              className="flex flex-col"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl border-2 border-border/20 bg-background shadow-2xl shadow-black/20">
                <div
                  className={cn(
                    "absolute bottom-0 left-0 z-10 h-full w-full overflow-hidden rounded-2xl bg-background/80 transition-all duration-500",
                    {
                      "h-[30%] brightness-50": activeCard === _index + 1,
                    },
                  )}
                >
                  <img
                    src={property?.image[0]}
                    alt={property?.title}
                    className={cn(
                      "size-full object-cover delay-200 duration-300",
                      {
                        "scale-110": activeCard === _index + 1,
                      },
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "flex size-full flex-col gap-2 rounded-2xl px-6 pt-16 opacity-0 transition-all delay-300",
                    {
                      "pt-8 opacity-100": activeCard === _index + 1,
                    },
                  )}
                >
                  <h3 className="font-serif_regular flex items-center text-[#032724]">
                    <LiaEthereum className="mr-1 size-8" />
                    {property?.price.toLocaleString()}
                  </h3>

                  <p className="font-sans_medium flex items-center text-base">
                    <span className="line-clamp-1 flex-1">
                      {property?.address}
                    </span>
                  </p>

                  <div className="mt-4 flex items-center gap-4">
                    <p className="flex items-center text-sm text-muted-foreground sm:text-base">
                      <RxClock size={18} className="mr-2" />
                      {property?.createdAt}
                    </p>
                    <p className="flex items-center text-sm text-muted-foreground sm:text-base">
                      <PiBuildingOfficeLight size={18} className="mr-2" />
                      {property?.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MaxWrapper>
  );
}
