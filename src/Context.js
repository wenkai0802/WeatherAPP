import React,{ useContext, useState } from "react";
import CountryList from "./data/countryList";

const AppContext = React.createContext();

const AppProvider = ({children})=>{
    const [CountryInput,setCountryInput] = useState("");
    const [StateList,setStateList] = useState([])
    const [weatherObj,setWeatherObj] = useState(null);
    const [selectedState,setSelectedState]=useState(null);
    return <AppContext.Provider value={{CountryInput,setCountryInput,StateList,setStateList,weatherObj,setWeatherObj,selectedState,setSelectedState}}>
        {children}
    </AppContext.Provider>
}
const useAppContext = ()=>useContext(AppContext);
export default AppProvider
export {useAppContext}
