import React from 'react';
import { cn } from '../../Utils/utils';

type SectionTitleProps = {
  /** Texto del titulo */
  children: React.ReactNode;
  /** Alineacion del bloque. Por defecto a la izquierda. */
  align?: 'left' | 'center';
  /** Etiqueta a renderizar (h2 por defecto, h1 si es el titulo principal de la pagina) */
  as?: 'h1' | 'h2' | 'h3';
  /** Clases extra para el contenedor */
  className?: string;
};

/**
 * Titulo de seccion unificado para todo el sitio:
 * bold, mayuscula, sans-serif, azul de marca y barra roja debajo.
 *
 * Para cambiar el look de TODOS los titulos del sitio, editar solo este archivo.
 */
export function SectionTitle({
  children,
  align = 'left',
  as: Tag = 'h2',
  className,
}: SectionTitleProps) {
  const isCenter = align === 'center';

  return (
    <div className={cn(isCenter ? 'text-center' : 'text-left', className)}>
      <Tag className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-boton-primary">
        {children}
      </Tag>
      <div
        className={cn(
          'h-[3px] w-full max-w-sm md:max-w-md bg-tertiary mt-2 mb-6',
          isCenter && 'mx-auto'
        )}
      />
    </div>
  );
}

export default SectionTitle;
