
export default function CalculateWearOptions(baseGen, genderWear){
    let option = ''
    let res = []
    genderWear[baseGen].map((item, i) => {
        let currOption = item[0]
            if(option !== currOption){
              option = currOption;
              {res.push(
               <label key = {i}>{currOption}
                 <select key={i}>
                   <option key={'none'} name={'none'}>None</option>
                   {genderWear[baseGen].map((item, i) => { 
                       if(item[0] === currOption){
                        return <option key={i}>{item[1]}</option>
                       }  
                    })}
                 </select>
            </label>)}
          }
      })   
    return(res)
}