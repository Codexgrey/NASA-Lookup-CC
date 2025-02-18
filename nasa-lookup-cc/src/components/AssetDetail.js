import React from "react";

// component to display details of a selected NASA asset
const AssetDetail = ({ asset }) => {
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

// export the component for use in other parts of the apps
export default AssetDetail; 
