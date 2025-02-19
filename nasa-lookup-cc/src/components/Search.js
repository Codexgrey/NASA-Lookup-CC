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
        <div className="Search">
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


/*
    Resolved the following fetching and performance issues
    - Initially used useState in App.js to store selectedAsset, but when navigating to /asset/:id, 
      the page refreshes, and selectedAsset resets to null. 
      This results in AssetDetail not receiving any asset data.
      Also, Search.js was not passing onSelectAsset to update selectedAsset.

        * Search.js: Decided on using navigate hook when navigating to /asset/:id 
        * AssetDetail.js: The component now fetches asset details dynamically using useParams,
          no need for {asset} in App.js.
        * Performance improvements: The component now fetches asset details only when the asset ID changes,
          reducing unnecessary API requests; Using useEffect hook to fetch dynamically on ID changes.
        
        - Implemented conditional rendering to display a message when no asset is provided.
        - Rendered image if asset contains media links.
        - Used Axios for making API requests.
*/