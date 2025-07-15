import { useSearchParams } from 'next/navigation';

const useLinks = () => {
    const searchParams = useSearchParams();
    const queryString = searchParams.toString();

    return [
        {name: 'Home', href: queryString? '?' + queryString + '#home':'#home'},
        {name: 'Nosotros', href: queryString? '?' + queryString +'#sobre':'#sobre'},
        {name: 'FOTOS', href: queryString? '?' + queryString +'#fotos':'#fotos'},
        {name: 'Contacto', href: queryString? '?' + queryString +'#contacto':'#contacto'},

    ];
};

export default useLinks;
