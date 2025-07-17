"use client"
import { Fade } from "react-awesome-reveal";


const Gallery = () => {
    return (
        <div id="fotos">
            <div className='mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8'>
                <div className="text-center items-center align-middle justify-center self-center place-items-center">
                    <Fade direction={'up'} delay={400} cascade damping={1e-1} triggerOnce={true}>
                        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-center items-center  place-items-center">
                            <h2 className='text-pink font-normal tracking-widest italic font-serif ls-51 mb-4 text-3xl md:text-4xl text-center text-tertiary'>Galeria</h2>
                            <div className="px-10 pt-1 mb-2 text-center place-items-center bg-tertiary uppercase w-1/4"></div>
                        </div>
                    </Fade>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-12 mt-16 mb-6 sm:space-x-6 space-y-6 md:space-y-0 px-6'>
                    <div className='col-span-6 flex justify-center overflow-hidden rounded-3xl'>
                        <img src="/images/Gallery/1.webp" alt="Fotos de La Galeria en Hotel" title="Fotos de La Galeria en Hotel" aria-label="Fotos de La Galeria en Hotel" loading="lazy" width={1000} height={805} className="inner-img"/>
                    </div>
                    <div className='col-span-6 flex justify-center'>
                        <div className="grid grid-rows-1 grid-flow-row gap-4">
                            <div className="row-span-1 overflow-hidden rounded-3xl">
                                <img src="/images/Gallery/2.webp" alt="Fotos de La Galeria en Altura" title="Fotos de La Galeria en Altura" aria-label="Fotos de La Galeria en Altura" loading="lazy" width={700} height={405} className="inner-img"/>
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <div className='overflow-hidden rounded-3xl'>
                                    <img src="/images/Gallery/4.webp" alt="Fotos de La Galeria" title="Fotos de La Galeria" aria-label="Fotos de La Galeria" width={500} height={405} className="inner-img" loading="lazy"/>
                                </div>
                                <div className='overflow-hidden rounded-3xl'>
                                    <img src="/images/Gallery/4.webp" alt="Fotos de La Galeria" title="Fotos de La Galeria" aria-label="Fotos de La Galeria" width={500} height={405} className="inner-img" loading="lazy"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='hidden md:grid grid-cols-1 md:grid-cols-12 mb-16 sm:space-x-6 space-y-6 md:space-y-0 px-6'>
                    <div className='col-span-6 flex justify-center'>
                        <div className="grid grid-rows-1 grid-flow-row gap-4">
                        <div className='grid grid-cols-2 gap-2'>
                                <div className='overflow-hidden rounded-3xl'>
                                    <img src="/images/Gallery/5.webp" alt="Fotos de La Galeria" title="Fotos de La Galeria" aria-label="Fotos de La Galeria" width={500} height={405} className="inner-img" loading="lazy"/>
                                </div>
                                <div className='overflow-hidden rounded-3xl'>
                                    <img src="/images/Gallery/5.webp" alt="Fotos de La Galeria" title="Fotos de La Galeria" aria-label="Fotos de La Galeria" width={500} height={405} className="inner-img" loading="lazy"/>
                                </div>
                            </div>
                            <div className="row-span-1 overflow-hidden rounded-3xl">
                                <img src="/images/Gallery/7.webp" alt="Fotos de La Galeria" title="Fotos de La Galeria" aria-label="Fotos de La Galeria" width={700} height={405} className="inner-img" loading="lazy"/>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-6 flex justify-center overflow-hidden rounded-3xl'>
                        <img src="/images/Gallery/1.webp" alt="Fotos de La Galeria" title="Fotos de La Galeria" aria-label="Fotos de La Galeria" width={1000} height={805} className="inner-img" loading="lazy"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gallery;
