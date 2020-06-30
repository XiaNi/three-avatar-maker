import CalculateWearOptions from './CalculateWearOptions'
import React, { useState } from 'react'

export default function CreateGenderSelects({genders, wear}) {
  let [currGender, setCurrGender] = useState('M')
  return ( 
    <div>
      <label > Gender 
        <select onChange = { (e) => { setCurrGender(e.currentTarget.value)} } > 
          { Object.keys(genders).map((item, i) => < option key = { i } value = { item } > {genders[item]} </option>)} 
        </select>
      </label> 
      { CalculateWearOptions(currGender, wear)}
    </div>
  )
}