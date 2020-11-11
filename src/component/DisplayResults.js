import React, { useEffect } from 'react';
import "../sass/main.scss";
import { WiStrongWind,WiHumidity} from 'react-icons/wi';
import { FaTemperatureHigh } from "react-icons/fa";
import LoadingComponent from './LoadingComponent';
import PropTypes from 'prop-types'; // ES6
const DisplayResults = props => {
    const {result,loading,list,setResult,setLoading} = props;
    let localsearchResult=JSON.parse(sessionStorage.getItem('localsearchResult'));
    let localforecast=JSON.parse(sessionStorage.getItem('localforecast'));
    let localimg=sessionStorage.getItem('localimg');
    const{img,searchResult}=result;
    useEffect(()=>{
        setLoading(true);
        setResult({...result,searchResult:localsearchResult,img:localimg,forecast:localforecast})
        let timeout= setTimeout(()=>setLoading(false),1500);
        return ()=>clearTimeout(timeout);
    },[])
    // const{temp}=main;
    return (
        <div className="card">
            <img className="card__img" 
                src={img?img:'https://images.unsplash.com/photo-1541336528065-8f1fdc435835?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'}
                alt='img'/>
            {searchResult!==null&&<>
                <div className="card__section1">
                <div className="card__section1__titlesection">
                    <h1>{Object.keys(searchResult).length>0&&searchResult.name}</h1>
                    <h2>{Object.keys(searchResult).length>0&&searchResult.weather[0].description}</h2>
                        <h3>{Object.keys(searchResult).length>0?<>{searchResult.main.temp.toFixed(0)}<span className="temp">o</span></>:'not found'}</h3>    
                </div>
            </div>
            <div className="card__section2">
            {Object.keys(searchResult).length>0&&<ul className="card__section2__ulsection1">
                    <li className="card__section2__ulsection1-li">
                        <div><img alt="status" className="card__section2__ulsection1-li__img"
                        src={`http://openweathermap.org/img/w/${searchResult.weather[0].icon}.png`}/></div>
                    </li>
                    <li className="card__section2__ulsection1-li">
                            
                        <div><WiStrongWind/>{searchResult.wind.speed}</div>
                        <div>deg:{searchResult.wind.deg}</div>
                    </li>
                    <li className="card__section2__ulsection1-li">
                        <span><WiHumidity/></span>
                        <span>{searchResult.main.humidity}</span>
                    </li>
                    <li className="card__section2__ulsection1-li">
                        <div><FaTemperatureHigh/>Max:{searchResult.main.temp_max}</div>
                        <div><FaTemperatureHigh/>Min:{searchResult.main.temp_min}</div>
                    </li>
                    
                </ul>  }
                
                {list.length>0&&<><ul className="card__section2__ulsection2">{list.map((item, index) =>{
                    let newdtd=(item.dt_txt.split(' ')[0]).split("-").slice(1).reverse().join("-");
                    
                    return  <li className="card__section2__ulsection2-li"  key={index}>
                        <h4>{newdtd}</h4>
                        <div><img alt="temp" src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}/></div>
                        <div className="card__section2__ulsection2-li__icon"> {item&&parseFloat(item.main.temp).toFixed(0)}<span
                         className="card__section2__ulsection2-li__icon card__section2__ulsection2-li__icon--temp">o</span></div>
                      
                    </li>
           
                }
                )}</ul></>}
               
            
        </div>
            </>}
        {loading&&<LoadingComponent/>}
        </div>
    );
}

export default DisplayResults;

DisplayResults.propTypes={
    result:PropTypes.shape({
        searchResult:PropTypes.object,
        img:PropTypes.string,
        forecast:PropTypes.array
    }),
    loading:PropTypes.bool,
    list:PropTypes.array,
    setResult:PropTypes.func,
    setLoading:PropTypes.func,
}
