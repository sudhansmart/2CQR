import React,{useState,useEffect} from 'react'
import CounterCards from '../components/CounterCards'
import '../styles/datascreen.css'
import DataTable from '../components/DataTable'
import UploadExcel from '../components/UploadExcel'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function DataScreen() {
    const navigate = useNavigate();
    const[total,setTotal] = useState(0);
    const[present,setPresent] = useState(0);
    const[absent,setAbsent] = useState(0);
    const [type,setType]= useState("total");
    const [refreshData, setRefreshData] = useState(false);


   //  function to fetch data    
    const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:5002/data/get");
          const data = response.data;
          const filteredData = data.filter((item) => item.__EMPTY !== "name");
       
          setTotal(filteredData.length);
          setPresent(filteredData.filter((item) => item.__EMPTY_4 === true).length);
          setAbsent(filteredData.filter((item) => item.__EMPTY_4 === false).length);
    
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };
   
      useEffect(() => {
        fetchData();
      }, []);

          // Function to notify ThirdChild to re-fetch data
    const handleDataUpdate = () => {
        setRefreshData((prev) => !prev); 
        fetchData();
    };

  return (
    <div className='datascreen'>
        <div className='w-75 p-2 text-end'>
           <button className='exit-btn' onClick={() => navigate('/')}>Exit</button>
        </div> 
        <h1>2CQR</h1>
        <CounterCards total={total} present={present} absent={absent} setType={setType}/>
        <UploadExcel onUploadSuccess={handleDataUpdate}/>
        <DataTable type={type}  refreshData={refreshData}/>    
    </div>
  )
}

export default DataScreen