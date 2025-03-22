import React,{useState} from 'react'
import '../styles/countercards.css'
function CounterCards({total,present,absent,setType}) {

  return (
    <div className='countercards w-75 p-3 '>
           <div className="row row-cols-1 row-cols-md-3 g-4" >  
              <div className="col card-cover" onClick={() => setType("total")} >
                <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">Total</h5>
                        <h1 className="card-text">{total}</h1>
                    </div>
                </div>
            </div> 
            <div className="col card-cover" onClick={() => setType("present")} >
                <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">Present</h5>
                        <h1 className="card-text">{present}</h1>
                    </div>
                </div>
            </div>  
            <div className="col card-cover" onClick={() => setType("absent")} >
                <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">Absent</h5>
                        <h1 className="card-text">{absent}</h1>
                    </div>
                </div>
            </div>  
       
         </div> 
    </div>
  )
}

export default CounterCards