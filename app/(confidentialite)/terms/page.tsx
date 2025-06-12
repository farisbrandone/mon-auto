"use client";

import React from "react";
import { Helmet } from "react-helmet";
export default function page() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>Conditions d'Utilisation - Site Auto</title>
        <meta
          name="description"
          content="Conditions générales d'utilisation de notre plateforme de publication d'annonces automobiles"
        />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">
        Conditions Générales d'Utilisation
      </h1>
      <p className="mb-4 text-gray-600">
        Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          1. Acceptation des Conditions
        </h2>
        <p className="mb-4">
          En utilisant notre plateforme de publication d'annonces automobiles
          ("auto-occaz.com"), vous acceptez pleinement et sans réserve les
          présentes Conditions Générales d'Utilisation ("CGU").
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          2. Description du Service
        </h2>
        <p className="mb-4">
          Notre Site met en relation des vendeurs et des acheteurs de véhicules
          automobiles. Nous fournissons une plateforme technique permettant la
          publication, la consultation et la gestion d'annonces, mais nous ne
          sommes pas partie aux transactions effectuées entre utilisateurs.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          3. Responsabilité Limitée
        </h2>
        <p className="mb-4 font-bold text-red-600">
          IMPORTANT : Le Site agit uniquement en tant qu'intermédiaire technique
          et n'intervient pas dans les transactions entre utilisateurs. Par
          conséquent, le Site décline toute responsabilité concernant :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>
            L'exactitude, la véracité ou la complétude des annonces publiées par
            les utilisateurs
          </li>
          <li>
            La qualité, la sécurité ou la conformité légale des véhicules
            annoncés
          </li>
          <li>
            Les éventuelles arnaques, fraudes ou pratiques commerciales
            trompeuses
          </li>
          <li>Les litiges entre acheteurs et vendeurs</li>
        </ul>
        <p className="mb-4">
          Les utilisateurs sont seuls responsables de leurs interactions et
          transactions. Nous vous recommandons vivement de prendre toutes les
          précautions nécessaires avant tout achat (vérification du véhicule,
          demande de documents, paiement sécurisé, etc.).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          4. Obligations des Utilisateurs
        </h2>
        <p className="mb-4">En utilisant le Site, vous vous engagez à :</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Fournir des informations exactes et à jour</li>
          <li>Ne pas publier de contenu trompeur, frauduleux ou illégal</li>
          <li>Respecter les lois et réglementations en vigueur</li>
          <li>Ne pas utiliser le Site à des fins illicites</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          5. Signalement d'Annonces Suspectes
        </h2>
        <p className="mb-4">
          Si vous identifiez une annonce suspecte ou une potentielle arnaque,
          merci de la signaler immédiatement via notre système de signalement.
          Nous examinerons le contenu et prendrons les mesures appropriées, sans
          que cela n'engage notre responsabilité.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          6. Modifications des CGU
        </h2>
        <p className="mb-4">
          Nous nous réservons le droit de modifier les présentes CGU à tout
          moment. Les modifications prendront effet dès leur publication sur le
          Site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
        <p className="mb-4">
          Pour toute question concernant les présentes Conditions Générales
          d'Utilisation, vous pouvez nous contacter à l'adresse suivante :
          f.pamod@outlook.com
        </p>
      </section>
    </div>
  );
}
