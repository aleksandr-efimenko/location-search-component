import { ChangeEvent, useMemo, useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import data from '../node_modules/all-countries-and-cities-json/countries.min.json';

type CityWithCountry = {
  city: string
  country: string,
}

function App() {
  const [searchText, setSearchText] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  // Transform the array to be in object CityWithCountry: {country: '', city: ''}
  const citiesWithCountry: CityWithCountry[] = Object.entries(data).map(([country, cities]) =>
    cities.map(city => {
      return {
        country: country,
        city: city
      }
    })
  ).flat();

  const searchResults: CityWithCountry[] = useMemo(() => {
    if (!searchText)
      return [] as CityWithCountry[];

    const cities = citiesWithCountry.filter((el) =>
      el.city.toLowerCase().includes(searchText.toLowerCase())
    ).sort().slice(0, 5);

    //Filter duplicates
    return cities.filter((tag, index, array) => array.findIndex(t => t.city === tag.city && t.country === tag.country) === index)
  }, [searchText])

  const handleSeach = (e: ChangeEvent<HTMLInputElement>) => {
    // if (cities.length === 0) {
    //   setCity(searchText)
    // } else {
    //   setCity('')
    // }
    setSearchText(e.target.value);
  }

  const handleSelect = (cityWithCountry: CityWithCountry) => {
    console.log(cityWithCountry)
    setCity(cityWithCountry.city)
    setCountry(cityWithCountry.country)
  }

  const handleCountryEnter = () => {

  }

  return (
    <div className="App">
      <div className='modal'>
      <div className='modal-container'>
        <span className="close">&times;</span>
        <input type='text' id='city-input' list='cities-list' onChange={handleSeach}></input>
        {/* <label htmlFor='city-input'> City: {city} */}
        {/* </label> */}
        <br />
        {/* <label > Country: {country} */}
          {/* <input type='text'  value={country} disabled={city === ''} ></input> */}

        {/* </label> */}

        <ul className='items-list'>
          {
            searchResults.map((el) => {
              return <li className='location-item-container'
                onClick={() => handleSelect(el)}
                key={nanoid()}
              >{el.country}, {el.city}</li>
            })
          }
        </ul>
        </div>
      </div>
    </div>

  )
}

export default App
