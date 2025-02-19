import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// axios for making HTTP requests
import axios from "axios"; 



// component to search and display results
const Search = () => {
    /*
    state [query]: to store the search query input by the user
    state [results]: to store the search results fetched from the NASA API
    */ 
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    // useNavigate hook to navigate to asset details page
    const navigate = useNavigate(); 
  
    // function to fetch assets from the NASA API
    const searchAssets = async () => {
        try {
            // API endpoint with search query and media type filter
            const response = await axios.get(
            `https://images-api.nasa.gov/search?q=${query}&media_type=image,video,audio` 
            );
            // update the results state with fetched data
            setResults(response.data.collection.items); 
        } catch (error) {
            // log request errors
            console.error("Error fetching data from NASA API", error); 
        }
    };
  

    return (
        <div>
            {/* input field for user's search query */}
            <input 
                type="text"
                value={query}                                 // controlled input field with state binding
                onChange={(e) => setQuery(e.target.value)}    // updates query state on user input
                placeholder="Search for assets..."           
            />
            
            {/* button to trigger the searchAssets */}
            <button onClick={searchAssets}>Search</button>

  
            {/* display search results */}
            <div>
                {results.map((item) => (                    // each result must have a unique id 
                    <div key={item.data[0].nasa_id} onClick={() => navigate(`/asset/${item.data[0].nasa_id}`)}>      
                        <h3>{item.data[0].title}</h3>       {/* display asset title */}
                        <p>{item.data[0].description}</p>   {/* display asset description */}

                        {/* render media if available */}
                        {item.links && (
                            <img
                            src={item.links[0].href}        // image URL from API response
                            alt={item.data[0].title}        // Alt text for accessibility
                            style={{ width: "200px" }}      // set width for images
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

};
  
// export component for external use
export default Search; 
