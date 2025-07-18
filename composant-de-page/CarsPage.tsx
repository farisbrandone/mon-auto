"use client";
import Footer from "@/components/Footer";
import HeaderCars from "@/components/HeaderCars";
import { Localisation } from "@/components/icon/Localisation";
import { Telephone } from "@/components/icon/Telephone";
import { ImageCaroussel } from "@/components/ImageCarousel";
import VehicleColorPicker, { ColorOption } from "@/components/SelectColors2";
import { SelectComponent } from "@/components/SelectComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FUEL_TYPES,
  MARQUES,
  MIN_YEAR,
  TRANSMISSION_TYPES,
  TYPES_CARROSSERIE,
  TYPES_MOTEUR,
  villesCameroun,
} from "@/lib/constants/carProperties";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { useForm } from "react-hook-form";
import { searchForm, searchSchema } from "@/lib/validations/seller";
import { zodResolver } from "@hookform/resolvers/zod";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import LoadingComponent from "@/components/LoadingComponent";
import { ImageWithSkeleton4 } from "@/components/ImageWithSkeleton";
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

function CarsPage() {
  const router = useRouter();
  const [position, setPosition] = useState(0);

  const [lolo, setLolo] = useState(true);

  const { autos, loading, hasMore, fetchMore } = useInfiniteAutos();
  const observer = useRef<IntersectionObserver>(null);

  /*  const lastCarElementRef = useCallback(
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
  ); */

  useEffect(() => {
    if (loading) {
      setLolo(false);
    }
  }, [loading]);

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center py-8 col-span-2 xl:col-span-3 2xl:col-span-4 ">
          <LoadingComponent />
        </div>
      </>
    );
  }

  return (
    <div className="text-black text-[16px] min-h-screen flex flex-col ">
      <HeaderCars />
      <ScrollToTopButton />
      <div className="relative w-full mt-[110px]  sm:mt-[150px] p-2 ">
        <ImageWithSkeleton4
          src="/auth-image.jpg"
          alt=""
          className=" w-full h-full  flex"
        />
        <div className="absolute w-[calc(100%_-_8px)] top-1 left-1 h-[calc(100%_-_8px)] bg-black/20 z-30 rounded-lg  "></div>
        <div className="top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full absolute flex flex-col  font-[600]  text-[#fffafa] text-[16px] sm:text-[20px] z-40 ">
          <div className="self-center max-sm:ml-5">
            <p className=" text-xl sm:text-3xl select-none font-[900]">
              Bienvenue sur Auto-Occaz.com
            </p>
            <p>Le meilleur choix pour l'achat de ton véhicule en occasion</p>
            <p className="max-sm:hidden">
              Recherche, filtre, trie et trouve le véhicule qui te convient
            </p>
            <button
              className="dashButton mt-4"
              onClick={() => router.push("/cars")}
            >
              Commence ici
            </button>
          </div>
          {/*   <div className="w-full text-black p-2">
            <SearchComponent />
          </div> */}
        </div>
      </div>

      <SearchComponent />
      <p className="ml-2 font-normal text-red-500 mb-2 mt-2 underline">
        Parcoure les autos les plus visitées
      </p>
      <div className="flex flex-col sm:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-full gap-4 mb-3.5 p-2">
        {autos &&
          autos?.map((val, index) => {
            return (
              <div
                /*  ref={index === autos.length - 1 ? lastCarElementRef : null} */
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
                        auto-occaz.com
                      </p>{" "}
                    </div>
                    <div className="flex items-center">
                      <Telephone color="#d14141" />
                      <p className="ml-1  hover:text-red-600 cursor-pointer">
                        Tel: 650089683
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
              {/*   <LoadingComponent /> */}
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

export default CarsPage;
