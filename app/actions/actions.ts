// app/actions.ts
"use server";

import { baseUrl } from "@/lib/utils";
import axios from "axios";
import { redirect } from "next/navigation";

//import { hash } from "bcryptjs";

export async function registerSeller(formData: FormData) {
  let carte_grise = formData.get("carteGrise") as any;
  let pv_controle_technique = formData.get("pvControleTechnique") as any;
  const size = formData.get("size_image");

  const images_auto: any[] = [];
  if (size && Number(size) !== 0) {
    for (let i = 0; i < Number(size); i++) {
      const value = formData.get("imagesAuto" + i) as any;
      images_auto.push(value);
    }
  }

  if (carte_grise && carte_grise.size === 0) {
    carte_grise = null;
  }

  if (pv_controle_technique && pv_controle_technique.size === 0) {
    pv_controle_technique = null;
  }

  const refreshToken = formData.get("mon-refresh-token");

  // Convertir FormData en objet
  const rawData = {
    marques: formData.get("marques"),
    conso100kmAutoRoute: formData.get("conso100kmAutoRoute"),
    conso100kmVille: formData.get("conso100kmVille"),
    tailleDuMoteur: formData.get("tailleDuMoteur"),
    model: formData.get("model"),
    nbreDePlace: formData.get("nbreDePlace"),
    nbreDePorte: formData.get("nbreDePorte"),
    villeDuBien: formData.get("villeDuBien"),
    couleurInt: formData.get("couleurInt"),
    couleurExt: formData.get("couleurExt"),
    typesCarrosserie: formData.get("typesCarrosserie"),
    typeCarburant: formData.get("typeCarburant"),
    typeTransmission: formData.get("typeTransmission"),
    typeDeTrainConducteur: formData.get("typeDeTrainConducteur"),
    typeMoteur: formData.get("typeMoteur"),
    kilometrage: formData.get("kilometrage"),
    kilometrageUnit: formData.get("kilometrageUnit"),
    prix: formData.get("prix"),
    devise: formData.get("devise"),
    immatriculation: formData.get("immatriculation"),
    acceptsTerms: formData.get("acceptsTerms") === "on",
    carteGriseUrl: carte_grise /* ?.name */,
    pvControleTechniqueUrl: pv_controle_technique /* ?.name */,
    imagesAuto: images_auto,
    /*  .filter((file) => file.size > 0)
      .map((val) => val.name) */ statusOfAuto: formData.get("statusOfAuto"),
    anneeDeFabrication: new Date(
      formData.get("anneeDeFabrication") as string
    ).toISOString(),
    lastMaintenanceDate: formData.get("lastMaintenanceDate")
      ? new Date(formData.get("lastMaintenanceDate") as string).toISOString()
      : "",
    dateOfCreated: new Date().toISOString(),
    dateOfModified: new Date().toISOString(),
    userToken: formData.get("mon-auto-token"),
    descriptionAuto: formData.get("descriptionAuto"),
    climatisation: formData.get("climatisation"),
  };

  // Valider les données
  /*  const result = SellerSchema.safeParse(rawData);

  if (!result.success) {
    console.log({ errors: result.error.flatten() });
    return {
      success: false,
      errors: result.error.flatten(),
    };
  } */

  try {
    const response = await axios.post(`${baseUrl}/addAuto`, rawData, {
      headers: {
        Authorization: `Bearer ${rawData.userToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return { success: true, data: response.data, error: null, token: null };
    } else {
      throw new Error("problème de connexion");
    }
  } catch (error) {
    let myError = "";
    console.error("Erreur lors de l'inscription:", error);
    if (axios.isAxiosError(error)) {
      // Axios error (network or HTTP)
      if (error.response) {
        console.log({ statusError: error.response.status });
        // Server responded with error status (4xx, 5xx)
        console.error("Server responded with error:", {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });

        // Handle specific status codes
        if (error.response.status === 401) {
          // Handle unauthorized (e.g., refresh token or redirect to login)
          try {
            const response = await axios.get(`${baseUrl}/refreshToken`, {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            });

            /*  const val = JSON.stringify(response.data);
            localStorage.setItem("mon-auto-token", val); */

            rawData.userToken = response.data["access-token"];
            const response2 = await axios.post(`${baseUrl}/addAuto`, rawData, {
              headers: {
                Authorization: `Bearer ${response.data["access-token"]}`,
                "Content-Type": "application/json",
              },
            });

            if (response2.status === 200) {
              return {
                success: true,
                data: response2.data,
                error: null,
                token: response.data,
              };
            } else {
            }
          } catch (error) {
            console.log(error);
            redirect("/seller-login");
          }
        }
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
        myError = error.message;
      } else {
        // Something happened in setting up the request
        console.error("Request setup error:", error.message);
        myError = error.message;
      }
    } else {
      // Non-Axios error (e.g., in your code)
      console.error("Unexpected error:", error);
      myError = "Une erreur est survenue vérifié votre connexion";
    }
    return { success: false, data: null, error: myError };
  }
}
export interface imageType {
  url: string;
  id: string;
}

export const updateSellerAuto = async (formData: FormData, id: string) => {
  let carte_grise = formData.get("carteGrise");
  let pv_controle_technique = formData.get("pvControleTechnique");
  const size = formData.get("size_image");

  const images_auto: imageType[] = [];
  if (size && Number(size) !== 0) {
    for (let i = 0; i < Number(size); i++) {
      const value = formData.get("imagesAuto" + i);
      images_auto.push(JSON.parse(value as string) as imageType);
    }
  }

  if (!carte_grise) {
    carte_grise = null;
  }

  if (!pv_controle_technique) {
    pv_controle_technique = null;
  }

  const refreshToken = formData.get("mon-refresh-token");

  const dd = formData.get("typeCarburant");
  const typcarb =
    dd === "Essence"
      ? "ESSENCE"
      : dd === "Diesel"
      ? "DIESEL"
      : dd === "Hybride"
      ? "HYBRIDE"
      : dd === "Electrique"
      ? "ELECTRIQUE"
      : "GPL";

  /*  const toto = formData.get("typeTransmission"); */
  /*  const trans =
    toto === "Manuelle"
      ? "TRANSMISSION_MANUELLE"
      : toto === "Automatique"
      ? "TRANSMISSION_AUTOMATIQUE"
      : "TRANSMISSION_SEMI_AUTOMATIQUE";
 */
  // Convertir FormData en objet
  const rawData = {
    id: Number(id),
    marques: formData.get("marques"),
    conso100kmAutoRoute: formData.get("conso100kmAutoRoute"),
    conso100kmVille: formData.get("conso100kmVille"),
    tailleDuMoteur: formData.get("tailleDuMoteur"),
    model: formData.get("model"),
    nbreDePlace: formData.get("nbreDePlace"),
    nbreDePorte: formData.get("nbreDePorte"),
    villeDuBien: formData.get("villeDuBien"),
    couleurInt: formData.get("couleurInt"),
    couleurExt: formData.get("couleurExt"),
    typesCarrosserie: formData.get("typesCarrosserie"),
    typeCarburant: typcarb,
    typeTransmission: formData.get("typeTransmission"),
    typeDeTrainConducteur: formData.get("typeDeTrainConducteur"),
    typeMoteur: formData.get("typeMoteur"),
    kilometrage: formData.get("kilometrage"),
    kilometrageUnit: formData.get("kilometrageUnit"),
    prix: formData.get("prix"),
    devise: formData.get("devise"),
    immatriculation: formData.get("immatriculation"),
    acceptsTerms: formData.get("acceptsTerms") === "on",
    carteGriseUrl: carte_grise,
    pvControleTechniqueUrl: pv_controle_technique,
    imagesAuto: images_auto,
    userToken: formData.get("mon-auto-token"),
    statusOfAuto: formData.get("statusOfAuto"),
    anneeDeFabrication: new Date(
      formData.get("anneeDeFabrication") as string
    ).toISOString(),
    lastMaintenanceDate: formData.get("lastMaintenanceDate")
      ? new Date(formData.get("lastMaintenanceDate") as string).toISOString()
      : "",
    dateOfModified: new Date().toISOString(),
    dateOfCreated: new Date(formData.get("dateOfCreated") as string),
    descriptionAuto: formData.get("descriptionAuto"),
    climatisation: formData.get("climatisation"),
  };

  try {
    const response = await axios.put(`${baseUrl}/updateAuto`, rawData, {
      headers: {
        Authorization: `Bearer ${formData.get("mon-auto-token")}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return { success: true, data: response.data, error: null, token: null };
    } else {
      throw new Error("problème de connexion");
    }
  } catch (error) {
    let myError = "";
    console.error("Erreur lors de l'inscription:", error);
    if (axios.isAxiosError(error)) {
      // Axios error (network or HTTP)
      if (error.response) {
        // Handle specific status codes
        if (error.response.status === 401) {
          // Handle unauthorized (e.g., refresh token or redirect to login)
          try {
            const response = await axios.get(`${baseUrl}/refreshToken`, {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            });

            rawData.userToken = response.data["access-token"];

            const response2 = await axios.put(
              `${baseUrl}/updateAuto`,
              rawData,
              {
                headers: {
                  Authorization: `Bearer ${response.data["access-token"]}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (response2.status === 200) {
              return {
                success: true,
                data: response2.data,
                error: null,
                token: response.data,
              };
            } else {
              redirect("/seller-login");
            }
          } catch (error) {
            console.log(error);
            redirect("/seller-login");
          }
        }
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
        myError = error.message;
      } else {
        // Something happened in setting up the request
        console.error("Request setup error:", error.message);
        myError = error.message;
      }
    } else {
      // Non-Axios error (e.g., in your code)
      console.error("Unexpected error:", error);
      myError = "Une erreur est survenue vérifié votre connexion";
    }
    throw new Error(myError);
  }
};

export async function getsearchAutoData(url: string): Promise<any> {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function sendContact(formData: FormData) {
  const data = {
    email: formData.get("email"),
    nom: formData.get("nom"),
    prenom: formData.get("prenom"),
    telephone: formData.get("telephone"),
    message: formData.get("message"),
  };

  try {
    const response = await axios.post(`${baseUrl}/sendContact`, data);

    if (response.status === 200) {
      return { success: true, error: null };
    } else {
      throw new Error("problème de connexion");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Une erreur est survenue");
  }
}

export const getDataAsync = async (token: any) => {
  const senToken = JSON.parse(token);

  try {
    const response = await axios.get(`${baseUrl}/sellers`, {
      headers: {
        Authorization: `Bearer ${senToken["access-token"]}`,
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    const newAutos = data._embedded.sellers;

    if (response.status === 200) {
      return { success: true, data: newAutos, error: null, token: null };
    } else {
      throw new Error("problème de connexion");
    }
  } catch (error) {
    let myError = "";
    console.error("Erreur lors de l'inscription:", error);
    if (axios.isAxiosError(error)) {
      // Axios error (network or HTTP)
      if (error.response) {
        console.log({ statusError: error.response.status });
        // Server responded with error status (4xx, 5xx)
        console.error("Server responded with error:", {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });

        // Handle specific status codes
        if (error.response.status === 401) {
          // Handle unauthorized (e.g., refresh token or redirect to login)
          try {
            const response = await axios.get(`${baseUrl}/refreshToken`, {
              headers: {
                Authorization: `Bearer ${senToken["refresh-token"]}`,
              },
            });

            const response2 = await axios.get(`${baseUrl}/sellers`, {
              headers: {
                Authorization: `Bearer ${response.data["access-token"]}`,
                "Content-Type": "application/json",
              },
            });

            if (response2.status === 200) {
              const data = response2.data;

              const newAutos = data._embedded.sellers;

              return {
                success: true,
                data: newAutos,
                error: null,
                token: response.data,
              };
            } else {
              throw new Error("problème de connexion");
            }
          } catch (error) {
            console.log(error);
            redirect("/seller-login");
          }
        }
      } else if (error.request) {
        console.log(error);
        // Request was made but no response received
        console.error("No response received:", error.request);
        myError = error.message;
      } else {
        // Something happened in setting up the request
        console.error("Request setup error:", error.message);
        myError = error.message;
      }
    } else {
      // Non-Axios error (e.g., in your code)
      console.error("Unexpected error:", error);
      myError = "Une erreur est survenue vérifié votre connexion";
    }
    return { success: false, data: null, error: myError };
  }
};

export const getUserDataAsync = async (token: any, userId: string) => {
  const senToken = JSON.parse(token);

  try {
    const response = await axios.get(`${baseUrl}/sellers/${userId}/autos`, {
      headers: {
        Authorization: `Bearer ${senToken["access-token"]}`,
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    const newAutos = data._embedded.autos;

    if (response.status === 200) {
      return { success: true, data: newAutos, error: null, token: null };
    } else {
      throw new Error("problème de connexion");
    }
  } catch (error) {
    let myError = "";
    console.error("Erreur lors de l'inscription:", error);
    if (axios.isAxiosError(error)) {
      // Axios error (network or HTTP)
      if (error.response) {
        console.log({ statusError: error.response.status });
        // Server responded with error status (4xx, 5xx)
        console.error("Server responded with error:", {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });

        // Handle specific status codes
        if (error.response.status === 401) {
          // Handle unauthorized (e.g., refresh token or redirect to login)
          try {
            const response = await axios.get(`${baseUrl}/refreshToken`, {
              headers: {
                Authorization: `Bearer ${senToken["refresh-token"]}`,
              },
            });

            /*  const val = JSON.stringify(response.data);
                localStorage.setItem("mon-auto-token", val); */

            const response2 = await axios.get(
              `${baseUrl}/sellers/${userId}/autos`,
              {
                headers: {
                  Authorization: `Bearer ${response.data["access-token"]}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (response2.status === 200) {
              const data = response2.data;

              const newAutos = data._embedded.autos;

              return {
                success: true,
                data: newAutos,
                error: null,
                token: response.data,
              };
            } else {
              throw new Error("problème de connexion");
            }
          } catch (error) {
            console.log(error);
            redirect("/seller-login");
          }
        }
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
        myError = error.message;
      } else {
        // Something happened in setting up the request
        console.error("Request setup error:", error.message);
        myError = error.message;
      }
    } else {
      // Non-Axios error (e.g., in your code)
      console.error("Unexpected error:", error);
      myError = "Une erreur est survenue vérifié votre connexion";
    }
    return { success: false, data: null, error: myError };
  }
};

export const getAutoDataAsync = async (page: number) => {
  try {
    const response = await axios.get(`${baseUrl}/autos?page=${page}&size=20`);

    const data = response.data;

    const newAutos = data._embedded;
    const pageData = data.page;

    if (response.status === 200) {
      return {
        success: true,
        data: newAutos,
        error: null,
        page: pageData,
        token: null,
      };
    } else {
      throw new Error("problème de connexion");
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    throw error;
  }
};

export const getSingleAutoDataAsync = async (autoId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/autos/${autoId}`);

    const data = response.data;

    if (response.status === 200) {
      return {
        success: true,
        data: data as any,
        error: null,
      };
    } else {
      throw new Error("problème de connexion");
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    throw error;
  }
};

export const getImageAuto = async (autoId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/autos/${autoId}/imagesAuto`);

    const data = response.data._embedded.imageAutos.map((val: any) => {
      const myId = val._links.self.href as string;
      const dodo = myId.charAt(myId.length - 1);

      return { id: dodo, url: val.url };
    });

    if (response.status === 200) {
      return {
        success: true,
        data: data as any,
        error: null,
      };
    } else {
      throw new Error("problème de connexion");
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    throw error;
  }
};

/* 
"${baseUrl}/autos/2/imagesAuto"
*/

export const deleteSellerUser = async (id: string, token: any) => {
  try {
    const response = await axios.delete(`${baseUrl}/deleteUser/${id}`, {
      headers: {
        Authorization: `Bearer ${token["access-token"]}`,
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
      data: response.data,
      error: null,
      token: null,
    };
  } catch (error) {
    let myError = "";
    console.error("Erreur lors de l'inscription:", error);
    if (axios.isAxiosError(error)) {
      // Axios error (network or HTTP)
      if (error.response) {
        // Handle specific status codes
        if (error.response.status === 401) {
          try {
            const response = await axios.get(`${baseUrl}/refreshToken`, {
              headers: {
                Authorization: `Bearer ${token["refresh-token"]}`,
              },
            });
            const response2 = await axios.delete(
              `${baseUrl}/deleteUser/${id}`,

              {
                headers: {
                  Authorization: `Bearer ${response.data["access-token"]}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (response2.status === 200) {
              return {
                success: true,
                data: response2.data,
                error: null,
                token: response.data,
              };
            } else {
              redirect("/seller-login");
            }
          } catch (error) {
            console.log(error);
            redirect("/seller-login");
          }
        }
      } else if (error.request) {
        myError = error.message;
      } else {
        myError = error.message;
      }
    } else {
      myError = "Une erreur est survenue vérifié votre connexion";
    }
    throw new Error(myError);
  }
};

export const deleteImage = async (id: string, token: any) => {
  try {
    const response = await axios.delete(`${baseUrl}/deleteImageAuto/${id}`, {
      headers: {
        Authorization: `Bearer ${token["access-token"]}`,
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
      data: response.data,
      error: null,
      token: null,
    };
  } catch (error) {
    let myError = "";
    console.error("Erreur lors de l'inscription:", error);
    if (axios.isAxiosError(error)) {
      // Axios error (network or HTTP)
      if (error.response) {
        // Handle specific status codes
        if (error.response.status === 401) {
          // Handle unauthorized (e.g., refresh token or redirect to login)
          try {
            const response = await axios.get(`${baseUrl}/refreshToken`, {
              headers: {
                Authorization: `Bearer ${token["refresh-token"]}`,
              },
            });

            const response2 = await axios.delete(
              `${baseUrl}/deleteImagAuto/${id}`,

              {
                headers: {
                  Authorization: `Bearer ${response.data["access-token"]}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (response2.status === 200) {
              return {
                success: true,
                data: response2.data,
                error: null,
                token: response.data,
              };
            } else {
              redirect("/seller-login");
            }
          } catch (error) {
            console.log(error);
            redirect("/seller-login");
          }
        }
      } else if (error.request) {
        myError = error.message;
      } else {
        myError = error.message;
      }
    } else {
      myError = "Une erreur est survenue vérifié votre connexion";
    }
    throw new Error(myError);
  }
};

export const deleteSellerAuto = async (id: string, token: any) => {
  try {
    const response = await axios.delete(`${baseUrl}/deleteAuto/${id}`, {
      headers: {
        Authorization: `Bearer ${token["access-token"]}`,
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
      data: response.data,
      error: null,
      token: null,
    };
  } catch (error) {
    let myError = "";
    console.error("Erreur lors de l'inscription:", error);
    if (axios.isAxiosError(error)) {
      // Axios error (network or HTTP)
      if (error.response) {
        // Handle specific status codes
        if (error.response.status === 401) {
          try {
            const response = await axios.get(`${baseUrl}/refreshToken`, {
              headers: {
                Authorization: `Bearer ${token["refresh-token"]}`,
              },
            });
            const response2 = await axios.delete(
              `${baseUrl}/deleteAuto/${id}`,

              {
                headers: {
                  Authorization: `Bearer ${response.data["access-token"]}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (response2.status === 200) {
              return {
                success: true,
                data: response2.data,
                error: null,
                token: response.data,
              };
            } else {
              redirect("/seller-login");
            }
          } catch (error) {
            console.log(error);
            redirect("/seller-login");
          }
        }
      } else if (error.request) {
        myError = error.message;
      } else {
        myError = error.message;
      }
    } else {
      myError = "Une erreur est survenue vérifié votre connexion";
    }
    throw new Error(myError);
  }
};

export const getSingleUserDataAsync = async (autoId: string, token: any) => {
  try {
    const response = await axios.get(`${baseUrl}/sellers/${autoId}`, {
      headers: {
        Authorization: `Bearer ${token["access-token"]}`,
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    if (response.status === 200) {
      return {
        success: true,
        data: data as any,
        error: null,
      };
    } else {
      throw new Error("problème de connexion");
    }
  } catch (error) {
    let myError = "";
    console.error("Erreur lors de l'inscription:", error);
    if (axios.isAxiosError(error)) {
      // Axios error (network or HTTP)
      if (error.response) {
        // Handle specific status codes
        if (error.response.status === 401) {
          try {
            const response = await axios.get(`${baseUrl}/refreshToken`, {
              headers: {
                Authorization: `Bearer ${token["refresh-token"]}`,
              },
            });
            const response2 = await axios.delete(
              `${baseUrl}/seller/${autoId}`,

              {
                headers: {
                  Authorization: `Bearer ${response.data["access-token"]}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (response2.status === 200) {
              return {
                success: true,
                data: response2.data,
                error: null,
                token: response.data,
              };
            } else {
              redirect("/seller-login");
            }
          } catch (error) {
            console.log(error);
            redirect("/seller-login");
          }
        }
      } else if (error.request) {
        myError = error.message;
      } else {
        myError = error.message;
      }
    } else {
      myError = "Une erreur est survenue vérifié votre connexion";
    }
    throw new Error(myError);
  }
};

export const confirmAction = async (token: string) => {
  try {
    const response = await axios.get(`${baseUrl}/confirm?token=${token}`);

    return { status: response.status };
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async (token: any) => {
  try {
    const response = await axios.get(`${baseUrl}/refreshToken`, {
      headers: {
        Authorization: `Bearer ${token["refresh-token"]}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifiedToken = async (token: any) => {
  try {
    const response = await axios.get(
      `${baseUrl}/verified-token?token=${token}`
    );
    console.log(response.status);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    // redirect("/seller-login");
    throw error;
  }
};

export const deleteFile = async (token: any, fileName: string) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/deleteFile?fileName=${fileName}`,
      {
        headers: {
          Authorization: `Bearer ${token["access-token"]}`,
        },
      }
    );
    return { success: true, error: null, data: response.data, token: null };
  } catch (error) {
    let myError = "";

    if (axios.isAxiosError(error)) {
      // Axios error (network or HTTP)
      if (error.response) {
        // Handle specific status codes
        if (error.response.status === 401) {
          console.error("Erreur lors de l'inscription:");
          try {
            const response = await axios.get(`${baseUrl}/refreshToken`, {
              headers: {
                Authorization: `Bearer ${token["refresh-token"]}`,
              },
            });

            const response2 = await axios.delete(
              `${baseUrl}/deleteFile?fileName=${fileName}`,

              {
                headers: {
                  Authorization: `Bearer ${response.data["access-token"]}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (response2.status === 200) {
              return {
                success: true,
                data: response2.data,
                error: null,
                token: response.data,
              };
            } else {
              redirect("/seller-login");
            }
          } catch (error) {
            console.log(error);
            redirect("/seller-login");
          }
        }
      } else if (error.request) {
        myError = error.message;
      } else {
        myError = error.message;
      }
    } else {
      myError = "Une erreur est survenue vérifié votre connexion";
    }
    throw new Error(myError);
  }
};

export const uploadFile = async (token: any, formData: FormData) => {
  try {
    const response = await axios.post(`${baseUrl}/uploadFile`, formData, {
      headers: {
        Authorization: `Bearer ${token["access-token"]}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return { success: true, error: null, data: response.data, token: null };
  } catch (error) {
    let myError = "";
    console.log(error);
    if (axios.isAxiosError(error)) {
      // Axios error (network or HTTP)
      if (error.response) {
        // Handle specific status codes
        if (error.response.status === 401) {
          console.error("Erreur lors de l'inscription:");
          try {
            const response = await axios.get(`${baseUrl}/refreshToken`, {
              headers: {
                Authorization: `Bearer ${token["refresh-token"]}`,
              },
            });

            const response2 = await axios.post(
              `${baseUrl}/uploadFile`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${response.data["access-token"]}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log({ status: response2.status });
            if (response2.status === 200) {
              return {
                success: true,
                data: response2.data,
                error: null,
                token: response.data,
              };
            } else {
              redirect("/seller-login");
              //throw new Error("");
            }
          } catch (error) {
            console.log(error);
            redirect("/seller-login");
          }
        }
      } else if (error.request) {
        myError = error.message;
      } else {
        myError = error.message;
      }
    } else {
      myError = "Une erreur est survenue vérifié votre connexion";
    }
    throw new Error(myError);
  }
};

export const uploadMultipleFile = async (token: any, formData: FormData) => {
  try {
    const response = await axios.post(`${baseUrl}/upload-multiple`, formData, {
      headers: {
        Authorization: `Bearer ${token["access-token"]}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return { success: true, error: null, data: response.data, token: null };
  } catch (error) {
    let myError = "";

    if (axios.isAxiosError(error)) {
      // Axios error (network or HTTP)
      if (error.response) {
        // Handle specific status codes
        if (error.response.status === 401) {
          console.error("Erreur lors de l'inscription:");
          try {
            const response = await axios.get(`${baseUrl}/refreshToken`, {
              headers: {
                Authorization: `Bearer ${token["refresh-token"]}`,
              },
            });

            const response2 = await axios.post(
              `${baseUrl}/upload-multiple`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${response.data["access-token"]}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            if (response2.status === 200) {
              return {
                success: true,
                data: response2.data,
                error: null,
                token: response.data,
              };
            } else {
              redirect("/seller-login");
            }
          } catch (error) {
            console.log(error);
            redirect("/seller-login");
          }
        }
      } else if (error.request) {
        myError = error.message;
      } else {
        myError = error.message;
      }
    } else {
      myError = "Une erreur est survenue vérifié votre connexion";
    }
    throw new Error(myError);
  }
};
