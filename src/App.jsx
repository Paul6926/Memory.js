import React, { useState } from "react";
import "./App.css";

const lettres = ["A", "B", "C", "D", "E", "F", "G", "H","J", "K"];

function melangerCartes() {
  const cartesDouble = [...lettres, ...lettres];

  return cartesDouble
    .sort(() => Math.random() - 0.5)
    .map((valeur, index) => ({
      id: index,
      valeur: valeur,
      retournee: false,
      trouvee: false,
    }));
}

function Memory() {
  const [cartes, setCartes] = useState(melangerCartes());
  const [premiereCarte, setPremiereCarte] = useState(null);
  const [blocage, setBlocage] = useState(false);

  const gererClic = (carte) => {
    if (blocage || carte.retournee || carte.trouvee) return;

    // Retourner la carte
    const nouvellesCartes = cartes.map((c) =>
      c.id === carte.id ? { ...c, retournee: true } : c
    );

    setCartes(nouvellesCartes);

    // Première carte sélectionnée
    if (!premiereCarte) {
      setPremiereCarte(carte);
      return;
    }

    // Comparaison
    if (premiereCarte.valeur === carte.valeur) {
      setCartes((prev) =>
        prev.map((c) =>
          c.valeur === carte.valeur ? { ...c, trouvee: true } : c
        )
      );
      setPremiereCarte(null);
    } else {
      setBlocage(true);

      setTimeout(() => {
        setCartes((prev) =>
          prev.map((c) =>
            c.id === carte.id || c.id === premiereCarte.id
              ? { ...c, retournee: false }
              : c
          )
        );

        setPremiereCarte(null);
        setBlocage(false);
      }, 1000);
    }
  };

  return (
    <div className="memory-container">
      <h1>Jeu de Memory</h1>

      <div className="memory-grid">
        {cartes.map((carte) => (
          <div
            key={carte.id}
            className={`memory-card 
              ${carte.retournee ? "retournee" : ""} 
              ${carte.trouvee ? "trouvee" : ""}`}
            onClick={() => gererClic(carte)}
          >
            {carte.retournee || carte.trouvee ? carte.valeur : "?"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Memory;

