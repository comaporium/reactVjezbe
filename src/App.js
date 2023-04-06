import { useState, useRef, useEffect } from 'react';
import React from 'react'
import TodoList from './TodoList'

function App() {
  const [trenutniZadaci, setTrenutniZadaci] = useState([])
  const zadatakNameRef = useRef()
  const localStorageKey = 'zadaciApp.zadaci'

  useEffect(()=>{
    const storaniZadaci = JSON.parse(localStorage.getItem(localStorageKey))
    setTrenutniZadaci(storaniZadaci)
  },[])

  useEffect(()=>{
    localStorage.setItem(localStorageKey, JSON.stringify(trenutniZadaci))
    console.log(localStorage);  
  },[trenutniZadaci])

  function AddZadatakHandler(){
    const imeZadatka = zadatakNameRef.current.value
    if(imeZadatka === "") return
    let idZadataka = Math.floor(Math.random() * 10000)
    var noviZadatak = {
      id: idZadataka,
      name: imeZadatka,
      complete: false
    }
    setTrenutniZadaci(trenutnaListaZadataka =>{
      return[...trenutnaListaZadataka, noviZadatak]
    })
    zadatakNameRef.current.value = null
  }

  function togleCheck(id){
    const novaListaTrenutnihZadataka = [...trenutniZadaci]
    const zadatakZaCekiranje = novaListaTrenutnihZadataka.find(x => x.id === id)
    zadatakZaCekiranje.complete = !zadatakZaCekiranje.complete
    setTrenutniZadaci(novaListaTrenutnihZadataka)
  }

  function ciscenjeGotovihZadataka(){
    const zadaciKojiNisuGotovi = trenutniZadaci.filter(zadatak => !zadatak.complete)
    setTrenutniZadaci(zadaciKojiNisuGotovi)
  }

  return (
    <>
      <TodoList trenutniZadaci = {trenutniZadaci} togleCheck = {togleCheck}/>
      <input type='text' ref={zadatakNameRef}/>
      <button onClick={AddZadatakHandler}>Add</button>
      <button onClick={ciscenjeGotovihZadataka}>Clear Completed Tasks</button>
      <div>{trenutniZadaci.filter(zadatak => !zadatak.complete).length} left to do.</div>
    </>
  )
}

export default App;
