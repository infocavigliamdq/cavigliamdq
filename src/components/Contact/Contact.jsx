'use client';
import React, { useState } from 'react';
import { PhoneIcon, DevicePhoneMobileIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import userData from '../../app/constants/userData';
import { SectionTitle } from '../ui/SectionTitle';
import ContactFormModal from './ContactFormModal';

const InstagramIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
      clipRule="evenodd"
    />
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
      clipRule="evenodd"
    />
  </svg>
);

const iconClass = 'w-8 h-8 md:w-9 md:h-9 shrink-0 text-gray-900';
const itemClass =
  'flex items-center gap-4 text-lg md:text-2xl text-gray-900 hover:text-boton-primary transition-colors';

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="contacto" className="bg-primary-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <SectionTitle>Contacto</SectionTitle>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 grid md:grid-cols-2 gap-y-10 md:gap-x-12 items-center">
        {/* COLUMNA IZQUIERDA: datos de contacto */}
        <article>
          <ul className="space-y-6 md:space-y-8">
            <li>
              <a
                href={userData.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className={itemClass}
              >
                <InstagramIcon className={iconClass} />
                <span>{userData.instagram.usuario}</span>
              </a>
            </li>

            <li>
              <a
                href={userData.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className={itemClass}
              >
                <FacebookIcon className={iconClass} />
                <span>{userData.facebook.usuario}</span>
              </a>
            </li>

            <li>
              <a href={`tel:+${userData.codigoPais}${userData.telFijo}`} title="Teléfono fijo" className={itemClass}>
                <PhoneIcon className={iconClass} />
                <span>4701233</span>
              </a>
            </li>

            <li>
              <a href={`tel:+${userData.codigoPais}${userData.contact}`} title="Celular" className={itemClass}>
                <DevicePhoneMobileIcon className={iconClass} />
                <span>{userData.contact}</span>
              </a>
            </li>

            <li>
              <button type="button" onClick={() => setIsModalOpen(true)} className={itemClass} aria-label="abrir formulario de consulta">
                <EnvelopeIcon className={iconClass} />
                <span>Envianos tu consulta</span>
              </button>
            </li>
          </ul>
        </article>

        {/* COLUMNA DERECHA: mapa + horarios */}
        <article className="w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3145.026565567246!2d-57.58252812336558!3d-37.976509343357975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584d9147152be51%3A0xbb84e08715f0b6ec!2sCaviglia%20repuestos!5e0!3m2!1ses!2sar!4v1752512005583!5m2!1ses!2sar"
            height="320"
            allowFullScreen={true}
            className="w-full rounded-lg border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación del local"
          />
          <div className="mt-4 text-center text-lg md:text-xl text-gray-900">
            {userData.horariosDetalle.map((horario) => (
              <p key={horario}>{horario}</p>
            ))}
          </div>
        </article>
      </div>

      <ContactFormModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
