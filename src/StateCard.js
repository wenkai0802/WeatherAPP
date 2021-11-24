import {useAppContext} from "./Context.js"
const StateCard = ({id,name})=>{
    const {selectedState,setSelectedState} = useAppContext();
    return <div key={id} id={id} className="StateCard" onClick={()=>{setSelectedState(name)}}>
        <h3>{name}</h3>
    </div>
}

export default StateCard;