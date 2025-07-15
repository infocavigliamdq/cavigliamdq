import React from "react";
import "./Sobre.css";

const Sobre = () => {
  return (
    <div className="w-screen h-auto overflow-hidden">
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-center items-center  place-items-center mb-4">
        <h2 className='text-pink font-normal tracking-widest uppercase ls-51 mb-4 text-3xl md:text-4xl text-center text-tertiary'>nuestra hiostoria</h2>
        <div className="px-10 py-1 mb-4 text-center place-items-center bg-tertiary uppercase w-1/4"></div>
      </div> */}
      <section className="relative w-full h-full flex flex-col lg:flex-row">
        {/* IMAGE for mobile view (visible only in mobile) */}
        <div className="w-full h-64 lg:hidden">
          <img
            src='/images/cavigliaPortada.webp'
            alt='foto del frente del local'
            title='foto del frente del local'
            className="w-full h-full object-cover"
          />
        </div>

        {/* TEXT SECTION */}
        <div className="w-full lg:w-1/2 flex items-center lg:items-start justify-center p-8 lg:py-1 lg:px-8 bg-white z-10">
          <div className="max-w-xl">

            <p className="text-gray-700 mb-4">
              Fundada en <strong>1979</strong> en Mar del Plata, <strong>Repuestos Caviglia</strong> ha sido sinónimo de calidad y compromiso en el rubro de repuestos para camiones y maquinaria pesada.
            </p>
            <p className="text-gray-700 mb-4">
              Nos especializamos principalmente en las marcas <strong>Iveco</strong> y <strong>Fiat</strong>, ofreciendo repuestos originales y alternativos con un amplio stock y asesoramiento técnico personalizado.
            </p>
            <p className="text-gray-700 mb-4">
              A lo largo de más de <strong>40 años</strong>, construimos una relación de confianza con nuestros clientes, brindando atención experta, envíos a todo el país y soluciones concretas para el transporte pesado.
            </p>
            <p className="text-gray-700">
              Actualmente, estamos ubicados en <strong>Av. Champagnat 1167</strong>, Mar del Plata, y seguimos trabajando con la misma pasión de siempre, acompañando al sector en cada kilómetro.
            </p>
          </div>
        </div>

        {/* IMAGE with diagonal for md+ screens only */}
        <div className="hidden lg:block w-1/2 relative">
          <div className="w-full h-96 diagonal-clip">
            <img
              src='/images/cavigliaPortada.webp'
              alt='foto del frente del local'
              title='foto del frente del local'
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sobre;
