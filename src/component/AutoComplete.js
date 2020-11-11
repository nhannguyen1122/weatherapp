import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import {GoSearch} from "react-icons/go";
import PropTypes from 'prop-types'; // ES6

const AutoCompleteComponent =props => {
    const {setResult,result,setLoading}=props;    
    const [value,setValue]=React.useState("");
    const inputRef=useRef(null);
    const handleChange=e=>{
        const{value}=e.target;
        setValue(value);
    }
    useEffect(()=>{
      inputRef.current.focus();
    },[])
    const handleSubmit=async(e)=>{
        e.preventDefault();
      if(value){
        setLoading(true);
        try{
          let fetchData= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&APPID=7c006c15d8315f8459cf24360bd1f96d`);
         if(fetchData.status===200){
          let fetchForcast= await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${value}&units=metric&APPID=7c006c15d8315f8459cf24360bd1f96d`);
          const{list}=fetchForcast.data;
          let fetchPhoto=await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${value}&client_id=MjnJCpNWLPTSaBuEb7HGq5E3mNcSlDkNyEwxEa4ISFU`);
          const{results}=fetchPhoto.data;
          const{data}=fetchData;
          sessionStorage.setItem('localsearchResult',JSON.stringify(data));
          sessionStorage.setItem('localforecast',JSON.stringify(list));
          sessionStorage.setItem('localimg',results[0].urls.full);
          setResult({...result,searchResult:data,img:results[0].urls.full,forecast:list});
          setTimeout(()=>setLoading(false),1500);
         }
         else{
          setResult({...result,searchResult:'',img:'',forecast:[]});
         }
        }
        catch(err){
          setTimeout(()=>setLoading(false),1500);
          setResult({...result,searchResult:'',img:'',forecast:[]});
        }
       setValue("");
       inputRef.current.focus();
      }
      else{
        alert('blank bro! please enter something');
        inputRef.current.focus();
      }


    }
    return (
      <div>
        <h1 className="container__title">Weather App</h1>
        <form  onSubmit={handleSubmit} className="autocomplete" >
            {/* <div className="autocomplete__icon"><GoLocation/></div> */}
            <input type="text" 
            ref={inputRef}
            value={value}
            className="autocomplete__input"
            onChange={handleChange}
            placeholder="Enter location"/>
            <button className="autocomplete__button" type="submit"><GoSearch/></button>
        </form >
        </div>
    );
}

export default AutoCompleteComponent ;
AutoCompleteComponent.propTypes={
  setResult:PropTypes.func,
  result:PropTypes.shape({
    searchResult:PropTypes.object,
    img:PropTypes.string,
    forecast:PropTypes.array
}),
  setLoading:PropTypes.func,
}