import React from 'react';

const Todo = ({zadatak, togleCheck}) => {
    function checkHandler(){
        togleCheck(zadatak.id)
    }
    return <div>
        <label>
            <input type='checkbox' checked = {zadatak.complete} onChange={checkHandler}/>
            {zadatak.name}
        </label>
    </div>;
}

export default Todo;