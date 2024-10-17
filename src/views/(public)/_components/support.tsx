import { assets } from "@/assets";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import MaxWrapper from "@/components/shared/max-wrapper";
import { variants } from "@/static";

export default function Support() {
  const { fadeIn } = variants;

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      translateY: -10,
      zIndex: 2,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 2,
    },
  };

  return (
    <MaxWrapper>
      <div className="mg:gap-14 mb-28 flex flex-col gap-10 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-4 md:gap-6 lg:w-[458px]">
          <motion.div
            variants={fadeIn("right", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{
              once: true,
              amount: 0.7,
            }}
            className="flex items-center gap-4"
          >
            <div className="flex h-[38px] flex-1 items-center justify-center rounded-full border border-primary font-sans_regular text-sm text-primary sm:w-44 sm:flex-none md:w-[248px] md:font-sans_medium md:text-base">
              Starknet-Backed
            </div>

            <div className="flex items-center gap-1 text-primary">
              <img
                src={assets.svgs.logoIcon}
                alt="coiton"
                width={34}
                height={34}
                className="size-9 object-contain"
              />
              <X size={12} />
              <img
                src={assets.svgs.starknetIcon}
                alt="starknet"
                width={34}
                height={34}
                className="size-9 object-contain"
              />
            </div>
          </motion.div>
          <motion.h1
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{
              once: true,
              amount: 0.7,
            }}
            className="font-serif_regular text-primary"
          >
            Decentralized <br className="hidden md:flex lg:hidden" />{" "}
            Real-Estate Tokenization
          </motion.h1>
        </div>
        <motion.div
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: true,
            amount: 0.7,
          }}
          className="h-[280px] flex-1 rounded-2xl bg-gradient-to-br from-[#FBFEFE] via-[#FBFEFE] to-[#57E741] p-1 sm:h-[400px] md:rounded-[24px] lg:p-[1.5px]"
        >
          <div className="relative flex size-full justify-center overflow-clip rounded-[inherit] bg-white bg-gradient-to-b from-[#F9FFF8] to-[#DEFED9]">
            <motion.div
              className="z-[2] cursor-pointer lg:absolute lg:left-[20px] lg:top-[65px]"
              style={{
                rotate: "-3.53deg",
              }}
              whileHover="whileHover"
              whileTap="whileTap"
              variants={imageVariants}
            >
              <img
                src={assets.images.prop1}
                alt="PROPERTY 1"
                width={297}
                height={359}
                className="-ml-4 h-[420px] w-[350px] rounded-lg object-contain shadow-2xl shadow-black/40 sm:h-[359px] sm:w-[297px] lg:-ml-0"
              />
            </motion.div>

            <motion.div
              className="z-[1] cursor-pointer lg:absolute lg:left-[300px] lg:top-[45px]"
              style={{
                rotate: "0.23deg",
              }}
              whileHover="whileHover"
              whileTap="whileTap"
              variants={imageVariants}
            >
              <img
                src={assets.images.prop2}
                alt="PROPERTY 2"
                width={297}
                height={359}
                className="-ml-16 rounded-lg object-contain shadow-2xl shadow-black/40 md:h-[359px] md:w-[297px] lg:-ml-0"
              />
            </motion.div>

            <motion.div
              className="z-0 cursor-pointer lg:absolute lg:right-[20px] lg:top-[65px]"
              style={{
                rotate: "2.94deg",
              }}
              whileHover="whileHover"
              whileTap="whileTap"
              variants={imageVariants}
            >
              <img
                src={assets.images.prop3}
                alt="PROPERTY 3"
                width={297}
                height={359}
                className="-ml-12 rounded-lg object-contain shadow-2xl shadow-black/40 md:h-[359px] md:w-[297px] lg:-ml-0"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </MaxWrapper>
  );
}
