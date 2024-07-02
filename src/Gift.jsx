import React, { useState } from "react";
import "./Gift.css";

function Gift() {
  const pixKey =
    "00020101021126360014br.gov.bcb.pix0114+55119521841975204000053039865802BR5917LUCAS SILVESTRINI6006OSASCO62070503***63048E79";
  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixKey).then(() => {
      setCopySuccess("Pix Copia e Cola => Copiado :D");
      setTimeout(() => setCopySuccess(""), 10000);
    });
  };

  return (
    <div className="gift-container">
      <h1>Enviar um presente para o Lucão</h1>
      {copySuccess && <div className="copy-success">{copySuccess}</div>}
      <div className="gift-item">
        <span role="img" aria-label="emoji" className="emoji-size">
          🍺
        </span>{" "}
        Hoegaarden R$10,00
        <button onClick={copyToClipboard} className="copy-pix-button">
          Copiar PIX
        </button>
      </div>
      <div className="gift-item">
        <span role="img" aria-label="emoji" className="emoji-size">
          🍫
        </span>{" "}
        Lindt R$20,00
        <button onClick={copyToClipboard} className="copy-pix-button">
          Copiar PIX
        </button>
      </div>
      <div className="gift-item">
        <span role="img" aria-label="emoji" className="emoji-size">
          🍔
        </span>{" "}
        Hamburguinho R$30,00
        <button onClick={copyToClipboard} className="copy-pix-button">
          Copiar PIX
        </button>
      </div>
      <div className="gift-item">
        <span role="img" aria-label="emoji" className="emoji-size">
          🎁
        </span>{" "}
        Um Presentão R$50,00
        <button onClick={copyToClipboard} className="copy-pix-button">
          Copiar PIX
        </button>
      </div>
    </div>
  );
}

export default Gift;
