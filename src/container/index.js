import React from 'react';
import AutoCompleteComponent from '../component/AutoComplete';
import DisplayResults from '../component/DisplayResults';
import useArray from '../customHooks';
const WeatherContainer = () => {
    const[result,setResult]=React.useState({
        searchResult:{},
        img:"",
        forecast:[]
    });
    let list=useArray(result.forecast);
    const[loading,setLoading]=React.useState(false);

    return (
        <div className="container">
            <AutoCompleteComponent
            result={result}
            setLoading={setLoading}
            setResult={setResult}/>
            <DisplayResults
            result={result}
            loading={loading}
            setResult={setResult}
            setLoading={setLoading}
            list={list}
            />
            
        </div>
    );
}

export default WeatherContainer;
