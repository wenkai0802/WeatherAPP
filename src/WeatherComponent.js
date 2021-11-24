import CancelIcon from '@mui/icons-material/Cancel';
import { useAppContext } from './Context';
const WeatherComponent =  ({name,temp,maxTemp,minTemp,humidity,imgUrl})=>{
    const {selectedState,setSelectedState} =useAppContext();
    return <div className="blackout">
    <div className="weatherComponent">
        
        <img className="imgUrl" src={`https://openweathermap.org/img/wn/${imgUrl}.png`}></img>
        <div className="details">
        <p className="name">Name : {name}</p>
        <p className="temp">Temperature : {temp}c</p>
        <p className="TempRange">Temperature Range : {minTemp}c - {maxTemp}c</p>
        <p className="humidity">Humidity : {humidity}</p>
        </div>
        <span className="cancelBtn" onClick={()=>setSelectedState(null)}><CancelIcon/></span>
    </div>
    </div>
}

export default WeatherComponent