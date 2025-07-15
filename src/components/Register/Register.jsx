import Link from 'next/link'
import React from 'react'

export default function Register() {
  return (
    <div>
        <section className="bg-gray-50">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Link href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900" title="caviglia Logo">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" loading='lazy' title="caviglia Logo" />
          caviglia    
      </Link>
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Crear una cuenta
              </h1>
              <form id='formRegister' className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="emailRegister" className="block mb-2 text-sm font-medium text-gray-900">Tu correo electrónico</label>
                      <input type="email" name="email" id="emailRegister" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="nombre@empresa.com" required=""/>
                  </div>
                  <div>
                      <label htmlFor="passwordRegister" className="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                      <input type="password" name="password" id="passwordRegister" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
                  </div>
                  <div>
                      <label htmlFor="confirm-passwordRegister" className="block mb-2 text-sm font-medium text-gray-900">Confirmar contraseña</label>
                      <input type="password" name="confirm-password" id="confirm-passwordRegister" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="termsRegister" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="termsRegister" className="font-light text-gray-500">Acepto los <Link className="font-medium text-primary-600 hover:underline" href="#">Términos y Condiciones</Link></label>
                      </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" aria-label="crear cuenta">Crear una cuenta</button>
                  <p className="text-sm font-light text-gray-500">
                      ¿Ya tienes una cuenta? <Link href="/Login" className="font-medium text-primary-600 hover:underline">Inicia sesión aquí</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}
