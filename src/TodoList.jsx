import React from 'react'
import Todo from './Todo'


export default function TodoList({trenutniZadaci, togleCheck}){
        return (
            trenutniZadaci.map(zadatak =>{
                return <Todo key = {zadatak.id} zadatak = {zadatak} togleCheck = {togleCheck}/>
            })
        )
}

