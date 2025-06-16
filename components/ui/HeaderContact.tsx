import { Phone } from "lucide-react";
import React from "react";

const VehicleHeader: React.FC = () => {
  const whatsappNumber = "+237655968956"; // Remplacez par votre numéro
  const standardNumber = "+237650089683"; // Remplacez par votre numéro

  // Formatte le numéro WhatsApp pour l'URL (supprime les espaces et caractères spéciaux)
  const formattedWhatsappNumber = whatsappNumber.replace(/[\s\-\(\)]/g, "");

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 text-center shadow-md text-[12px] sm:text-[14px] flex items-center justify-between pl-1">
      <h1 className=" font-bold text-[14px] sm:text-xl">
        contact us for any budget :{" "}
        {/* <span className="hidden sm:inline">
          quelque soit le véhicule rechercher et votre budget.
        </span> */}
      </h1>
      <div className=" flex   items-center gap-2 ">
        {/* Lien WhatsApp */}
        <a
          href={`https://wa.me/${formattedWhatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 transition-colors duration-200 px-6 py-3 rounded-full font-semibold  items-center gap-2 hidden sm:flex"
        >
          ws: {whatsappNumber}
        </a>

        {/* Numéro standard */}
        <div className="flex items-center gap-2">
          <Phone />
          <span className="font-semibold"> {standardNumber}</span>
        </div>
      </div>
    </header>
  );
};

export default VehicleHeader;
