import React from 'react';
import PojedinacniZadatak from './PojedinacniZadatak';

export default function ListaZadataka({listaZadataka, postaviKompletnostZadatka}){
    return (
        listaZadataka.map(zadatak => {
            return <PojedinacniZadatak key={listaZadataka.id} zadatak={zadatak} postaviKompletnostZadatka = {postaviKompletnostZadatka}/>
        })
    )
}
