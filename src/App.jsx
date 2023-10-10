import { useState, useRef } from 'react'
import { MutableRefObject, useLayoutEffect } from 'react'
import axios from 'axios';
import './App.css'

let names = [];
let money = [];
let money_history = [];
let whopays = [];
let text = "";

function LoginForm(){
  return(<div>
    
  </div>);
}

function CheckButtons({name, len, arr}){
  return (<div><input type="checkbox" onChange={(evnt)=> arr[len]===0?arr[len]=1:arr[len]=0}/>{name}</div>)
}
function RadioButtons({name, len, setter}){
  return <div><input type="radio" name="whopaid" onClick={(evnt)=>{setter(whopaid=>whopaid = len)}}/>{name}</div>
}

function Payments({name, setter}){
  const payments = [];
  const id = names.findIndex(i => i.name === name)  
  const delete_user = (evnt) => {
    for(let j = 0; j < money.length; ++j){
      money[j][j] -= money[id][j];
    }
    for(let i = 0; i < money.length; ++i){
      money[i][i] += money[i][id];
      money[i].splice(id,1)
    }
    names.splice(id, 1)
    money.splice(id,1);
    whopays.splice(id,1);
    text += "Usunięto " + name + "\n"; 
    setter((count)=> count +=1);

  }

  let i = 0;
  names.forEach((person)=>{
    i++;
    if(name === person.name)
      return
    else
      payments.push(<div key={payments.length.toString()}>{person.name}: {money[id][i - 1]}</div>);
      
  });
  const button = <button onClick={delete_user}>Usuń</button>
  payments.push(<div key={payments.length.toString()}>Bilans: {money[id][id]}</div>)

  return(
    <div className='Payments'>
    <div>{name} płaci dla</div>
    {payments}
    {button}
    </div>
  )
}


function ShopWindow(){
  const persons = [];
  const radio_buttons = [];
  const check_buttons = [];
  const new_person = useRef();
  const how_much = useRef();
  const [count,setCount] = useState(0);
  const [whopaid, setWhopaid] = useState(-1);

  names.forEach((pers) =>{
    persons.push(<Payments key={persons.length.toString()} name={pers.name} setter={setCount}/>);
    radio_buttons.push(<RadioButtons key={radio_buttons.length.toString()} name={pers.name} len={radio_buttons.length} setter={setWhopaid}/> );
    check_buttons.push(<CheckButtons key={check_buttons.length.toString()} name={pers.name} len={check_buttons.length} arr={whopays}/>);
  });
  
 
  function add_person_enter(evnt){
    if(evnt.key === "Enter"){
      add_person(evnt);
    }
  }
  function add_person(evnt){
    if(new_person.current.value === "")
      return;
    whopays.push(0);
    names.push({name:new_person.current.value});
    new_person.current.value = ""
    let help = [0];
    money.map(x => {
      x.push(0)
      help.push(0)
    });
    money.push(help)
    setCount((count) => count += 1)
  }

  function add_payments_enter(evnt){
    if(evnt.key === "Enter"){
      add_payments(evnt)
    }
  }
  function add_payments(evnt){
    let whopays_names = "";
    if(whopaid===-1)
        return
    let price = how_much.current.value.replace(",", ".");
    if(isNaN(price) || price === "")
      return;
    let on = 0;
    whopays.forEach(per=>{
      if(per == 1)
        on++;
    });
    let temp = money.map(arr => arr.slice());
    money_history.push(temp);
    for(let i = 0; i < whopays.length; i++){
      if(whopays[i] == 1){
        whopays_names += names[i].name + " ";
        if(i == whopaid)
          continue;
        money[i][whopaid] += (price/on);
        money[i][whopaid] = parseFloat(money[i][whopaid].toFixed(2));
        money[whopaid][whopaid] += (price/on)
        money[whopaid][whopaid] = parseFloat(money[whopaid][whopaid].toFixed(2));
        money[i][i] -= (price/on)
        money[i][i] = parseFloat(money[i][i].toFixed(2));
      
      }
    }
      
      
    text += names[whopaid].name + " " + price + " " +  whopays_names + '\n'
    how_much.current.value = "";
    setCount((count) => count+=1)
    
  }

  function sort(evnt){
    for(let i = 0; i<names.length; ++i){
      for(let j = 0; j<names.length; ++j){
        if(i === j)
          continue
        if(money[i][j] !== 0 && money[j][i] !== 0)
          {
            money[i][j] -= money[j][i];
            money[j][i] = 0;
            if(money[i][j] < 0){
              money[j][i] = -money[i][j]
              money[i][j] = 0;
            }
          }
      }
    }
    setCount((count) => count+=1)
  }

  function undo(evnt){
    if(money_history.length == 0)
      return;
    money = money_history[money_history.length - 1];
    money_history.pop();
    text += "Cofnij\n"
    setCount((count) => count+=1);

  }
  
  return (
  <div className = 'mainBox'>
    <div className='Add_win' id="center">
      <div className='adding'>
        <input type="text" className='Add_person' ref = {new_person} onKeyDown={add_person_enter}/>
        <button onClick={add_person}>Dodaj osobe</button> 
      </div>
      <div className='Window'>{persons}</div>
      {/* <Persons persons = {persons}></Persons> */}
      <div className="Buttons">
        <div className='radioButtons'>
          <div>Kto płacił za zakupy</div>
            {radio_buttons}
          </div>
        <div className='checkButtons'>
          <div>Kogo zakupy</div>
          {check_buttons}
        </div>
        
        <div className="payButtons">
          Kwota
          <input type="text" onKeyDown={add_payments_enter} ref={how_much}></input>
          <button onClick={add_payments}>Dodaj</button>
          <button onClick={sort}>Uprość</button>
          <button onClick={undo}>Cofnij</button>
        </div>
      </div>
    </div>

    <div className = 'history_textbox' id ='left'>
      {text}
    </div>

    <div className='test'></div>
  </div>
  )
}




function App() {

  return (
    <ShopWindow/>
  )
}


export default App