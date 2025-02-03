import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";


const HomePage = () => {
  const [formData, setFormData] = useState({ items: [] });
  const [searchVal, setSearchVal] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortData,setsortData]=useState('asc');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/search/repositories?q=Q"
        );
        if (response.data && response.data.items) {
          setFormData({ items: response.data.items });
          setFilteredItems(response.data.items); 
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    if (searchVal === "") {
      setFilteredItems(formData.items);
      return;
    }
    const filtered = formData.items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchVal.toLowerCase()) ||
        (item.language && item.language.toLowerCase().includes(searchVal.toLowerCase()))
    );
    setFilteredItems(filtered);
  }    

const handleSort=(e)=>{
  const order=e.target.value;
    setsortData(order);
    const sortedArray = [...filteredItems].sort((a,b) => 
      order === 'asc' ? a.forks - b.forks:b.forks-a.forks
    );
    setFilteredItems(sortedArray)
    

    
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
          />
        </div>
        <div className="navbar-search">
          <input
            onChange={(e) => setSearchVal(e.target.value)}
            type="text"
            placeholder="Search repositories..."
          />
          <button onClick={handleSearch}>Search</button>
          {/* <button onClick={handleSort}>Sort</button> */}
          <select onChange={handleSort} value={sortData}>
            <option value='asc'>asc</option>
            <option value='dsc'>To Bottom </option>
          </select>
        </div>
      </nav>

      <div className="container">
        <div className="c1">
          <div className="c11">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div key={item.id} className="c111">
                  <h3>{item.name}</h3>
                  <p>Owner:{item.owner.login}</p>
                  <p>{item.description}</p>
                  <p>Language:{item.language}</p>
                  <p>Forks:{item.forks}</p>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
