import CalculateWearOptions from './CalculateWearOptions'
export default function CreateGenderSelects(props) {

  console.log(props)
  return ( 
    <div>
      <label > Gender 
        <select onChange = { (e) => { CalculateWearOptions(e.currentTarget.value, props.wear)} } > 
          { Object.keys(props.genders).map((item, i) => < option key = { i } value = { item } > {props.genders[item]} </option>)} 
        </select>
      </label> 
      <CalculateWearOptions baseGen = {"F"} genderWear = {props.wear}/> 
    </div>
  )
}