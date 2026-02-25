import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function CtaBanner() {
  return (
    <section className="relative py-12 overflow-hidden">
      <div className="absolute inset-0">
        {/* <Image
          src="/images/suspension-parts.png"
          alt="Repuestos de alta calidad"
          fill
          className="object-cover opacity-20"
        /> */}
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/95 to-background/80" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mt-4 text-3xl sm:text-5xl font-bold text-foreground drop-shadow-lg tracking-tight font-mono text-balance">
            Encontra tu repuesto en <span className="text-secondary-active drop-shadow-lg shadow-primary">MercadoLibre</span>
          </h2>
        <div className="max-w-2xl">
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Compralo con envio gratis, cuotas sin interes y la garantia de
            compra protegida de MercadoLibre. Todos nuestros productos disponibles
            las 24hs.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.mercadolibre.com.ar/pagina/sebastiancaviglia#from=share_eshop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-secondary text-primary-foreground px-8 py-4 rounded-lg hover:shadow-lg hover:translate-y-2 text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
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
