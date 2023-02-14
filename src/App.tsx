import { ChangeEvent, useMemo, useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import data from '../node_modules/all-countries-and-cities-json/countries.min.json';

const useLocalStorageValue = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(JSON.parse(localStorage.getItem(key) ?? '') || initialValue);

  const setWithPersist = (value: T) => {
    setValue(value)
    localStorage.setItem(key, JSON.stringify(value));
  }

  return [value, setWithPersist]
}

function App() {
  const [searchText, setSearchText] = useState('');
  const countries = Object.keys(data);
  console.log(Object.values(data))
  // const citiesWithCountry = Object.keys(data).map(key => data[key]).flat();
  const searchResults = useMemo(() => Object.entries(data)
        .filter(([el, cities]) => [el, ...cities].map((entry) => entry.toLowerCase()).includes(searchText.toLowerCase())), [searchText])

  const handleSeach = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(countries);
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
            searchResults.map(([country, cities]) => {
              return <li key={nanoid()}>{country} {cities.join(' ')}</li>
            }).sort()
          }
        </ul>
      </div>
    </div>
  )
}

export default App
