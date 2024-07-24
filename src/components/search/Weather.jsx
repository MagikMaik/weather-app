import axios from "axios"
import { useState } from "react"
import '../stylesheets/Weather.css'

export default function Weather() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=add604d1151621ae73b35b3d899be439
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
      <div className='top'>
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className='temp'>
          {data.main ? <p>{data.main.temp.toFixed()}</p> : null }
        </div>
        <div className='description'>
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
      </div>
      <div className='bot'>
        <div className='sensation'>
          { data.main ? <p>{data.main.feels_like.toFixed()}</p> : null }
        </div>
        <div className='humidity'>
          { data.main ? <p>{data.main.humidity}</p> : null }
        </div>
        <div className='wind'>
          { data.wind ? <p>{data.wind.speed}</p> : null }
        </div>
      </div>
    </div>
  )

}
