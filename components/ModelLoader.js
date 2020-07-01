{ /* import React, {useState, useMemo} from 'react'
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader'

export default function Model({...props}) {
    const [glb, set] = useState()
    useMemo(() => new GLTFLoader().load(props.url, set), [props.url])
    if(glb)(console.log(glb.scene.children[0].children[0].children))
    return glb ? <primitive object={glb.scene} position = {props.position} scale = {props.scale} castShadow  /> : null
} */}
import React, {useMemo, useState} from 'react'
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader'

export default function Model({...props}){
  //let model
  const [model, set] = useState()

  useMemo(() => new GLTFLoader().load(props.url, loop), [props.url])
  
  function loop(model){
    const wear = {
      M : [],
      F : [],
      A : []
    }
    let meshes = model.scene.children[0].children[0].children
    meshes.forEach( element => {
      if(!element.isGroup || !element.isMesh){
        let nameParts = element.name.split('_')//name
        let slot = nameParts[0]
        let gender = nameParts[1]
        let optionName = nameParts[2]
        let LOD = nameParts[3]
      
        if(wear.hasOwnProperty(gender)){
            wear[gender].push({slot, key: element.name, title : optionName, LOD: LOD, element})
        } else{
          for(let key in wear){
            wear[key].push({slot, key: element.name, title: gender, LOD : optionName, element})//// title is gender, LOD is optionName
          }
        }
      }
    }) 
    props.onWearLoaded(wear)
    set(model)
  }
  if(model) {
    model.scene.children[0].children[0].children.forEach( element => {
      let [slot] = element.name.split('_')
      element.visible = props.selectedWear[slot] === element.name
    })
  }
  return model ? <primitive object={model.scene} position = {props.position} scale = {props.scale} castShadow  /> : null

  //loop(props)

  //return(CreateGenderSelects(gen, wear))
  //const [glb, set] = useState()
    //useMemo(() => new GLTFLoader().load(props.url, loop), [props.url])
    //if(glb)(loop(glb.scene.children[0].children[0].children))
    //return glb ? <primitive object={glb.scene} position = {props.position} scale = {props.scale} castShadow  /> : null
    //return null
}