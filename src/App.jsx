import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  
  const [countrylist, setCountrylist] = useState([])
  const [statelist, setStatelist] = useState([])
  const [citylist, setCitylist] = useState([])

  const [country, setCountry] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  
  
    useEffect(() => {
      const fetchCountries = async () => {
        try {
          const res = await axios.get("https://crio-location-selector.onrender.com/countries")
          console.log(res.data)
          setCountrylist(res.data)
        } catch (error) {
          console.error("Error fetching data:", error)
          setCountrylist(["Failed to load countries"])
        }
      }
      fetchCountries()
    }, [])


    useEffect(() => {
      if(country==="") return;
      const selectedCountry = countrylist.find(c=>c===country)
      if(!selectedCountry) return;
      const fetchStates = async () => {
        try {
          const res = await axios.get(`https://location-selector.labs.crio.do/country=${country}/states`)
          console.log(res.data)
          setStatelist(res.data)
        } catch (error) {
          console.error("Error fetching data:", error)
          setStatelist([])
        }
      }
      fetchStates()
    }, [country, countrylist]) 

    useEffect(() => {
      if(state==="") return;
      const fetchCities = async () => {
        try {
          const res = await axios.get(`https://location-selector.labs.crio.do/country=${country}/state=${state}/cities`)
          console.log(res.data)
          setCitylist(res.data)
        } catch (error) {
          console.error("Error fetching data:", error)
          setCitylist([])
        }
      }
      fetchCities()
    }, [state, country])   



  return (
    <>


    <form>

<select name={"country"} value={country} onChange={e=>setCountry(e.target.value)} >
  {countrylist.length === 1 && countrylist[0] === "Failed to load countries" ? null : <option value={""} >Select Country</option>}
  {
    countrylist?.map((c, idx)=>(
      <option key={idx} value={c} >{c}</option>
    ))
  }
</select>

<select name={"state"} value={state} onChange={e=>setState(e.target.value)} >
  <option value={""} >Select State</option>
  {
    statelist.map((s, idx)=>(
      <option key={idx} value={s} >{s}</option>
    ))
  }
</select>

<select name={"city"} value={city} onChange={e=>setCity(e.target.value)} >
  <option value={""} >Select City</option>
  {
    citylist.map((c, idx)=>(
      <option key={idx} value={c} >{c}</option>
    ))
  }
</select>


    </form>

    You selected {city}, {state}, {country}
    </>
  )
}

export default App
