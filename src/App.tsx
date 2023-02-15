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
    if (cities.length === 0) {
      setCity(searchText)
    } else {
      setCity('')
    }
    //Filter duplicates
    return cities.filter((tag, index, array) => array.findIndex(t => t.city === tag.city && t.country === tag.country) === index)
  }, [searchText])

  const handleSeach = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }

  const handleSelect = (cityWithCountry: CityWithCountry) => {
    console.log('ggggg')
    setCity(cityWithCountry.city)
  }

  const handleCountryEnter = () => {

  }

  return (
    <div className="App">
      <div className='modal-container'>
        <form>
          <label htmlFor='city-input'> City
            <input type='text' id='city-input' list='cities-list' onChange={handleSeach}></input>
          </label>
          <label > Country
            <input type='text'  value={country} disabled={city === ''} ></input>
          </label>

          <datalist onClick={e => handleSelect(searchResults[0])}
            id='cities-list'>
            {
              searchResults.map((el) => {
                return <option
                  value={el.country + ', ' + el.city}
                  key={nanoid()}
                ></option>
              })
            }
          </datalist>
        </form >
      </div>
    </div>

  )
}

export default App
