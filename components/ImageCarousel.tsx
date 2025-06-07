import * as React from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import axios from "axios";
import ImageWithSkeleton, {
  ImageWithSkeleton2,
  ImageWithSkeleton5,
} from "./ImageWithSkeleton";
import SkeletonTrue from "./SkeletonTrue";
import Image from "next/image";
import { ZoomIcon } from "./icon/ZoomIcon";
import clsx from "clsx";

export const tab = [
  "/vehicule1.jpg",
  "/vehicule2.jpg",
  "/vehicule3.jpg",
  "/vehicule4.jpg",
  "/vehicule5.jpg",
  "/vehicule6.jpg",
];

export function ImageCaroussel({
  className,
  position,
  setPosition,
  imagesAuto,
}: {
  className: string;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
  position: number;
  imagesAuto: string;
}) {
  const [images, setImages] = React.useState<any[] | null>();
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const getImagesAuto = async () => {
      try {
        setLoading(true);
        const imagesUrl = await axios.get(imagesAuto);
        console.log({ zizi: imagesUrl.data._embedded.imageAutos });
        setImages(imagesUrl.data._embedded.imageAutos);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getImagesAuto();
  }, []);

  if (loading) {
    return <SkeletonTrue className={className + " h-[300px]"} />;
  }

  return (
    <Carousel className={className}>
      <CarouselContent>
        {images &&
          images.map((value, index) => (
            <CarouselItem key={index}>
              {value.url && (
                <ImageWithSkeleton
                  src={value.url.split("--")[0]}
                  alt=""
                  className=" max-h-[260px] sm:max-h-[388px] rounded-t-lg"
                />
              )}
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious position={position} setPosition={setPosition} />
      <CarouselNext position={position} setPosition={setPosition} />
    </Carousel>
  );
}

export function ImageCaroussel2({
  className,
  position,
  setPosition,
  imagesAuto,
  setImages,
  images,
}: {
  className: string;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
  position: number;
  imagesAuto: string;
  setImages: React.Dispatch<React.SetStateAction<any[] | null | undefined>>;
  images: any[] | null | undefined;
}) {
  const [displayZoom, setDisplayZoom] = React.useState(false);

  React.useEffect(() => {
    const getImagesAuto = async () => {
      try {
        const imagesUrl = await axios.get(imagesAuto);
        console.log({ zizi: imagesUrl.data._embedded.imageAutos });
        setImages(imagesUrl.data._embedded.imageAutos);
      } catch (error) {
        console.log(error);
      }
    };
    getImagesAuto();
  }, []);

  return (
    <div>
      {!displayZoom ? (
        <Carousel className={className}>
          <CarouselContent
            onClick={() => {
              setDisplayZoom(true);
              console.log(displayZoom);
            }}
          >
            {images &&
              images.map((value, index) => (
                <CarouselItem key={index}>
                  {value.url && (
                    <ImageWithSkeleton2
                      src={value.url.split("--")[0]}
                      alt=""
                      className="w-full object-cover rounded-t-lg "
                    />
                  )}
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious
            position={position}
            setPosition={setPosition}
            className="ml-3"
          />
          <CarouselNext
            position={position}
            setPosition={setPosition}
            className="mr-3"
          />
        </Carousel>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className=" drop-shadow-2xl bg-white fixed top-0 left-0 w-screen h-screen  z-3000000000000"
        >
          <Carousel className={className + ""}>
            <div
              className="fixed right-2 top-5 p-2 bg-white/25 rounded-sm z-500000000000 "
              onClick={() => setDisplayZoom(false)}
            >
              <ZoomIcon width={30} height={30} color="black" />
            </div>

            <CarouselContent>
              {images &&
                images.map((value, index) => (
                  <CarouselItem key={index}>
                    {value.url && (
                      <ImageWithSkeleton5
                        src={value.url.split("--")[0]}
                        alt=""
                        className="w-full h-full object-cover rounded-t-lg "
                      />
                    )}
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious
              position={position}
              setPosition={setPosition}
              className="ml-3"
            />
            <CarouselNext
              position={position}
              setPosition={setPosition}
              className="mr-3"
            />
          </Carousel>
        </motion.div>
      )}
    </div>
  );
}

export function ImageCaroussel3({
  className,
  position,
  setPosition,
  imagesAuto,
}: {
  className: string;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
  position: number;
  imagesAuto: any[];
}) {
  return (
    <Carousel className={className}>
      <CarouselContent>
        {imagesAuto &&
          imagesAuto.map((value) => (
            <CarouselItem key={value.id}>
              {value.url && (
                <ImageWithSkeleton
                  src={value.url.split("--")[0]}
                  alt=""
                  className="w-full object-cover rounded-t-lg max-h-[260px] sm:max-h-[388px]"
                />
              )}
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious position={position} setPosition={setPosition} />
      <CarouselNext position={position} setPosition={setPosition} />
    </Carousel>
  );
}
