import * as THREE from './three.module.js'
import {OrbitControls} from './OrbitControls.js'

let scene,camera,renderer,cube,controls;

function init(){

    //scene goes here 
    scene =  new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    
    renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    //setting mouse controls
    controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener("change",renderer)
    controls.enableZoom =  false;
    

    
    const geometry = new THREE.BoxGeometry();

    //Texture of the cube
    let textureArray = []
    const texture_nx = new THREE.TextureLoader().load("../texture/nx.jpg")
    const texture_ny = new THREE.TextureLoader().load("../texture/px.jpg")
    const texture_nz = new THREE.TextureLoader().load("../texture/py.jpg")
    const texture_px = new THREE.TextureLoader().load("../texture/ny.jpg")
    const texture_py = new THREE.TextureLoader().load("../texture/nz.jpg")
    const texture_pz = new THREE.TextureLoader().load("../texture/pz.jpg")
    textureArray.push(new THREE.MeshBasicMaterial( {map:texture_nx} ))
    textureArray.push(new THREE.MeshBasicMaterial( {map:texture_ny} ))
    textureArray.push(new THREE.MeshBasicMaterial( {map:texture_nz} ))
    textureArray.push(new THREE.MeshBasicMaterial( {map:texture_px} ))
    textureArray.push(new THREE.MeshBasicMaterial( {map:texture_py} ))
    textureArray.push(new THREE.MeshBasicMaterial( {map:texture_pz} ))

    for(let i=0;i<6;i++)
    textureArray[i].side = THREE.BackSide;

    cube = new THREE.Mesh( geometry, textureArray );
    scene.add( cube );


    camera.position.set( 0,.01, 0 );

    animate()

}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

function onWindowResize(){
    camera.aspect =  window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

init();

window.addEventListener("resize",onWindowResize,false)
