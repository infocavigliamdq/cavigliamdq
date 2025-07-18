'use client'
import React, { useEffect, useState, Suspense } from "react";
import ReactDOM from 'react-dom/client';
import AddProduct from "./AddProduct/AddProduct";
import UpdateProduct from "./UpdateProduct/UpdateProduct";
import VerProduct from "./VerProduct/VerProduct";
import Presupuestos from "./Presupuestos/Presupuestos";
import Etiquetas from './Etiquetas/Etiquetas'
import useProducts from "../../Hooks/useProducts";
import Dropdown from "../Tienda/Dropdown/Dropdown";
import Nav from "./Nav/Nav";
import TablaDestacados from "./TablaDestacados/TablaDestacados";
import DownloadCSVButton from "./DownloadCSVButton/DownloadCSVButton";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import SearchBase from "../Search/SearchBase";
import { Pagination } from "@mui/material";
import EmpresaForm from "./Empresas/Empresas";
import EstadisticasGSC from "./KeywordTable/KeywordTable";

export default function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClose, setIsModalClose] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [section, setSection] = useState('Productos')

  const {
    products,
    categories,
    brands,
    vehiculos,
    selectedCategories,
    selectedBrands,
    selectedVehiculos,
    showAllCategories,
    showAllBrands,
    showAllVehiculos,
    totalPages,
    currentPage,
    isLoading,
    handlePageChange,
    handleCheckboxChange,
    handleClearFilters,
    handleShowAllCategories,
    handleShowAllBrands,
    handleShowAllVehiculos,
    setSelectedCategories,
    setSelectedBrands,
    setSelectedVehiculos,
    fetchProducts
  } = useProducts();
  
  const openModal = (type, product = null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setIsModalClose(false);
    setModalType(type);
    if (type === 'update') {
      window.location.hash = 'update';
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalClose(true);
    window.history.pushState(null, null, ' ');
  };

  useEffect(() => {
    if (isModalClose) {
      fetchProducts();
    }

    const handlePopState = () => {
      if (window.location.hash !== '#update' && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isModalClose, isModalOpen]);

  const loadingElement = document.createElement('div');
  const root = ReactDOM.createRoot(loadingElement);
  const container = document.createElement('div');
  root.render(<Loading />);
  container.innerHTML = `<h2><strong>AGUARDE</strong></h2><br/><p> se está eliminando el producto</p>`;
  container.appendChild(loadingElement);
   
  const handleEliminarArchivos = async (producto) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Una vez eliminado, no podrás recuperar este producto ni sus imágenes asociadas.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });
  
      if (result.isConfirmed) {
        const fotosAEliminar = [];
  
        Swal.fire({
          title: 'Eliminando producto...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        
        Object.keys(producto).forEach((key) => {
          if (key.startsWith('foto_') && producto[key]) {
            const imgPrevAEliminar = producto[key].split('/').pop().split('.')[0];
            const imgAEliminar = `Products/${imgPrevAEliminar}`;
            fotosAEliminar.push(imgAEliminar);
          }
        });

        await Promise.all(
          fotosAEliminar.map(async (imgAEliminar) => {
            const res = await fetch('api/deleteImage', {
              method: 'DELETE',
              body: JSON.stringify({ file: imgAEliminar })
            });
            const data = await res.json();
            return data;
          })
        );
  
        const resBDD = await fetch('api/deleteProduct', {
          method: 'DELETE',
          body: JSON.stringify({ id: producto._id })
        });
        const dataBDD = await resBDD.json();
  
        if (dataBDD.success) {
          fetchProducts();
          Swal.fire({
            icon: 'success',
            title: 'El producto ha sido eliminado correctamente.',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          console.error('Error al eliminar el producto en la base de datos:', dataBDD.error);
          Swal.fire('Error', 'Ha ocurrido un error al intentar eliminar el producto.', 'error');
        }
      }
    } catch (error) {
      console.error('Error al eliminar las imágenes o producto:', error);
      Swal.fire('Error', 'Ha ocurrido un error al intentar eliminar el producto o sus imágenes.', 'error');
    }
  };

  const handleSelectSection = (section) => {
    setSection(section);
  };

  return (
    <Suspense fallback={<Loading/>}>
      <div className="flex flex-col min-h-screen">
        <Nav handleSelectSection={handleSelectSection} />
        {section === 'Productos' && (
          <div>
            <section id="tablaProductosAdmin" className="bg-blue-50 p-2 sm:p-3 md:p-5">
              <div className="mx-auto max-w-screen-xl px-0 lg:px-12">
                <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
                      <SearchBase />
                    </div>
                    <div className="md:flex md:justify-end gap-3 grid grid-cols-5 w-full">

                        <div className="col-span-2">
                        <Dropdown
                          handleClearFilters={handleClearFilters} 
                          handleCheckboxChange={handleCheckboxChange}
                          categories={categories} 
                          showAllCategories={showAllCategories}
                          selectedCategories={selectedCategories}
                          setSelectedCategories={setSelectedCategories}
                          handleShowAllCategories={handleShowAllCategories}
                          brands={brands}
                          showAllBrands={showAllBrands}
                          selectedBrands={selectedBrands}
                          setSelectedBrands={setSelectedBrands}
                          handleShowAllBrands={handleShowAllBrands}
                          isLoading={isLoading}
                          vehiculos={vehiculos}
                          handleShowAllVehiculos={handleShowAllVehiculos}
                          showAllVehiculos={showAllVehiculos}
                          selectedVehiculos={selectedVehiculos}
                          setSelectedVehiculos={setSelectedVehiculos}
                          />
                          </div>
                      <div className="col-span-3">

                      <button type="button" aria-label="agregar producto" className="flex items-center text-white border bg-boton-primary hover:bg-boton-primary-hover active:bg-boton-primary-active font-medium w-full justify-center rounded-lg h-10 text-xs xs:text-sm px-5 py-2 text-center " onClick={() => openModal('add')}>+  Agregar producto</button>
                      {isModalOpen && modalType === 'add' && (
                        <AddProduct toggleModal={closeModal} isOpenModal={isModalOpen} marca={brands} categoria={categories} vehiculo={vehiculos} />
                      )}
                    </div>
                      </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500" id="productosAdmin">
                      <thead className="text-xs text-gray-900 uppercase bg-gray-400">
                        <tr>
                          <th scope="col" className="px-1 py-2 md:px-4 md:py-3 text-center">Producto</th>
                          <th scope="col" className="px-1 py-2 md:px-4 md:py-3 text-center hidden md:table-cell">Categoría</th>
                          <th scope="col" className="px-1 py-2 md:px-4 md:py-3 text-center hidden md:table-cell">Marca</th>
                          <th scope="col" className="px-1 py-2 md:px-4 md:py-3 text-center hidden lg:table-cell">Descripción</th>
                          <th scope="col" className="px-1 py-2 md:px-4 md:py-3 text-center ">Acción</th>
                        </tr>
                      </thead>
                      {products.length ? (
                        <tbody>
                          {products.map((product, index) => (
                            <tr key={index} className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}`}>
                              <th scope="row" className="px-1 py-6 md:px-4 md:py-4 font-medium text-gray-900 whitespace-nowrap">{product.nombre}</th>
                              <td scope="row" className="px-1 py-6 md:px-4 md:py-4 hidden md:table-cell">{product.categoria}</td>
                              <td scope="row" className="px-1 py-6 md:px-4 md:py-4 hidden md:table-cell">{product.marca}</td>
                              <td scope="row" title={product.descripcion} className="px-1 py-1 md:px-4 md:py-3 text-center text-ellipsis hidden lg:table-cell">{product.descripcion ? (product.descripcion.length > 50 ? `${product.descripcion.slice(0, 50)}...` : product.descripcion) : "Sin descripción"}</td>
                              <td scope="row" className="px-1 py-6 md:px-4 md:py-4">
                                <div className="flex justify-evenly items-center mx-1">
                                  <button
                                  hidden
                                    aria-label="editar producto"
                                    id="updateProductButton"
                                    data-modal-target="updateProductModal"
                                    data-modal-toggle="updateProductModal"
                                    className="px-3 py-2 text-xs items-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg me-2 "
                                    type="button"
                                    disabled
                                    onClick={() => openModal('update', product)}>Editar</button>
                                  <button hidden aria-label="Eliminar Producto" onClick={() => handleEliminarArchivos(product)} type="button" disabled className="px-3 py-2 text-xs focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg ">
                                    Eliminar
                                  </button>
                                  <button aria-label="ver Producto" onClick={() => openModal('ver', product)} type="button" className="px-3 py-2 text-xs focus:outline-none text-gray-800 bg-secondary hover:bg-primary hover:text-white focus:ring-4 focus:ring-secondary font-medium rounded-lg ">
                                    ver
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      ) : (
                        <tbody>
                          <tr className="text-center">
                            <td colSpan="5" className="py-10">
                              <span className="text-gray-500 font-semibold">No se encontraron productos.</span>
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </div>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    siblingCount={1}
                    boundaryCount={1}
                    variant="outlined"
                    shape="rounded"
                    className="flex justify-center my-6 bg-white"
                  />
                </div>
              </div>
            </section>
            {isModalOpen && modalType === 'update' && selectedProduct && (
              <UpdateProduct
                toggleModal={closeModal}
                isOpenModal={isModalOpen}
                product={selectedProduct}
                marca={brands}
                categoria={categories}
                vehiculo={vehiculos}
              />
            )}
            {isModalOpen && modalType === 'ver' && selectedProduct && (
              <VerProduct
                toggleModal={closeModal}
                isOpenModal={isModalOpen}
                product={selectedProduct}
                marca={brands}
                categoria={categories}
                vehiculo={vehiculos}
              />
            )}
          </div>
        )}

        <div className="flex-1 bg-primary-background p-3 sm:p-5">
          {/* {section === 'Destacados' && (
            <div className="mx-auto max-w-screen-xl lg:px-12">
              <TablaDestacados />
            </div>
          )} */}

          {section === 'DescargarCSV' && (
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
              <DownloadCSVButton />
            </div>
          )}
          {section === 'Comprobantes' && (
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
              <Presupuestos />
            </div>
          )}
          {section === 'Empresas' && (
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
              <EmpresaForm />
            </div>
          )}
          {section === 'Etiquetas' && (
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
              <Etiquetas />
            </div>
          )}
          {/* {section === 'Estadisticas' && (
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
              <EstadisticasGSC />
            </div>
          )} */}
        </div>
      </div>
    </Suspense>
  );
}
