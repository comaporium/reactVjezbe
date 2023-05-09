import { useState, useRef, useEffect } from 'react';
import React from 'react'
import ListaZadataka from './ListaZadataka'

function App() {
  const [listaZadataka, azurirajListuZadataka] = useState([])
  const zadatakNameRef = useRef()
  const linkZaDohvacanjeZadataka = 'https://localhost:7205/api/Zadaci/sviZadaci'
  const linkZaEditStanja = 'https://localhost:7205/api/Zadaci/azurirajZadatak/'
  const linkZaDodavanjeJednoimenogZadatka = 'https://localhost:7205/api/Zadaci/dodajZadatak?nazivZadatka='
  const linkZaBrisanje = 'https://localhost:7205/api/Zadaci/obrisiZadatak/'

  useEffect(()=>{
    fetchZadataka();
  }, [])

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  function AddZadatakHandler(){
    if(zadatakNameRef.current.value == "") return
    dodajNoviZadatak(zadatakNameRef.current.value);
    zadatakNameRef.current.value = "";
    getNovuListu()
  }

  async function dodajNoviZadatak(naziv){
    const response = await fetch(linkZaDodavanjeJednoimenogZadatka + naziv,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type' : 'application/json'
        }});
    if(!response.ok) throw Error('Neuspješan fetch podataka!');
  }

  async function getNovuListu(){
    await delay(5);
    fetchZadataka();
  }

  async function fetchZadataka(){
    const response = await fetch(linkZaDohvacanjeZadataka,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type' : 'application/json'
        }});
    if(!response.ok) throw Error('Neuspješan fetch podataka!');
    const nasiZadaci = await response.json();
    azurirajListuZadataka(nasiZadaci);
    console.log(listaZadataka);
  }

  function postaviKompletnostZadatka(id){
    async function azurirajZadatak(){
      const response = await fetch(linkZaEditStanja + id,
        {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type' : 'application/json'
          }});
      if(!response.ok) throw Error('Neuspješan fetch podataka!');
    }
    azurirajZadatak()
    getNovuListu()
  }

  function ciscenjeGotovihZadataka(){
    async function obrisiZadatak(id){
      const response = await fetch(linkZaBrisanje + id,
        {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            'Content-Type' : 'application/json'
          }});
      if(!response.ok) throw Error('Neuspješan fetch podataka!');
    }
    listaZadataka.map(zadatak =>{
      if(zadatak.stanje === 1){
        obrisiZadatak(zadatak.id)
      }
    })
    getNovuListu()
  }

  return (
    <>
      <ListaZadataka listaZadataka = {listaZadataka}  postaviKompletnostZadatka={postaviKompletnostZadatka}/>
      <input type='text' ref={zadatakNameRef}/>
      <button onClick={AddZadatakHandler}>Add</button>
      <button onClick={ciscenjeGotovihZadataka}>Clear Completed Tasks</button>
      <div>{listaZadataka.filter(zadatak => !zadatak.stanje).length} left to do.</div>
    </>
  )
}

export default App;
