{ /* import React, {useState, useMemo} from 'react'
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader'

export default function Model({...props}) {
    const [glb, set] = useState()
    useMemo(() => new GLTFLoader().load(props.url, set), [props.url])
    if(glb)(console.log(glb.scene.children[0].children[0].children))
    return glb ? <primitive object={glb.scene} position = {props.position} scale = {props.scale} castShadow  /> : null
} */}
import CreateGenderSelects from './GenderSelect'
import CalculateWearOptions from './CalculateWearOptions'

export default function Model({...props}){
  const wear = {
    M : [],
    F : [],
    A : []
  }
  let gen = {
    M : "Male",
    F : "Female",
    A : "Andriod"
  }

  props.str.forEach( element => {
    let item = element.split('_')
    if(wear.hasOwnProperty(item[1])){
        wear[item[1]].push([item[0], `${item[2]} ${item[3]}`, element])
    } else{
      for(let key in wear){
        wear[key].push([item[0], `${item[2]} ${item[3]}`, element])
      }
    }
  })
    return (
    <div>
      <CreateGenderSelects genders = {gen} wear={wear}/>
      </div>
    )
}