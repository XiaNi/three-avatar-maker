import * as THREE                                        from 'three'
import React, { Suspense, useRef, useState }             from 'react'
import { Canvas, useLoader, useThree, useFrame, extend } from 'react-three-fiber'
import { OrbitControls }                                 from '../node_modules/three/examples/jsm/controls/OrbitControls'
import Model                                             from '../components/ModelLoader'
import GenderSelects                                     from '../components/GenderSelect'

extend({ OrbitControls })

function Plane({ ...props }) {
  // <meshLambertMaterial attach="material" color="#ff0000" transparent={false} opacity={0.2} />
  return (
    <mesh { ...props } receiveShadow>
      <planeGeometry attach="geometry" args={ [1000, 1000, 1, 1] }/>
      {/* <shadowMaterial attach="material" /> */ }
      <meshStandardMaterial attach="material" color={ 0x00ff00 } side={ THREE.DoubleSide } transparent={ false }
                            opacity={ 1 }/>
    </mesh>
  )
}

function ShadowPlane({ ...props }) {
  return (
    <mesh {...props} receiveShadow>
      <planeGeometry attach="geometry" args={[100, 100, 1, 1]} />
      <shadowMaterial attach="material" opacity={0.5} />
    </mesh>
  )
}

function Panorama({ ...props }) {
  const texture = useLoader(THREE.TextureLoader, 'panorama/pano_bg.jpg')
  return (
    <mesh { ...props }>
      <sphereGeometry attach="geometry" args={ [10, 32, 32] }/>
      <meshBasicMaterial map={ texture }
                         side={ THREE.BackSide }
                         attach="material"/>
    </mesh>
  )
}

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement }
  } = useThree()
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef()
  useFrame((state) => controls.current.update())
  return <orbitControls ref={ controls } args={ [camera, domElement] }/>
}

const genders = {
  M: 'Male',
  F: 'Female',
  A: 'Android'
}
export default function Home() {

  let [wear, setWear] = useState({
    byGender: {
      M: [],
      F: [],
      A: []
    },
    selectedOptions: { gender: 'F' }
  })
  console.log('re-render --------- HOME -------- ')

  function getDefaultsByGender(gender, genderWear) {
    const newSelectedOptions = { gender: gender }
    genderWear.forEach(wearInfo => {
      const currOption = newSelectedOptions[wearInfo.slot]
      if (!currOption) {
        newSelectedOptions[wearInfo.slot] = wearInfo.key
      }
    })

    return newSelectedOptions
  }

  function onWearLoaded(newWear) {
    setWear({
      byGender: newWear,
      selectedOptions: getDefaultsByGender(wear.selectedOptions.gender, newWear[wear.selectedOptions.gender])
    })
  }

  function onWearChange(slot, value) {
    setWear((wear) => {
      let newSelectedOptions = { ...wear.selectedOptions }
      if (slot === 'gender') {
          newSelectedOptions = getDefaultsByGender(value, wear.byGender[value])
      } else {
        newSelectedOptions[slot] = value
      }

      return {
        ...wear,
        selectedOptions: newSelectedOptions
      }
    })
  }

  const genderSelectsStyles = {
    position: 'absolute',
    zIndex: 200,
    backgroundColor: 'white'
  }

  const avatarScale = 4
  const d = 8.25

  return (
    <>
      <div style={ genderSelectsStyles }>
        <GenderSelects genders={ genders } wear={ wear.byGender } selectedWear={ wear.selectedOptions }
                       onChange={ (slot, value) => {onWearChange(slot, value)} }/>
      </div>
      <Canvas
        camera={{ position: [0, 1, 7] }}
        shadowMap
        //pixelRatio={window.devicePixelRatio}
      >
        <CameraControls/>
        <fog attach="fog" args={ [0xdfdfdf, 35, 65] }/>

        <ambientLight
          color={ 0xffffff }
          intensity={ 0.25 }
        />
        <directionalLight
          color={ 0xffffff }
          position={ [-8, 12, 8] }
          shadow-camera-left={ d * -1 }
          shadow-camera-bottom={ d * -1 }
          shadow-camera-right={ d }
          shadow-camera-top={ d }
          shadow-camera-near={ 0.1 }
          shadow-camera-far={ 1500 }
          castShadow
        />
        <directionalLight
          color={ 0xffffff }
          intensity={ 0.7 }
          position={ [8, -12, -8] }
        />

        <Suspense fallback={ null }><Panorama/></Suspense>
        <group position={[0, -4, 0]}>
          <Suspense fallback={ null }>
            <Model url={ '/models/Characters.glb' } position={ [0, 0, 0] } scale={[avatarScale, avatarScale, avatarScale]}
                   onWearLoaded={ (newWear) => {onWearLoaded(newWear)} } selectedWear={ wear.selectedOptions }
                   castShadow />
          </Suspense>
          <ShadowPlane rotation={ [ -Math.PI / 2, 0, 0] } position={ [0, 0, 0] } />
        </group>

      </Canvas>
    </>
  )
}
