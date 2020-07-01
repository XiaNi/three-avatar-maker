import * as THREE from 'three'
import React, {Suspense, useRef, useState } from 'react'
import NoSSR from 'react-no-ssr'
import { Canvas, useLoader, useThree, useFrame, extend } from 'react-three-fiber'
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls'
import  Model  from '../components/ModelLoader'
import CalculateWearOptions from '../components/CalculateWearOptions'
import GenderSelects from '../components/GenderSelect'
extend({ OrbitControls })

  function Plane({ ...props }) {
    // <meshLambertMaterial attach="material" color="#ff0000" transparent={false} opacity={0.2} />
    return (
      <mesh {...props} receiveShadow>
        <planeGeometry attach="geometry" args={[1000, 1000, 1, 1]} />
        {/* <shadowMaterial attach="material" /> */}
        <meshStandardMaterial attach="material" color = {0x00ff00} side={THREE.DoubleSide} transparent={false} opacity={1} />
      </mesh>
    )
  }

  function Panorama({ ...props }) {
    const texture = useLoader(THREE.TextureLoader, "panorama/pano_bg.jpg")
    return (
      <mesh {...props}>
        <sphereGeometry attach="geometry" args={[5, 32, 32]} />
        <meshBasicMaterial   map={texture}
                               side={THREE.BackSide}
                               attach="material" />
      </mesh>
    )
  }

const CameraControls = () => {
    // Get a reference to the Three.js Camera, and the canvas html element.
    // We need these to setup the OrbitControls component.
    // https://threejs.org/docs/#examples/en/controls/OrbitControls
    const {
      camera,
      gl: { domElement },
    } = useThree();
    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef();
    useFrame((state) => controls.current.update());
    return <orbitControls ref={controls} args={[camera, domElement]} />;
  };


let gen = {
              M : "Male",
              F : "Female",
              A : "Andriod"
            }
export default function Home(){

  let [wear, setWear] = useState({
    M : [],
    F : [],
    A : []
  })
  console.log('re')
  let[selectedOptions, setSelectedOptions] = useState({gender: "F"})

  function onWearLoaded(newWear){
    console.log(newWear)
    setWear(newWear);
    setSelectedOptions(currentOptions => {
      const newSelectedOptions = { ...currentOptions }
      newWear[selectedOptions.gender].forEach( wear => {
        if(wear.LOD === "Base" || wear.LOD === "LOD0"){
          newSelectedOptions[wear.slot] = wear.key
        }
      })
      console.log(newSelectedOptions)
      return newSelectedOptions;
      })
  }
  function onWearChange(slot, value){
    setSelectedOptions(currentOptions => {
      const newSelectedOptions = { ...currentOptions }
      newSelectedOptions[slot] = value
      console.log(newSelectedOptions)
      return newSelectedOptions;
      })
  }
    return(
      <>
    <GenderSelects genders={gen} wear={wear} selectedWear={selectedOptions} onChange={(slot, value)=>{onWearChange(slot, value)}}/>
  <Canvas 
  camera={{ position: [0, 0.1, 0.3] }}
    shadowMap
    //pixelRatio={window.devicePixelRatio}
>
  <CameraControls />
  <fog attach="fog" args={[0xdfdfdf, .5, 10]} />

    <spotLight position={[0, .7, 0]} 
          shadow-mapSize-width = {1024*5} // default
          shadow-mapSize-height = {1024*5} // default
          shadow-bias = {-0.0001}
          shadow-camera-near = {0.1}
          castShadow />
    <Suspense fallback={null}><Panorama /></Suspense>
    <Model url ={ '/models/max_characters/untitled.glb' } position={[0, 0, 0]} scale={[10,10,10]} onWearLoaded={(newWear) => {onWearLoaded(newWear)}} selectedWear={selectedOptions} castShadow></Model>
    <Plane rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0]}></Plane>

    <mesh
  visible
  castShadow
  position={new THREE.Vector3(0.2, 0.3, 0)}
  rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
  geometry={new THREE.SphereGeometry(.1, 16, 16)}
  material={new THREE.MeshStandardMaterial({ color: new THREE.Color('hotpink') })}
/>

  </Canvas>
  </>
    )
}