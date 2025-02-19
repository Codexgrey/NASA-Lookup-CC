import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


// component to display details of a selected NASA asset
const AssetDetail = () => {   // fetching asset dynamically, no need for {asset}
    // get asset ID from URL
    const { id } = useParams(); 
    const [asset, setAsset] = useState(null);


    /*
        changed approach of relying on selectedAsset from App.js, 
        fetching the asset data dynamically using useParams instead 
    */
    useEffect(() => {
        const fetchAsset = async () => {
            try {
                const response = await axios.get(`https://images-api.nasa.gov/search?nasa_id=${id}`);
                // set the first item found
                setAsset(response.data.collection.items[0]); 
            } catch (error) {
                console.error("Error fetching asset details", error);
            }
        };
        fetchAsset();

    // fetch new asset when the ID changes
    }, [id]); 


    // if no asset is provided, display a message
    if (!asset) return <div>You haven't selected an asset...</div>;

    return (
        <div>
            <h2>{asset.data[0].title}</h2>      {/* display asset title */}
            <p>{asset.data[0].description}</p>  {/* display asset description */}
           
            {/* render image if asset contains media links */}
            {asset.links && (                   
                <img
                src={asset.links[0].href}       // image source URL from asset
                alt={asset.data[0].title}       // Alt text for accessibility
                style={{ width: "100%" }}       // make image span full width of container
                />
            )}
        </div>
    );
};

// export component for external use
export default AssetDetail; 
