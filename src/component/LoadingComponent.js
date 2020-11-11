import React from 'react';
import loading from "../loading/icon1.gif";
const LoadingComponent = () => {
    return (
        <div className="card__loadingcomponent">
            <img  alt="loading"src={loading} className="card__loadingcomponent__img"/>
        </div>
    );
}

export default LoadingComponent;
