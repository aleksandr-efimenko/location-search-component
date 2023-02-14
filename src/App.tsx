import { ChangeEvent, useMemo, useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import data from '../node_modules/all-countries-and-cities-json/countries.min.json';

type CitiesWithCountry = {
  city: string
  country: string,
}

function App() {
  const [searchText, setSearchText] = useState('');
  const citiesWithCountry: CitiesWithCountry[] = Object.entries(data).map(([country, cities]) =>
    cities.map(city => {
      return {
        country: country,
        city: city
      }
    })
  ).flat();

  const searchResults: CitiesWithCountry[] = useMemo(() => {
    if (!searchText)
      return [] as CitiesWithCountry[];

    const cities = citiesWithCountry.filter((el) =>
      el.city.toLowerCase().includes(searchText.toLowerCase())
    ).slice(0, 10);
    //Filter duplicates
    return cities.filter((tag,index, array) => array.findIndex(t=> t.city === tag.city && t.country === tag.country) === index)
  }, [searchText])

  const handleSeach = (e: ChangeEvent<HTMLInputElement>) => {
    // if (e.target.value)
    setSearchText(e.target.value);
  }

  return (
    <div className="App">
      <div className='modal-container'>
        <input type='text' onChange={handleSeach}></input>
      </div>
      <div>
        <ul>
          {
            searchResults.map((el) => {
              return <li key={nanoid()}>{el.country}, {el.city}</li>
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default App
