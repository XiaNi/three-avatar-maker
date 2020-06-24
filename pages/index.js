import * as THREE from 'three'
import React, {useState, Suspense, useRef, useMemo} from 'react'
import { Canvas, useLoader, useThree, useFrame, extend } from 'react-three-fiber'
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls'
extend({ OrbitControls })

const renderLoader = () => <p>Loading</p>;

function Model({ url }) {
    const [glb, set] = useState()
    useMemo(() => new GLTFLoader().load(url, set), [url])
    return glb ? <primitive object={glb.scene} position={[0,-3,0]} scale={[200,200,200]} /> : null
}

  function Plane({ ...props }) {
    // <meshLambertMaterial attach="material" color="#ff0000" transparent={false} opacity={0.2} />
    return (
      <mesh {...props} receiveShadow>
        <planeGeometry attach="geometry" args={[1000, 1000, 1, 1]} />
        {/* <shadowMaterial attach="material" opacity={0.5} color={'red'} /> */}
        <meshLambertMaterial attach="material" color="#ff0000" side={THREE.DoubleSide} transparent={false} opacity={0.2} />
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
  
export default function Home(){

    return(
    <>
  <Canvas>
  <CameraControls />
    <pointLight position={[10, 10, 10]} />
    <Suspense fallback={null}>
      <Panorama />
    </Suspense>
    <Suspense fallback={renderLoader()}>
        <Model url ={ '/models/max_characters/untitled.gltf' }></Model>
        <Plane rotation={[Math.PI*-0.5, 0, 0]} position={[0, -1, 0]}></Plane>
    </Suspense>
  </Canvas>
  </>
    )
}