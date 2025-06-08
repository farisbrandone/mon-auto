"use client";
import Footer from "@/components/Footer";
import HeaderCars from "@/components/HeaderCars";
import { Localisation } from "@/components/icon/Localisation";
import { Telephone } from "@/components/icon/Telephone";
import { ImageCaroussel } from "@/components/ImageCarousel";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  formatDate,
  formatMoney,
  mapBackToFrontTypeCarburant,
  mapBackToFrontTypeMoteur,
  mapBackTofrontTypeTrainConducteur,
  mapBackToFrontTypeTransmission,
} from "@/lib/utils";

import { useInfiniteAutos } from "@/hook/useInfiniteAuto";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import LoadingComponent from "@/components/LoadingComponent";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import SearchComponent from "@/components/SearchComponent";

export interface SearchCriteria {
  marques?: string;
  typesCarrosserie?: string;
  anneeMin?: number;
  anneeMax?: number;
  kilometrageMin?: number;
  kilometrageMax?: number;
  PrixMin?: number;
  PrixMax?: number;
  typeMoteur?: string;
  selectedColor?: string;
  keyword?: string;
  typeCarburant?: string;
  typeTransmission?: string;
  villeDuBien?: string;
  // Add other search criteria as needed
}

function CarsPageCopy() {
  const [position, setPosition] = useState(0);
  const [lolo, setLolo] = useState(true);

  const { autos, loading, hasMore, fetchMore } = useInfiniteAutos();
  const observer = useRef<IntersectionObserver>(null);

  const lastCarElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setLolo(false);
  }, []);

  return (
    <div className="text-black text-[16px] min-h-screen flex flex-col ">
      <HeaderCars />
      <ScrollToTopButton />

      <SearchComponent mt="mt-[100px]" />
      <div className="flex flex-col sm:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-full gap-4 mb-3.5 p-2">
        {autos &&
          autos?.map((val, index) => {
            return (
              <div
                ref={index === autos.length - 1 ? lastCarElementRef : null}
                className=" p-1 flex flex-col items-center max-w-xl   border-[1px] border-[#00000021] border-solid  rounded-lg cardDetailShadow"
              >
                <ImageCaroussel
                  className="w-full max-w-xl rounded-lg max-h-[260px] sm:max-h-[388px] "
                  position={position}
                  setPosition={setPosition}
                  imagesAuto={val._links.imagesAuto.href}
                />
                <p className="w-full flex items-center font-[900] justify-end text-red-600 mt-3 text-[20px] mr-1 ">
                  FCFA {formatMoney(val.prix)}
                </p>

                <p className="w-full font-black text-[18px] flex flex-col p-2  after:w-full after:border-1 after:border-solid after:mt-2 after:border-[#33333383] ">
                  model: {formatDate(val.anneeDeFabrication)} {val.marques}{" "}
                  {val.model}
                </p>
                <div className="flex flex-col gap-3 w-full p-2 ">
                  {/*   <div className="grid grid-cols-2 w-full">
                                   <p className="font-[800]"> Kilometrage : </p>
                                   <p className=" w-full">
                                     {" "}
                                     {formatMoney(val.kilometrage)} {val.kilometrageUnit}
                                   </p>
                                 </div> */}
                  <div className="grid grid-cols-2 w-full">
                    <p className="font-[800]"> Moteur : </p>
                    <p className=" w-full">
                      {mapBackToFrontTypeMoteur(val.typeMoteur)}{" "}
                    </p>
                  </div>

                  {/*  <div className="grid grid-cols-2 w-full">
                                   <p className="font-[800]"> chaîne de traction : </p>
                                   <p className=" w-full">
                                     {mapBackTofrontTypeTrainConducteur(
                                       val.typeDeTrainConducteur
                                     )}
                                   </p>
                                 </div> */}
                  <div className="grid grid-cols-2 w-full">
                    <p className="font-[800]"> Type de carburant : </p>
                    <p className=" w-full">
                      {" "}
                      {mapBackToFrontTypeCarburant(val.typeCarburant)}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 w-full">
                    <p className="font-[800]"> Transmission </p>
                    <p className=" w-full">
                      {mapBackToFrontTypeTransmission(val.typeTransmission)}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 w-full">
                    <p className="font-[800]">Climatisation </p>
                    <p className=" w-full">{val.climatisation}</p>
                  </div>

                  <div className="grid grid-cols-2 w-full">
                    <p className="font-[800]"> Ville : </p>
                    <p className=" w-full"> {val.villeDuBien} </p>
                  </div>
                </div>
                <div className="flex flex-col flex-1 w-full gap-1 justify-end px-2 ">
                  <Link
                    href={`/detail-car/${val.id}`}
                    className=" text-center p-1 text-[18px] w-full bg-[#191919] text-white rounded-[4px] border-none border-[#33333383]  cursor-pointer hover:bg-[#cacaca] hover:text-[#191919]  transition-colors duration-500 "
                  >
                    Voir les détails
                  </Link>
                  <div className="flex items-center w-full justify-between mt-2 text-[18px] font-[400]">
                    <div className="flex items-center">
                      <Localisation color="#d14141" />
                      <p className="ml-1 hover:text-red-600  cursor-pointer ">
                        MonAuto.com
                      </p>{" "}
                    </div>
                    <div className="flex items-center">
                      <Telephone color="#d14141" />
                      <p className="ml-1  hover:text-red-600 cursor-pointer">
                        Tel: 655968956
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        {(loading || lolo) && (
          <>
            <div className="flex justify-center items-center py-8 col-span-2 xl:col-span-3 2xl:col-span-4 ">
              <LoadingComponent />
            </div>
          </>
        )}
        {/* {!hasMore && <div className="no-more">No more cars to load</div>} */}

        {((!loading && autos.length === 0) || !hasMore) && !lolo && (
          <div className=" w-full no-results mt-6 text-center text-gray-500 col-span-2">
            Aucune autre voiture trouvé
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default CarsPageCopy;
