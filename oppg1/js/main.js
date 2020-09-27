
import MouseLookController from './MouseLookController.js';
import { Renderer, Scene, Node, Mesh, Primitive, BasicMaterial, CubeMapMaterial, PerspectiveCamera, vec3 } from '../lib/engine/index.js';

// Create a Renderer and append the canvas element to the DOM.
let renderer = new Renderer(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let time = 0.001;

// A scenegraph consists of a top-level Node, called Scene and an arbitrary number of nodes forming a DAG.
const scene = new Scene();

// We load some textures and instantiate materials from them:
const sunMaterial = new BasicMaterial({
    map: renderer.loadTexture('resources/sun.jpg')
});

const earthMaterial = new BasicMaterial({
    map: renderer.loadTexture('resources/earth_daymap.jpg')
});

// min kode for texturer/materiale:
const moonMaterial = new BasicMaterial({
    map: renderer.loadTexture('resources/2k_moon.jpg')
});

const marsMaterial = new BasicMaterial({
    map: renderer.loadTexture('resources/2k_mars.jpg')
});

const mercuryMaterial = new BasicMaterial({
    map: renderer.loadTexture('resources/2k_mercury.jpg')
});

const saturnMaterial = new BasicMaterial({
    map: renderer.loadTexture('resources/2k_saturn.jpg')
});

const meteoriteMaterial = new BasicMaterial({
    map: renderer.loadTexture('resources/meteorite.jpg')
});

const venusMaterial = new BasicMaterial({
    map: renderer.loadTexture('resources/2k_venus_atmosphere.jpg')
});

const satelliteMaterial = new BasicMaterial({
    map: renderer.loadTexture('resources/2k_eris_fictional.jpg')
});

const jupiterMaterial = new BasicMaterial({
    map: renderer.loadTexture('resources/2k_jupiter.jpg')
});

const uranusMaterial = new BasicMaterial({
    map: renderer.loadTexture('resources/2k_uranus.jpg')
});

const neptuneMaterial = new BasicMaterial({
    map: renderer.loadTexture('resources/2k_neptune.jpg')
})

// Get more textures here:
// https://www.solarsystemscope.com/textures/

// Get relative sizes here:
// http://www.exploratorium.edu/ronh/solar_system/
// You dont have to use these, as the planets may be too tiny to be visible.

// A Primitive consists of geometry and a material.
// We create a sphere Primitive using the static method 'createSphere'.
// The generated geometry is called a UV-sphere and it has 32 vertical and horizontal subdivisions (latitude and longitude).
// Additionally, we specify that we want the Primitive to be drawn with sunMaterial.
const sunPrimitive = Primitive.createSphere(sunMaterial, 32, 32);

// A Primitive is only drawn as part of a Mesh,
// so we instantiate a new Mesh with the sunPrimitive.
// (A Mesh can consist of multiple Primitives. )
const sun = new Mesh([sunPrimitive]);

// Finally, we add the sun to our scene.
// Only meshes that have been added to our scene, either as a child or as a descendant, will be drawn.
scene.add(sun);

// We also want to draw the earth, so we use the static method 'from' to create a new Primitive based on the previous one.
// Using this function ensures that we're reusing the same buffers for geometry, while allowing us to specify a different material.
const earthPrimitive = Primitive.from(sunPrimitive, earthMaterial);

// Next we create a Node that represents the Earths orbit.
// This node is not translated at all, because we want it to be centered inside the sun.
// It is however rotated in the update-loop at starting at line 215.
const earthOrbitNode = new Node(scene);

// This node represents the center of the earth.
const earthCenterNode = new Node(earthOrbitNode);
// We translate it along the x-axis to a suitable position.
// When the earthOrbitNode is rotated, this node will orbit about the center of the sun.
// 2,729 meter eller 8 feet 11,45 inches
//burde nok endre litt på denne distansen...
earthCenterNode.setTranslation(11.45, 0, 0);

// Create a new Mesh for the Earth.
const earth = new Mesh([earthPrimitive]);

// We add it to the earthCenterNode, so that it orbits around the sun.
earthCenterNode.add(earth);

// True scale: earth.setScale(0.0091, 0.0091, 0.0091);
earth.setScale(0.091, 0.091, 0.091); // 10 times larger than irl

// lager månen
const moonPrimitive = Primitive.from(sunPrimitive, moonMaterial);

const moonOrbitNode = new Node(earthCenterNode);

const moonCenterNode = new Node(moonOrbitNode);

//veit ikkje heilt kor langt vekke den skal vere..
moonCenterNode.setTranslation(0.3, 0, 0);

const moon = new Mesh([moonPrimitive]);

moonCenterNode.add(moon);

//rett scale??? tok noko eg... tok 10 gangar større enn irl?
moon.setScale(0.025, 0.025, 0.025);

// lagar mars:
const marsPrimitive = Primitive.from(sunPrimitive, marsMaterial);

const marsOrbitNode = new Node(scene);

const marsCenterNode = new Node(marsOrbitNode);

//13 feet og 7,68 inches eller 4,157 vekke
//4,157/2,729 = 1,52. 11,45 * 1,52 = 17,44
marsCenterNode.setTranslation(17.44, 0, 0);

const mars = new Mesh([marsPrimitive]);

marsCenterNode.add(mars);

//true scale: 0.0048
mars.setScale(0.048, 0.048, 0.048);

//lagar merkur
const mercuryPrimitive = Primitive.from(sunPrimitive, mercuryMaterial);

const mercuryOrbitNode = new Node(scene);

const mercuryCenterNode = new Node(mercuryOrbitNode);

//mercury distance (base jorda 11,45 vekke): 11,45*(1,057/2,729) = 4,435
mercuryCenterNode.setTranslation(4.435, 0, 0);

const mercury = new Mesh([mercuryPrimitive]);

mercuryCenterNode.add(mercury);

//mercury scale: (true) 0.0034 -> 0.034
mercury.setScale(0.034, 0.034, 0.034);

//lagar saturn:
const saturnPrimitive = Primitive.from(sunPrimitive, saturnMaterial);

const saturnOrbitNode = new Node(scene);

const saturnCenterNode = new Node(saturnOrbitNode);

//saturn distance (base jorda 11,45 vekke): 11,45*(26,04/2,729) = 109,255
saturnCenterNode.setTranslation(109.255, 0, 0);

const saturn = new Mesh([saturnPrimitive]);

saturnCenterNode.add(saturn);

//saturn scale: (true) 0.0836 -> 0.836
saturn.setScale(0.836, 0.836, 0.836);

//lagar "meteoritt/måne" rundt månen
const meteoritePrimitive = Primitive.from(sunPrimitive, meteoriteMaterial);

const meteoriteOrbitNode = new Node(moonCenterNode);

const meteoriteCenterNode = new Node(meteoriteOrbitNode);

//berre fant på noko
meteoriteCenterNode.setTranslation(0.05, 0, 0);

const meteorite = new Mesh([meteoritePrimitive]);

meteoriteCenterNode.add(meteorite);

//berre fant på noko
meteorite.setScale(0.005, 0.005, 0.005);

//lagar venus
const venusPrimitive = Primitive.from(sunPrimitive, venusMaterial);

const venusOrbitNode = new Node(scene);

const venusCenterNode = new Node(venusOrbitNode);

//venus distance (base jorda 11,45 vekke): 11,45*(1,972/2,729) = 8,274
venusCenterNode.setTranslation(8.274, 0, 0);

const venus = new Mesh([venusPrimitive]);

venusCenterNode.add(venus);

//venus scale (true): 0.0086 -> 0.086
venus.setScale(0.086, 0.086, 0.086);

//TODO - geostationary satellite (opt)
const satellitePrimitive = Primitive.from(sunPrimitive, satelliteMaterial);

const satelliteOrbitNode = new Node(earthCenterNode);

const satelliteCenterNode = new Node(satelliteOrbitNode);

//berre set ein distanse
satelliteCenterNode.setTranslation(0.12, 0, 0);

const satellite = new Mesh([satellitePrimitive]);

satelliteCenterNode.add(satellite);

//berre set ein skalering
satellite.setScale(0.004, 0.004, 0.004);

//lagar jupiter
const jupiterPrimitive = Primitive.from(sunPrimitive, jupiterMaterial);

const jupiterOrbitNode = new Node(scene);

const jupiterCenterNode = new Node(jupiterOrbitNode);

//jupiter distanse: 11,45*(14,199/2,729) = 59,574
jupiterCenterNode.setTranslation(59.574, 0, 0);

const jupiter = new Mesh([jupiterPrimitive]);

jupiterCenterNode.add(jupiter);

//jupiter scale *10
jupiter.setScale(1.027, 1.027, 1.027);

//lagar uranus
const uranusPrimitive = Primitive.from(sunPrimitive, uranusMaterial);

const uranusOrbitNode = new Node(scene);

const uranusCenterNode = new Node(uranusOrbitNode);

//distanse: 11,45*(52,378/2,729) = 219,761
uranusCenterNode.setTranslation(219.761, 0, 0);

const uranus = new Mesh([uranusPrimitive]);

uranusCenterNode.add(uranus);

//uranus scale *10
uranus.setScale(0.337, 0.337, 0.337);

//lagar neptun
const neptunePrimitive = Primitive.from(sunPrimitive, neptuneMaterial);

const neptuneOrbitNode = new Node(scene);

const neptuneCenterNode = new Node(neptuneOrbitNode);

//distanse: 11,45*(82,116/2,729) = 344,532
neptuneCenterNode.setTranslation(344.532, 0, 0);

const neptune = new Mesh([neptunePrimitive]);

neptuneCenterNode.add(neptune);

//neptun scale *10
neptune.setScale(0.326, 0.326, 0.326)

// We create a Node representing movement, in order to decouple camera rotation.
// We do this so that the skybox follows the movement, but not the rotation of the camera.
const player = new Node();

let skyBoxMaterial = new CubeMapMaterial({
    map: renderer.loadCubeMap([
        'resources/skybox/right.png',
        'resources/skybox/left.png',
        'resources/skybox/top.png',
        'resources/skybox/bottom.png',
        'resources/skybox/front.png',
        'resources/skybox/back.png'
    ])
});

let skyBoxPrimitive = Primitive.createCube(skyBoxMaterial, true); // Second argument tells the createBox function to invert the faces and normals of the box.

let skyBox = new Mesh([skyBoxPrimitive]);
skyBox.setScale(1500, 1500, 1500);

// Attaching the skybox to the player gives the illusion that it is infinitely far away.
player.add(skyBox);

// We create a PerspectiveCamera with a fovy of 70, aspectRatio, and near and far clipping plane.
const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 5000);
camera.setTranslation(0, 0, 5);

player.add(camera);

scene.add(player);

// We need to update some properties in the camera and renderer if the window is resized.
window.addEventListener('resize', () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}, false);


// We create a MouseLookController to enable controlling camera pitch and yaw with mouse input.
const mouseLookController = new MouseLookController(camera);

// We attach a click lister to the canvas-element so that we can request a pointer lock.
// https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API
const canvas = renderer.domElement;
canvas.addEventListener('click', () => {
    canvas.requestPointerLock();
});

let yaw = 0;
let pitch = 0;
function updateCamRotation(event) {
    // Add mouse movement to the pitch and yaw variables so that we can update the camera rotation in the loop below.
    yaw -= event.movementX * 0.001;
    pitch -= event.movementY * 0.001;
}

document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement === canvas) {
        canvas.addEventListener('mousemove', updateCamRotation, false);
    } else {
        canvas.removeEventListener('mousemove', updateCamRotation, false);
    }
});


let move = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    speed: 0.05
};

window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.code === 'KeyW') {
        move.forward = true;
    } else if (e.code === 'KeyS') {
        move.backward = true;
    } else if (e.code === 'KeyA') {
        move.left = true;
    } else if (e.code === 'KeyD') {
        move.right = true;
    } else if (e.code === 'ArrowUp') {
        time = Math.min(time * 1.05, 10);
    } else if (e.code === 'ArrowDown') {
        time = Math.max(0.000001, time * 0.95);
    }
});

window.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.code === 'KeyW') {
        move.forward = false;
    } else if (e.code === 'KeyS') {
        move.backward = false;
    } else if (e.code === 'KeyA') {
        move.left = false;
    } else if (e.code === 'KeyD') {
        move.right = false;
    }
});

// We create a vec3 to hold the players velocity (this way we avoid allocating a new one every frame).
const velocity = vec3.fromValues(0.0, 0.0, 0.0);

const TICK_RATE = 1000 / 60; // 60 fps is the reference Hz.

let then = 0;
function loop(now) {

    let delta = now - then;
    then = now;

    const deltaCorrection = (delta / TICK_RATE); // The deviation factor from the targeted TICK_RATE of 60 Hz

    const moveSpeed = move.speed * deltaCorrection;

    // Reduce accumulated velocity by 25% each frame.
    vec3.scale(velocity, velocity, 0.75);
    //vec3.set(velocity, 0.0, 0.0, 0.0); // (Alternatively remove it completely, feels more responsive?)

    if (move.left) {
        velocity[0] -= moveSpeed;
    }

    if (move.right) {
        velocity[0] += moveSpeed;
    }

    if (move.forward) {
        velocity[2] -= moveSpeed;
    }

    if (move.backward) {
        velocity[2] += moveSpeed;
    }

    // Given the accumulated mouse movement this frame, use the mouse look controller to calculate the new rotation of the camera.
    mouseLookController.update(pitch, yaw);

    // Camera rotation is represented as a quaternion.
    // We rotate the velocity vector based the cameras rotation in order to translate along the direction we're looking.
    const translation = vec3.transformQuat(vec3.create(), velocity, camera.rotation);
    player.applyTranslation(...translation);

    // Animate bodies:
    const orbitalRotationFactor = time * deltaCorrection; // The amount the earth rotates about the sun every tick.
    earthOrbitNode.rotateY(orbitalRotationFactor);
    
    earth.rotateY(orbitalRotationFactor * 365); // The Earth rotates approx. 365 times per year.
    //sun.rotateY(orbitalRotationFactor * 25); // The Sun rotates approx. 25 times per year.
    sun.rotateY(orbitalRotationFactor * (365/27));
    // ^burde ikkje gange-leddet vere 13? bruker ca 27 dagar på å rotera ein gong, altså 365/27 = ~13,5

    //dagar på rotasjon om seg sjølv og orbital -> orbital..Factor * 365/dagar ? Om orbitalRotationFactor = 1 rotasjon/runde per år

    //roterer månen
    moonOrbitNode.rotateY(orbitalRotationFactor * 13.36); // månen roterar rundt jorda ca. 13,36 gongar per år (27,3 dagar for ein rotasjon rundt jorda).

    //roterer mars
    marsOrbitNode.rotateY(orbitalRotationFactor * (365/687));
    mars.rotateY(orbitalRotationFactor * (365/1.025));

    //roterer merkur
    mercuryOrbitNode.rotateY(orbitalRotationFactor * (365/88));
    mercury.rotateY(orbitalRotationFactor * (365/59));

    //roterer saturn
    saturnOrbitNode.rotateY(orbitalRotationFactor * (365/10756));
    saturn.rotateY(orbitalRotationFactor * (365/0.4396));

    //roterer meteoritt
    meteoriteOrbitNode.rotateY(orbitalRotationFactor * (365/4));

    //roterer venus
    venusOrbitNode.rotateY(orbitalRotationFactor * (365/224.7));
    venus.rotateY(orbitalRotationFactor * (365/243));

    //roterer satelitt - skal følgje jorda, så samme som earth.rotateY
    satelliteOrbitNode.rotateY(orbitalRotationFactor * 365);

    //roterer jupiter
    jupiterOrbitNode.rotateY(orbitalRotationFactor * (365/4330.6));
    jupiter.rotateY(orbitalRotationFactor * (365/0.417));

    //roterer uranus
    uranusOrbitNode.rotateY(orbitalRotationFactor * (365/30687));
    uranus.rotateY(orbitalRotationFactor * (365/0.718));

    //roterer neptun
    neptuneOrbitNode.rotateY(orbitalRotationFactor * (365/60190));
    neptune.rotateY(orbitalRotationFactor * (365/0.671));

    // Reset mouse movement accumulator every frame.
    yaw = 0;
    pitch = 0;

    // Update the world matrices of the entire scene graph.
    scene.update();

    // Render the scene.
    renderer.render(scene, camera);

    // Ask the the browser to draw when it's convenient
    window.requestAnimationFrame(loop);

}

window.requestAnimationFrame(loop);