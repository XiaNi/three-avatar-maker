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

function CalculateWearOptions(selectedGender, genderWear, selectedWear, onChange) {
  //console.log(selectedGender)
  let option = ''
  let res = []
  const slots = new Set(genderWear[selectedGender].map(w => w.slot))

  slots.forEach(currSlot => {
    res.push(
      <label key={ currSlot }>{ currSlot }
        <select onChange={ e => onChange(currSlot, e.target.value) } value={ selectedWear[currSlot] }>
          { genderWear[selectedGender].map((item, i) => {
            if (item.slot === currSlot) {
              return <option value={ item.key } key={ i }>{ item.title }</option>
            }
          }) }
        </select>
      </label>)
  })
  return (res)
}
