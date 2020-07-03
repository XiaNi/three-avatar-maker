import { Group }                  from 'three'

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
  const [models, setModels] = useState({ full: null, bestQuality: [] })

  useMemo(() => new GLTFLoader().load(props.url, parseWearables), [props.url])

  function parseWearables(model){
    const wear = {
      M : [],
      F : [],
      A : []
    }
    const LODLEVELS = ['Base', 'LOD0', 'LOD1', 'LOD2']

    const bestQuality = []
    const meshes = model.scene.children[0].children
    const bestResolution = new Map()

    meshes.forEach(element => {
      if(!element.isBone){
        const nameParts = element.name.split('_') //name
        const slot = nameParts[0]
        const gender = nameParts.length === 4? nameParts[1] : null
        const optionName = nameParts.length >= 3? nameParts[nameParts.length - 2] : slot
        const LOD = nameParts[nameParts.length-1]
        const LODLevel = LODLEVELS.indexOf(LOD)

        const elementInfo = {
          slot,
          key: element.name,
          title: optionName,
          LOD,
          LODLevel,
          gender,
          element
        }

        element.visible = false
        element.userData.info = elementInfo

        const fullOptionKey = `${slot + "_" + gender + "_" + optionName}`
        const knownOption = bestResolution.get(fullOptionKey)
        if (!knownOption || knownOption.LODLevel > LODLevel) {
          bestResolution.set(fullOptionKey, elementInfo)
        }
     }
    })

    bestResolution.forEach(elementInfo => {

      if (elementInfo.gender && wear.hasOwnProperty(elementInfo.gender)) {
        wear[elementInfo.gender].push(elementInfo)
      } else {
        // add wearable in all genders lists
        for (let key in wear) {
          wear[key].push(elementInfo)
        }
      }

      elementInfo.element.castShadow = true
      bestQuality.push(elementInfo)
    })

    console.log('wear', wear)
    console.log('bestQuality', bestQuality)

    props.onWearLoaded(wear)
    setModels({
      full: model,
      bestQuality: bestQuality
    })
  }


  if(models.full && models.bestQuality) {
    //console.log(props.selectedWear)
    //console.log(model.scene.children[0].children)
    models.bestQuality.forEach( info => {
      const child = info.element
      const slot = info.slot
      const wearInSlot = props.selectedWear[slot]

      // if (wearInSlot) {
      //   console.log(info)
      //   console.log(slot, child.name, wearInSlot.key, wearInSlot.key === child.name)
      // }
      child.visible = wearInSlot === child.name
    })

    console.log('visible')
    console.log(models.bestQuality.map(info => { return [ info.element.visible, info.key ] }))
    // model.scene.children[0].children.forEach( element => {
    //   let [slot] = element.name.split('_')
    //   console.log(slot,element.name, props.selectedWear[slot] )
    //   element.visible = props.selectedWear[slot] && props.selectedWear[slot].key === element.name
    // })
  }
  return models.full ? <primitive object={models.full.scene} position = {props.position} scale = {props.scale} castShadow  /> : null

  //loop(props)

  //return(CreateGenderSelects(gen, wear))
  //const [glb, set] = useState()
    //useMemo(() => new GLTFLoader().load(props.url, loop), [props.url])
    //if(glb)(loop(glb.scene.children[0].children[0].children))
    //return glb ? <primitive object={glb.scene} position = {props.position} scale = {props.scale} castShadow  /> : null
    //return null
}
