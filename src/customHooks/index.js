import  { useEffect, useState } from 'react';
// dt_txt: "2020-11-08 06:00:00"
function useArray(arr){
    const[newArr,pushArr]=useState([]);
    let mapArr=arr!==null?arr.filter(item=>(parseInt((item.dt_txt.split(' ')[1]).split(':')[0])===12)):[];
    useEffect(() => {
       pushArr(mapArr);
    }, [arr]);
    return newArr;
}
export default useArray;
