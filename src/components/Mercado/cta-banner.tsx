import { ArrowRight } from "lucide-react"
import { MapPinIcon, BoltIcon, ShieldCheckIcon } from "@heroicons/react/24/outline"
import { SectionTitle } from "../ui/SectionTitle"

const beneficios = [
  { icon: MapPinIcon, texto: "Envíos a todo el país" },
  { icon: BoltIcon, texto: "Entrega rápida" },
  { icon: ShieldCheckIcon, texto: "Compra segura" },
]

export function CtaBanner() {
  return (
    <section className="relative py-12 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle>Comprá fácil, rápido y desde donde estés</SectionTitle>

        {/* Frase en un solo renglon en desktop; en mobile se permite el salto */}
        {/* Mobile */}
        <div className="flex flex-col items-center text-lg text-gray-900 text-center md:hidden">
          <span>
            Ahora también podés encontrarnos en la plataforma más elegida para comprar online.
          </span>

          <img
            src="/logos/ML.png"
            alt="MercadoLibre"
            loading="lazy"
            className="w-[180px] h-auto object-contain mt-2"
          />
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-x-2 text-xl text-gray-900">
          <span className="whitespace-nowrap">
            Ahora también podés encontrarnos en
          </span>

          <img
            src="/logos/ML.png"
            alt="MercadoLibre"
            loading="lazy"
            className="w-[200px] h-auto object-contain shrink-0"
          />

          <span className="whitespace-nowrap">
            la plataforma más elegida para comprar online.
          </span>
        </div>

        <div className="max-w-3xl">
          <ul className="mt-8 space-y-3">
            {beneficios.map(({ icon: Icon, texto }) => (
              <li key={texto} className="flex items-center gap-3 text-lg md:text-xl text-gray-900">
                <Icon className="w-6 h-6 shrink-0 text-boton-primary" />
                <span>{texto}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <a
              href="https://www.mercadolibre.com.ar/pagina/sebastiancaviglia#from=share_eshop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-secondary text-white px-8 py-4 rounded-lg hover:shadow-lg text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Ir a MercadoLibre
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
