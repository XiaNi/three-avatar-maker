import CalculateWearOptions from './CalculateWearOptions'
import React, { useState } from 'react'

export default function GenderSelects({genders, wear, selectedWear, onChange}) {

  return ( 
    <div>
      <label > Gender 
        <select value={selectedWear.gender} onChange = { (e) => { onChange('gender', e.currentTarget.value)} } > 
          { Object.keys(genders).map((item, i) => < option key = { i } value = { item } > {genders[item]} </option>)} 
        </select>
      </label> 
      { CalculateWearOptions(selectedWear.gender, wear, selectedWear, onChange)}
    </div>
  )
}