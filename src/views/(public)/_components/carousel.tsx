import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { MoveLeft, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { variants } from "@/static";

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 500,
  damping: 100,
};

const slides = [
  {
    image:
      "https://plus.unsplash.com/premium_photo-1697730288131-6684ca63584b?q=80&w=2971&auto=format&fit=crop",
    title: "Luxury Villa, Banana Island, Lagos",
  },
  {
    image:
      "https://images.unsplash.com/photo-1643297551340-19d8ad4f20ad?q=80&w=3132&auto=format&fit=crop",
    title: "4 Bedroom Duplex, Lekki Phase 1, Lagos",
  },
  {
    image:
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2970&auto=format&fit=crop",
    title: "3 Bedroom Apartment, Victoria Island, Lagos",
  },
];

export default function Carousel() {
  const { fadeIn } = variants;
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  const [imgIndex, setImgIndex] = useState(0);

  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === slides.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [dragX]);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER) {
      setImgIndex((prevIndex) => (prevIndex + 1) % slides.length);
    } else if (x >= DRAG_BUFFER) {
      setImgIndex((prevIndex) =>
        prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
      );
    }
  };

  const handleNextSlide = () => {
    setImgIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrevSlide = () => {
    setImgIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
    );
  };

  return (
    <motion.div
      variants={fadeIn("up", 0.8)}
      initial="hidden"
      whileInView={"show"}
      viewport={{
        once: true,
        amount: "some",
      }}
      ref={ref}
      style={{
        scale: scaleProgress,
      }}
      className="relative aspect-[1.3] w-full overflow-hidden rounded-2xl bg-secondary sm:aspect-[1.5] md:rounded-3xl"
    >
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex size-full cursor-grab items-center active:cursor-grabbing"
      >
        {slides.map((imgSrc, idx) => {
          return (
            <motion.div
              key={idx}
              style={{
                backgroundImage: `url(${imgSrc.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              transition={SPRING_OPTIONS}
              className="aspect-[1.3] w-full shrink-0 object-cover sm:aspect-[1.5]"
            />
          );
        })}
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 flex size-full flex-col justify-end">
        <div className="h-[262px] bg-gradient-to-b from-transparent to-black/80 p-6 text-primary-foreground md:p-12">
          <div className="mt-auto flex size-full items-end justify-between">
            <p className="w-[210px] text-base md:w-[317px] md:text-2xl lg:text-[23px]">
              {slides[imgIndex].title}
            </p>

            <div className="pointer-events-auto flex items-center gap-4">
              <Button
                size={"icon"}
                className="border border-white bg-transparent"
                onClick={handlePrevSlide}
              >
                <MoveLeft size={20} />
              </Button>
              <Button
                size={"icon"}
                className="border border-white bg-transparent"
                onClick={handleNextSlide}
              >
                <MoveRight size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
