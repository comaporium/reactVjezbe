import React from 'react';

const PojedinacniZadatak = ({zadatak, postaviKompletnostZadatka}) => {
    function gotovZadatak(){
        postaviKompletnostZadatka(zadatak.id)
    }
    return <div>
        <label>
            <input type="checkbox" checked={zadatak.stanje} onClick={gotovZadatak} />
            {zadatak.nazivZadatka}
        </label>
    </div>;
}

export default PojedinacniZadatak;