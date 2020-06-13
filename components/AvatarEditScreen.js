import ReactDOM                    from "react-dom"
import React, { Suspense, useRef } from "react"
import { Canvas, useLoader }       from "react-three-fiber"
import AvatarBody            from "./AvatarBody"
import { getMousePos }       from "../lib/utils"
import * as THREE            from 'three'

function Plane({ ...props }) {
  return (
    <mesh {...props} receiveShadow>
      <planeGeometry attach="geometry" args={[50, 50, 1, 1]} />
      <meshLambertMaterial attach="material" color="#ff0000" transparent={false} opacity={0.2} />
    </mesh>
  )
}

function Panorama({ ...props }) {
  const texture = useLoader(THREE.TextureLoader, "panorama/pano_bg.jpg")
  return (
    <mesh {...props}>
      <sphereGeometry attach="geometry" args={[50, 50, 50]} />
      <meshBasicMaterial   map={texture}
                             side={THREE.BackSide}
                             attach="material" />
    </mesh>
  )
}

export default function AvatarEditScreen({ selectedOptions }) {
  const d = 8.25
  const mouse = useRef({ x: 0, y: 0 })
  const avatarScale = 1.7

  const updateMousePosition = e => {
    mouse.current = getMousePos(e)
    mouse.current.y += (window.innerHeight / 2) * 0.5
  }

  if (window) {
    window.addEventListener('mousemove', updateMousePosition)
  }

  // onMouseMove={updateMousePosition}

  return (
    <Canvas
      shadowMap
      pixelRatio={window.devicePixelRatio}
      camera={{ position: [0, 1, 7] }}>

      <fog attach="fog" args={[0xdfdfdf, 35, 65]} />

      <ambientLight
        color={0xffffff}
        intensity={0.25}
        />
      <directionalLight
        color={0xffffff}
        position={[-8, 12, 8]}
        shadow-camera-left={d * -1}
        shadow-camera-bottom={d * -1}
        shadow-camera-right={d}
        shadow-camera-top={d}
        shadow-camera-near={0.1}
        shadow-camera-far={1500}
        castShadow
      />
        <directionalLight
  color={0xffffff}
  intensity={0.7}
  position={[8, -12, -8]}
  />
      <Suspense fallback={null}>
        <Panorama />
      </Suspense>
      <group position={[0, -4, 0]}>
        <AvatarBody mouse={mouse} selectedOptions={selectedOptions} castShadow scale={[avatarScale, avatarScale, avatarScale]} />
      </group>
    </Canvas>
  )
}
