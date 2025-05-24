import { useEffect, useState } from "react";

function CountryDisplay() {
  const [countryName, setCountryName] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        // Try IP-based detection first
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) throw new Error("IP detection failed");

        const data = await response.json();
        if (data.country_name && data.country_calling_code) {
          setCountryName(data.country_name.toLowerCase());
          setCountryCode(data.country_calling_code);
          setLoading(false);
          return;
        }

        // Fallback to browser geolocation if IP detection fails
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const geoResponse = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );
              const geoData = await geoResponse.json();
              setCountryName(geoData.address?.country || null);

              setLoading(false);
            },
            (geoError) => {
              setError("Location permission denied");
              setLoading(false);
            }
          );
        } else {
          setError("Geolocation not supported");
          setLoading(false);
        }
      } catch (err) {
        setError("Could not detect country");
        setLoading(false);
      }
    };

    detectCountry();
  }, []);
  return { countryCode, countryName };
}

export default CountryDisplay;
