import './App.css'
import { useState } from 'react';

function App() {
  const [area,setArea] = useState([]);
  async function change(id) {
      const responce = await fetch(`https://www.jma.go.jp/bosai/forecast/data/forecast/${id}.json`);
      const current = await responce.json();
      console.log(current[0].timeSeries[0].areas);
      setArea(current[0].timeSeries[0].areas);
  }
  
  return (
      <div className='content'>
          <h1 className='title'>Weather</h1>
          <select className='btn' onChange={(e) => change(e.target.value)}>
              <option value="130000">東京</option>
              <option value="270000">大阪</option>
              <option value="016000">札幌</option>
          </select>
          {
              area.map((items,index) => (
                  <div key={index}>
                      <h2>{items.area.name}</h2>
                      <p>明日の天気 : {items.weathers[1]}</p>
                      <img src={`https://www.jma.go.jp/bosai/forecast/img/${items.weatherCodes[1]}.svg`} alt="" />
                  </div>
              ))
          }
      </div>
  )
}

export default App
