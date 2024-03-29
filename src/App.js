import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const operators = ['+','-','*','/']
  
  const handleValue = current => { 
    if(operators.includes(current)) { 
      if( value === '' || value === '-') { 
        if( current === '-')
          setValue("-");
        else
          return;
      }
      else if(operators.includes(value.slice(-1))) { 
        setValue(value.slice(0,-1) + current);
      }
      else 
        setValue(value+current);
    } 
    if( current === "=") { 
      setResult(eval(value).toString());
      setValue(eval(value).toString());
    }
    else if(!operators.includes(current)) {
      if( value === "0")
        setValue(current);
      else
        setValue(value + current);
    }
  }
  
  const handleDelete = par => { 
    if(par === 'DEL') {
      if( value === result)
        return;
      setValue(value.slice(0,-1))
    }
    else { 
      setValue("");
      setResult("");
    }
  }

  const digits = () => { 
    const d = [];

    for(let i = 1; i < 10; i++) { 
      d.push(
        <button onClick={() => handleValue(i.toString())}
        key={i}>{i}</button>
      )
    }
    return d;
  }


  return (
    <div className="app">
      <div className='calculator'>
        <div className='display'>
          <span>({result || "0"})</span>
          {value || "0"}
        </div>

        <div className='operators'>
          <button onClick={() => handleValue('+')}>+</button>
          <button onClick={() => handleValue('-')}>-</button>
          <button onClick={() => handleValue('*')}>*</button>
          <button onClick={() => handleValue('/')}>/</button>
          <button onClick={() => handleValue('=')}>=</button>
        </div>

        <div className='numbers'>
          {digits()}
          <button onClick={() => handleValue('0')}>0</button>
          <button onClick={() => handleValue('.')}>.</button>
          <button onClick={() => handleDelete('DEL')}>DEL</button>
          <button onClick={() => handleDelete('C')}>C</button>
        </div>
      </div>
    </div>
  );
}