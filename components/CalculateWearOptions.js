import {useState} from 'react'

export default function CalculateWearOptions({baseGen, genderWear}){
    let option = ''
    let res = []
    genderWear[baseGen].map((item, i) => {
        let currOption = item[0]
            if(option !== currOption){
              option = currOption;
              {res.push(
               <label key = {i}>{currOption}
                 <select key={i}>
                   {genderWear[baseGen].map((item, i) => { 
                       console.log(item[0], "item")
                       console.log(currOption)
                       if(item[0] === currOption){
                        return <option>{item[1]}</option>
                       }  
                    })}
                 </select>
            </label>)}
          }
      })    
    return(res)
}