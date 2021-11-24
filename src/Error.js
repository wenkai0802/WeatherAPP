const Error = ({message,clearError})=>{
    return <div className="blackout">
    <div className="error">
        <p>
            {message}
        </p>
        <button className="btn btn-primary" onClick={()=>clearError()}>Okay</button>
    </div>
    </div>
}
export default Error;