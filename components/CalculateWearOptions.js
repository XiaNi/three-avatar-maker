
export default function CalculateWearOptions(baseGen, genderWear, selectedWear, onChange){
  console.log(baseGen)
    let option = ''
    let res = []
    genderWear[baseGen].map((item, i) => {
        let currOption = item.slot
            if(option !== currOption){
              option = currOption;
              {res.push(
               <label key = {i}>{currOption}
                 <select key={i} onChange={ e => onChange(item.slot, item.key)} value={selectedWear[currOption]}>
                   {genderWear[baseGen].map((item, i) => { 
                       if(item.slot === currOption){
                        return <option key={i}>{item.title}</option>
                       }  
                    })}
                 </select>
            </label>)}
          }
      })   
    return(res)
}