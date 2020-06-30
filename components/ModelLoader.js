{ /* import React, {useState, useMemo} from 'react'
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader'

export default function Model({...props}) {
    const [glb, set] = useState()
    useMemo(() => new GLTFLoader().load(props.url, set), [props.url])
    if(glb)(console.log(glb.scene.children[0].children[0].children))
    return glb ? <primitive object={glb.scene} position = {props.position} scale = {props.scale} castShadow  /> : null
} */}
import React, {useMemo} from 'react'
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader'

export default function Model({...props}){
  let model

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
        let item = element.name.split('_')//name
        if(wear.hasOwnProperty(item[1])){
            wear[item[1]].push([item[0], `${item[2]} ${item[3]}`, element])
        } else{
          for(let key in wear){
            wear[key].push([item[0], `${item[2]} ${item[3]}`, element])
          }
        }
      }
    }) 
    props.onWearLoaded(wear)
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