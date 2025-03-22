import React,{useState,useEffect} from 'react'
import axios from 'axios';

function DataTable({type,refreshData }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    // const [filterType, setFilterType] = useState("total");

    // Fetch stored data
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5002/data/get");
      const data = response.data;
      const filteredData = data.filter((item) => item.__EMPTY !== "name");
      setData(filteredData);
      setFilteredData(filteredData); 

    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
 console.log(data);
  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    fetchData();
}, [refreshData]);

  const handleFilterChange = (type) => {
   
    if (type === "total") {
      setFilteredData(data);
    } else if (type === "present") {
      setFilteredData(data.filter((item) => item.__EMPTY_4 === true));
    } else if (type === "absent") {
      setFilteredData(data.filter((item) => item.__EMPTY_4 === false));
    }
  };

  useEffect(() => {
    handleFilterChange(type);
  }, [type]);
  return (
    <div className='datatable w-100 p-3 d-flex  align-items-center justify-content-center'>
           
           <table className='table table-striped table-bordered w-75'>
                <thead className='text-center'>
                    <th>
                        Sl No
                    </th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Place</th>
                    <th>Punch Date</th>
                    <th>Status</th>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item["Table - Employee"]}</td>
                            <td>{item["__EMPTY"]}</td>
                            <td>{item["__EMPTY_1"]}</td>
                            <td>{item["__EMPTY_5"] == "today date" ? "Today" : "Yesterday"}</td>
                            <td>{item["__EMPTY_4"] ? "Present" : "Absent"}</td>
                 
                    </tr>))}
  
                </tbody>
           </table>
    </div>
  )
}

export default DataTable