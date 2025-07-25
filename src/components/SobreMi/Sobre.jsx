import React from "react";
import "./Sobre.css";

const Sobre = () => {
  return (
    <div className="w-screen mx-auto h-auto overflow-hidden">
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
            <h2 className="font-serif text-2xl md:mt-2 italic self-center text-primary">
              Nuestra Historia
            </h2>
            <div className="pt-1 px4 bg-tertiary mb-4"></div>
          
            <h1 className="text-gray-700 mb-4">
              Desde <strong>1980</strong>, en <strong>Mar del Plata</strong>, <strong>Repuestos Caviglia</strong> ofrece soluciones en <strong>repuestos para camiones Fiat</strong>, <strong>IVECO</strong> y maquinaria pesada. Comenzamos como un pequeño negocio familiar.
            </h1>
          
            <p className="text-gray-700 mb-4">
              Nos especializamos en <strong>repuestos originales y alternativos</strong> para las marcas <strong>Iveco</strong> y <strong>Fiat</strong>, con un amplio stock permanente, atención técnica personalizada y asesoramiento profesional.
            </p>
          
            <p className="text-gray-700 mb-4">
              Con más de <strong>45 años de trayectoria</strong>, construimos una sólida relación de confianza con nuestros clientes del sector del <strong>transporte pesado</strong>, ofreciendo envíos a todo el país y soluciones rápidas y eficaces.
            </p>
          
            <p className="text-gray-700">
              Hoy nos encontramos en <strong>Av. Champagnat 1167</strong>, Mar del Plata, donde continuamos con la misma pasión de siempre, comprometidos con la calidad, la atención personalizada y el respaldo que el rubro exige.
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
