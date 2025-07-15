'use client'
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import UploadImage from "../UploadImage";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading";

export default function VerProduct({
  isOpenModal,
  toggleModal,
  product,
  categoria,
  marca,
  vehiculo,
}) {
  const [isDropdownMarcaOpen, setIsDropdownMarcaOpen] = useState(false);
  const [isDropdownCategoriaOpen, setIsDropdownCategoriaOpen] = useState(false);
  const [isDropdownVehiculoOpen, setIsDropdownVehiculoOpen] = useState(false);
  const [marcas, setMarcas] = useState(marca);
  const [categorias, setCategorias] = useState(categoria);
  const [vehiculos, setVehiculos] = useState(vehiculo);

  //('productoSeleccionado:',product)
  // Estado para mantener las imágenes originales
  const [originalImages, setOriginalImages] = useState({
    foto_1_1: product.foto_1_1 || "",
    foto_1_2: product.foto_1_2 || "",
    foto_1_3: product.foto_1_3 || "",
    foto_1_4: product.foto_1_4 || "",
  });

  const [producto, setProducto] = useState({
    _id: product._id,
    n_producto: product.n_producto,
    cod_producto: product.cod_producto,
    marca: product.marca || 'Generico',
    vehiculo: product.vehiculo,
    categoria: product.categoria,
    nombre: product.nombre,
    modelo: product.modelo,
    n_serie: product.n_serie || "",
    titulo_de_producto: product.titulo_de_producto || "",
    precio:product.precio||'',
    descripcion: product.descripcion || "",
    n_electronica: product.n_electronica || '',
    medidas: product.medidas || '',
    foto_1_1: product.foto_1_1 || "",
    foto_1_2: product.foto_1_2 || "",
    foto_1_3: product.foto_1_3 || "",
    foto_1_4: product.foto_1_4 || "",
    destacados: product.destacados ?? false, // Asegura que siempre tenga un valor booleano
});


  const marcaDropdownRef = useRef(null);
  const categoriaDropdownRef = useRef(null);
  const vehiculoDropdownRef = useRef(null);

  // Efecto para manejar clics fuera de los dropdowns y cerrarlos si es necesario
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Función para manejar clics fuera de los dropdowns y cerrarlos
  const handleClickOutside = (event) => {
    if (marcaDropdownRef.current && !marcaDropdownRef.current.contains(event.target)) {
      setIsDropdownMarcaOpen(false);
    }
    if (categoriaDropdownRef.current && !categoriaDropdownRef.current.contains(event.target)) {
      setIsDropdownCategoriaOpen(false);
    }
    if ( vehiculoDropdownRef.current &&!vehiculoDropdownRef.current.contains(event.target)) {
      setIsDropdownVehiculoOpen(false);
    }
  };

  // Función para manejar cambios en los inputs del formulario del producto
  const handleChangeInput = (e) => {
    const { name, value, type, checked } = e.target;
    //console.log('valor:',name,value)
    setProducto((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
      titulo_de_producto:`${producto.nombre} ${producto.marca} para ${producto.vehiculo}`
    }));
};


  // Función para alternar la visibilidad del dropdown de marca
  const toggleMarca = (e) => {
    e.preventDefault();
    setIsDropdownMarcaOpen(!isDropdownMarcaOpen);
  };

  // Función para alternar la visibilidad del dropdown de categoría
  const toggleCategoria = (e) => {
    e.preventDefault();
    setIsDropdownCategoriaOpen(!isDropdownCategoriaOpen);
  };
  
  // Función para alternar la visibilidad del dropdown de categoría
  const toggleVehiculo = (e) => {
    e.preventDefault();
    setIsDropdownVehiculoOpen(!isDropdownVehiculoOpen);
  };
  

  // Función para agregar una nueva marca a la lista de marcas disponibles
  const handleAgregarNuevaMarca = (campo, valorNuevo) => {
    //console.log('valor nuevo:', valorNuevo)
    setMarcas([...marcas, { brand: valorNuevo }]);
    setIsDropdownMarcaOpen(false);
  };
  
  // Función para agregar una nueva marca a la lista de marcas disponibles
  const handleAgregarNuevoVehiculo = (campo, valorNuevo) => {
    setVehiculos([...vehiculo, { vehiculo: valorNuevo }]);
    setIsDropdownVehiculoOpen(false);
  };

  // Función para agregar una nueva categoría a la lista de categorías disponibles
  const handleAgregarNuevaCategoria = (campo, valorNuevo) => {
    setCategorias([...categorias, { category: valorNuevo }]);
    setIsDropdownCategoriaOpen(false);
  };

  // Función para actualizar las imágenes del producto
  const handleVerImages = (newImages) => {
    setProducto((prevState) => ({
      ...prevState,
      foto_1_1: newImages[0]?.preview || "",
      foto_1_2: newImages[1]?.preview || "",
      foto_1_3: newImages[2]?.preview || "",
      foto_1_4: newImages[3]?.preview || "",
    }));
  };

  // Función para eliminar una imagen específica del producto
  const handleRemoveImage = (index) => {
    setProducto((prevState) => {
      const updatedState = { ...prevState };
      switch (index) {
        case 0:
          updatedState.foto_1_1 = "";
          break;
        case 1:
          updatedState.foto_1_2 = "";
          break;
        case 2:
          updatedState.foto_1_3 = "";
          break;
        case 3:
          updatedState.foto_1_4 = "";
          break;
        default:
          break;
      }
      return updatedState;
    });
  };

  // Función para verificar si ha habido cambios en las imágenes
  const hasImageChanges = () => {
    return (
      producto.foto_1_1 !== originalImages.foto_1_1 ||
      producto.foto_1_2 !== originalImages.foto_1_2 ||
      producto.foto_1_3 !== originalImages.foto_1_3 ||
      producto.foto_1_4 !== originalImages.foto_1_4
    );
  };

  // Función para manejar el cierre del modal
  const handleToggleModal = () => {
    if (hasImageChanges()) {
      // Mostrar alerta si hay cambios no guardados
      Swal.fire({
        icon:'warning',
        title:'Debe guardar los cambios antes de cerrar.',
        showCancelButton:false,})
    } else {
      // Cerrar modal si no hay cambios
      toggleModal();
    }
  };

 // esto es para incorporar el spinner dentro del sweetAlert
  const loadingElement = document.createElement('div');
  const root = ReactDOM.createRoot(loadingElement);
  const container = document.createElement('div');
  root.render(<Loading />);
  container.innerHTML = `<h2><strong>AGUARDE</strong></h2><br/><p> se está actualizando la información del producto</p>`;
  container.appendChild(loadingElement);

  // Función para enviar el formulario actualizado del producto
  const submitVerProduct = async (e) => {
    e.preventDefault();
    // Validación básica del campo nombre
    if (!producto.nombre.trim()) {
      alert("Por favor ingrese un nombre para el producto.");
      return;
    }

    // Filtrar solo las propiedades que no están vacías o que tienen algún valor
    const filteredProducto = {};
    Object.keys(producto).forEach((key) => {
      if (producto[key] !== undefined && producto[key] !== null && (typeof producto[key] === "boolean" || producto[key] !== "")) {
        filteredProducto[key] = producto[key];
      }
    });
    

    // Crear FormData y agregar propiedades del producto filtrado
    const formData = new FormData();
    Object.keys(filteredProducto).forEach((key) => {
      formData.append(key, filteredProducto[key]);
    });
    //console.log('productoSubmit:',producto);
    
    try {
      // Mostrar SweetAlert con loading
      Swal.fire({
       title: 'Guardando cambios...',
       allowOutsideClick: false,
       didOpen: () => {
         Swal.showLoading();
       },
     });
      //console.log("Producto a enviar:", filteredProducto);
      const res = await fetch("api/updateProduct", {
      method: "PUT",
      body: formData,
    });
    const data = await res.json();

    // Cerrar SweetAlert al completar la solicitud
    Swal.fire({
      icon: 'success',
      title: 'Cambios guardados',
      showConfirmButton: false,
      timer: 1500 // Tiempo en milisegundos para cerrar automáticamente
    });

    toggleModal(); // Cerrar modal de edición

    // Manejar la respuesta si es necesario
    //console.log(data, "dataaaaaa");
  } catch (error) {
    // Cerrar SweetAlert en caso de error
    Swal.fire({
      icon: 'error',
      title: 'Error al guardar cambios',
      text: 'Por favor, inténtelo de nuevo más tarde.',
    });
    toggleModal(); // Cerrar modal de edición
  }
};

  // Filtrar las imágenes que existen para pasarle a UploadImage
  const imagenes = [
    producto.foto_1_1,
    producto.foto_1_2,
    producto.foto_1_3,
    producto.foto_1_4,
  ].filter(Boolean);

  return (
    <div>
      <div id="verProductModal" tabIndex="-1" aria-hidden="true" className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 overflow-hidden ${
          isOpenModal ? "" : "hidden" }`}>
        <div className="rounded-none max-w-3xl w-full max-h-full overflow-y-auto">
          <div className="relative p-4 bg-white shadow-sm">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
              <h3 className="text-lg font-semibold text-gray-900">Editar Producto</h3>
              <button type="button" onClick={handleToggleModal} // Utilizamos la función para manejar el cierre del modal
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="verProductModal" aria-label="editar producto">
                <svg aria-hidden="true" className="w-5 h-5" width={20} height={20} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            <form id='formVerProduct' onSubmit={submitVerProduct}>
               <div className="grid gap-4 mb-4 sm:grid-cols-2">       
              {/* Nombre */}
                <div>
                  <label htmlFor="nombreVer" className="block mb-2 text-sm font-medium text-gray-900" >Nombre<span className='text-red-500'>*</span></label>
                  <div className="flex">
                    <input readOnly onChange={handleChangeInput} type="text" name="nombre" id="nombreVer" value={producto.nombre} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Nombre del producto"/>
                    {producto.destacados
                      ?<img src="/images/FotoDestacados.webp" alt={producto.nombre} width={30} height={20} className="m-1" loading='lazy' title={producto.nombre}/>
                      :null}
                  </div>
                </div>

                {/* Marca */}
                <div>
                  <label htmlFor="marcaVer" className="block mb-2 text-sm font-medium text-gray-900">Marca<span className='text-red-500'>*</span></label>

                  <div className="flex gap-4">
                    <select readOnly onChange={handleChangeInput} name="marca" id="marcaVer" value={producto.marca} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" >
                      {marcas.map((marca, index) => (
                        <option key={index} value={marca.brand} disabled>
                          {marca.brand}
                        </option>
                      ))}
                    </select>

                    <div className="relative" ref={marcaDropdownRef}>
                      <button disabled
                      aria-label="seleccionar marca"
                        className="text-gray-800 bg-gray-50 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm ml-auto inline-flex items-center w-auto h-full p-3"
                        onClick={toggleMarca}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") toggleMarca(e);
                        }}
                        tabIndex="0"
                      >
                        <FaPlus />
                      </button>

                      {isDropdownMarcaOpen && (
                        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
                          <div className="block w-full px-2 py-2 text-left text-gray-700">
                            <input
                            disabled
                              type="text"
                              readOnly
                              name="marcaNueva"
                              id="marcaNueva"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-1"
                              placeholder="Ingrese una marca nueva"
                              onClick={(e) => e.stopPropagation()}
                              onKeyDown={(e) => {
                                if (e.key === "Enter")
                                  handleAgregarNuevaMarca(
                                    "marca",
                                    e.target.value
                                  );
                              }}
                            />

                            <button disabled
                            aria-label="agregar nueva marca"
                              onClick={() =>
                                handleAgregarNuevaMarca(
                                  "marca",
                                  document.getElementById("marcaNueva").value
                                )
                              }
                              className="w-full rounded-lg m-auto px-4 py-2 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-500 focus:outline-none focus:ring-4"
                            >
                              AGREGAR
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Categoría */}
                <div>
                  <label
                    htmlFor="categoriaVer"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Categoría<span className='text-red-500'>*</span>
                  </label>

                  <div className="flex gap-4">
                    <select
                    readOnly
                      onChange={handleChangeInput}
                      name="categoria"
                      id="categoriaVer"
                      value={producto.categoria}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    >
                      {categorias.map((categoria, index) => (
                        <option key={index} value={categoria.category} disabled>
                          {categoria.category}
                        </option>
                      ))}
                    </select>

                    <div className="relative" ref={categoriaDropdownRef}>
                      <button disabled
                      aria-label="seleccionar categoria"
                        className="text-gray-800 bg-gray-50 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm ml-auto inline-flex items-center w-auto h-full p-3"
                        onClick={toggleCategoria}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") toggleCategoria(e);
                        }}
                        tabIndex="0"
                      >
                        <FaPlus />
                      </button>

                      {isDropdownCategoriaOpen && (
                        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
                          <div className="block w-full px-2 py-2 text-left text-gray-700">
                            <input
                            readOnly
                            disabled
                              type="text"
                              name="categoriaNueva"
                              id="categoriaNueva"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-1"
                              placeholder="Ingrese una categoría"
                              onKeyDown={(e) => {
                                if (e.key === "Enter")
                                  handleAgregarNuevaCategoria(
                                    "categoria",
                                    e.target.value
                                  );
                              }}
                            />

                            <button disabled
                            aria-label="agregar neuva categoria"
                              onClick={() =>
                                handleAgregarNuevaCategoria(
                                  "categoria",
                                  document.getElementById("categoriaNueva")
                                    .value
                                )
                              }
                              className="w-full rounded-lg m-auto px-4 py-2 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-500 focus:outline-none focus:ring-4"
                            >
                              AGREGAR
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Vehiculo */}
                <div>
                  <label
                    htmlFor="vehiculoVer"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Vehiculo<span className='text-red-500'>*</span>
                  </label>

                  <div className="flex gap-4">
                    <select
                    readOnly
                      onChange={handleChangeInput}
                      name="vehiculo"
                      id="vehiculoVer"
                      value={producto.vehiculo}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    >
                     {/* {console.log(vehiculos,'vehi')} */}
                      {vehiculos.map((vehiculo, index) => (
                        <option key={index} value={vehiculo.vehiculo} disabled>
                          {vehiculo.vehiculo}
                        </option>
                      ))}
                    </select>

                    <div className="relative" ref={vehiculoDropdownRef}>
                      <button
                        disabled
                      aria-label="seleccionar vehiculo"
                        className="text-gray-800 bg-gray-50 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm ml-auto inline-flex items-center w-auto h-full p-3"
                        onClick={toggleVehiculo}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") toggleVehiculo(e);
                        }}
                        tabIndex="0"
                      >
                        <FaPlus />
                      </button>

                      {isDropdownVehiculoOpen && (
                        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
                          <div className="block w-full px-2 py-2 text-left text-gray-700">
                            <input
                                readOnly
                                disabled
                              type="text"
                              name="vehiculoNuevo"
                              id="vehiculoNuevo"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-1"
                              placeholder="Ingrese un vehiculo"
                              onKeyDown={(e) => {
                                if (e.key === "Enter")
                                  handleAgregarNuevoVehiculo(
                                    "vehiculo",
                                    e.target.value
                                  );
                              }}
                            />

                            <button aria-label="agregar nuevo vehiculo" disabled
                              onClick={() =>
                                handleAgregarNuevoVehiculo(
                                  "vehiculo",
                                  document.getElementById("vehiculoNuevo")
                                    .value
                                )
                              }
                              className="w-full rounded-lg m-auto px-4 py-2 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-500 focus:outline-none focus:ring-4"
                            >
                              AGREGAR
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Modelo */}
                <div>
                  <label
                    htmlFor="modeloVer"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Modelo<span className='text-red-500'>*</span>
                  </label>
                  <input
                  readOnly
                    onChange={handleChangeInput}
                    type="text"
                    name="modelo"
                    id="modeloVer"
                    value={producto.modelo}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Modelo del producto"
                  />
                </div>

                {/* Numero de serie */}
                <div>
                  <label
                    htmlFor="n_serieVer"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Numero de serie<span className='text-red-500'>*</span>
                  </label>
                  <input
                  readOnly
                    onChange={handleChangeInput}
                    type="text"
                    name="n_serie"
                    id="n_serieVer"
                    value={producto.n_serie}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Numero de serie del producto"
                  />
                </div>

                {/* Numero de electronica */}
                <div>
                  <label
                    htmlFor="n_electronicaVer"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Numero de electronica
                  </label>
                  <input
                  readOnly
                    onChange={handleChangeInput}
                    type="text"
                    name="n_electronica"
                    id="n_electronicaVer"
                    value={producto.n_electronica}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Numero de electronica del producto"
                  />
                </div>

                {/* Medidas */}
                <div>
                  <label htmlFor="medidasVer" className="block mb-2 text-sm font-medium text-gray-900">Medidas</label>
                  <input
                  readOnly
                    onChange={handleChangeInput}
                    type="text"
                    name="medidas"
                    id="medidasVer"
                    value={producto.medidas}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Medidas del producto"
                  />
                </div>
                {/* Precio */}
                <div>
                    <label htmlFor="precioVer" className="block mb-2 text-sm font-medium text-gray-900">
                      Precio
                    </label>
                    <input
                    readOnly
                      onChange={handleChangeInput}
                      type="text"
                      name="precio"
                      id="precioVer"
                      value={producto.precio}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="$100.000"
                    />
                </div>

                {/* Descripción */}
                <div className="sm:col-span-2">
                  <label htmlFor="descripcionVer" className="block mb-2 text-sm font-medium text-gray-900" >Descripción<span className='text-red-500'>*</span></label>
                  <textarea
                  readOnly
                    onChange={handleChangeInput}
                    id="descripcionVer"
                    rows="5"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Descripción del producto..."
                    value={producto.descripcion}
                    name="descripcion"
                  />
                </div>
              </div>
              
              {/* destacados */}
              <div className='flex gap-2 mb-4'>
                <input onChange={handleChangeInput} readOnly type="checkbox" name="destacados" id="destacadosVer" checked={producto.destacados} disabled/>
                <label htmlFor="destacadosVer" className="block text-sm font-medium text-gray-900" >Producto Destacado</label>
              </div>
                
              {/* Subir Archivo */}
              <UploadImage imagenes={imagenes} updateImages={handleVerImages} handleRemoveImage={handleRemoveImage} />

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
