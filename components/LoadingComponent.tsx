"use client";

import React from "react";
import { CarIcon } from "./icon/CarIcon";

export default function LoadingComponent() {
  return (
    <div className="fixed min-h-screen top-0 left-0 right-0 border-0 bg-[#f3f2f2] flex flex-col  items-center justify-center z-200000000">
      {/*  <div className="spinner"></div> */}
      <svg viewBox="0 0 1280 200" className="svgLoading">
        <text
          text-anchor="middle"
          x="50%"
          y="50%"
          style={{ fill: "url(#text-gradient)" }}
        >
          Auto-Occaz
        </text>
        <defs>
          <linearGradient id="text-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "rgb(4, 1, 70)" }}></stop>
            <stop offset="35%" style={{ stopColor: "rgb(12, 12, 148)" }}></stop>
            <stop
              offset="100%"
              style={{ stopColor: "rgba(0, 212, 255, 1)" }}
            ></stop>
          </linearGradient>
        </defs>
      </svg>
      <p className="loading-text text-black text-[20px] flex items-center gap-2 sm:text-[40px] mt-[-20px]">
        <CarIcon width={30} height={30} /> <span>Chargement... </span>{" "}
        <CarIcon width={30} height={30} />
      </p>
    </div>
  );
}
