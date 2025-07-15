/* eslint-disable react/prop-types */
'use client'
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import userData from "../../app/constants/userData";

// userData.js (estructura sugerida)
/*
const userData = {
  administracion: {
    label: 'Administración',
    contacto: 2235032141,
    codigoPais: 54,
    textoPredefinido: 'Hola, me gustaría contactar con administración.'
  },
  ventas: {
    label: 'Ventas',
    contacto: 2231234567,
    codigoPais: 54,
    textoPredefinido: 'Hola, me interesa saber más sobre productos o servicios.'
  }
};

export default userData;
*/

const BotonWsp = () => {
  const [isHovered, setIsHovered] = useState(false);

  const generarLink = (contacto, codigoPais, texto) =>
    `https://wa.me/+${codigoPais}${contacto}?text=${encodeURIComponent(texto)}`;

  return (
    <article
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="flex flex-col gap-2 mb-2 animate-fade-in">
          <a
            href={generarLink(
              userData.administracion.contacto,
              userData.administracion.codigoPais,
              userData.administracion.textoPredefinido
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-green-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-700 transition">
              {userData.administracion.label}
            </button>
          </a>
          <a
            href={generarLink(
              userData.ventas.contacto,
              userData.ventas.codigoPais,
              userData.ventas.textoPredefinido
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-green-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-700 transition">
              {userData.ventas.label}
            </button>
          </a>
        </div>
      )}

      <button
        className="flex items-center justify-center bg-green-500 text-white font-bold p-4 rounded-full shadow-lg hover:bg-green-600 transition"
        aria-label="Contacto por WhatsApp"
      >
        <FaWhatsapp className="text-white text-3xl" />
      </button>
    </article>
  );
};

export default BotonWsp;
