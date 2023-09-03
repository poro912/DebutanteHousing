import * as THREE from "three";
import React , { useState, useEffect }from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

import state from '../store';

const Candle = ({idx, url, mtl, pos, rotation}) => {
    const snap = useSnapshot(state);

    const material = useLoader(MTLLoader, mtl);
    const obj = useLoader(OBJLoader, url, (loader) => {
            material.preload();    
            loader.setMaterials(material);  
        });
        
    
    //useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta))

    const stateString = JSON.stringify(snap)
    return (
        <group key={stateString}>
        <mesh
            onClick={(e) => state.click = idx}
        >
        <primitive
            object={obj}
            position={pos}
            rotation={rotation}
        ></primitive>
        </mesh>
        </group>
    )
    }

export default Candle