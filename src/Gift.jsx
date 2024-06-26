import React from "react";
import "./Gift.css";

function Gift() {
  const pixKey =
    "your-pix-key-here00020101021126360014br.gov.bcb.pix0114+55119521841975204000053039865802BR5917LUCAS SILVESTRINI6006OSASCO62070503***63048E79";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixKey).then(() => {
      alert("PIX copiado!");
    });
  };

  return (
    <div className="gift-container">
      <h1>Enviar um presente para o Lucão</h1>
      <div className="gift-item">
        <span role="img" aria-label="emoji">
          🍺
        </span>{" "}
        Uma Hoegaarden R$10,00
        <button onClick={copyToClipboard} className="copy-pix-button">
          Copiar PIX
        </button>
      </div>
      <div className="gift-item">
        <span role="img" aria-label="emoji">
          🍫
        </span>{" "}
        Um Lindt R$20,00
        <button onClick={copyToClipboard} className="copy-pix-button">
          Copiar PIX
        </button>
      </div>
      <div className="gift-item">
        <span role="img" aria-label="emoji">
          🍔
        </span>{" "}
        Um hamburguinho R$30,00
        <button onClick={copyToClipboard} className="copy-pix-button">
          Copiar PIX
        </button>
      </div>
      <div className="gift-item">
        <span role="img" aria-label="emoji">
          🎁
        </span>{" "}
        Um presentão R$50,00
        <button onClick={copyToClipboard} className="copy-pix-button">
          Copiar PIX
        </button>
      </div>
    </div>
  );
}

export default Gift;
