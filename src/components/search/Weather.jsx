import axios from "axios"
import { useState } from "react"
import '../stylesheets/Weather.css'

export default function Weather() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_API_KEY}
`

  const SearchLocation = (event) => {
    if (event.key === 'Enter') {

      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }
  return (
    <div className='container'>
      <div className="search">
        <input
          value={location}
          placeholder="Search City"
          onChange={event => setLocation(event.target.value)}
          onKeyPress={SearchLocation} />
      </div>
      <div className="weather">
      <div className='left'>
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className='temp'>
          {data.main ? <p>{data.main.temp.toFixed()}°C</p> : null }
        </div>
        <div className='description'>
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
      </div>
      {data.name != undefined &&
        <div className='right'>
        <div className='sensation'>
          <p>Feels like</p>
          { data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null }
        </div>
        <div className='humidity'>
          <p>Humidity</p>
          { data.main ? <p className="bold">{data.main.humidity}%</p> : null }
        </div>
        <div className='wind'>
          <p>Wind</p>
          { data.wind ? <p className="bold">{data.wind.speed}km/h</p> : null }
        </div>
      </div>
      }
      </div>
    </div>
  )

}
