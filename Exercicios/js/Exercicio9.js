var scene;
var camera;
var renderer;
var controls;
var xSpeed = 0.1;
var ySpeed = 0.1;
var pointlight;
var init = function() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    this.criarUmaFormas();
    this.createLights();
    camera.position.z = 6;
    camera.position.y = 12;
    camera.rotation.x = 5;
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.keys = false;
    this.render();

};

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 38) {
        pointlight.position.z -= ySpeed;
        pointlight.lookAt(0,0,0);
        sphere3.position.z -= ySpeed;
    } else if (keyCode == 40) {
        pointlight.position.z += ySpeed;
        pointlight.lookAt(0,0,0);
        sphere3.position.z += ySpeed;
    } else if (keyCode == 37) {
        pointlight.position.x -= xSpeed;
        pointlight.lookAt(0,0,0);
        sphere3.position.x -= xSpeed;
    } else if (keyCode == 39) {
        pointlight.position.x += xSpeed;
        pointlight.lookAt(0,0,0);
        sphere3.position.x += xSpeed;
    }
};

var render = function() {
    requestAnimationFrame( render );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.render( scene, camera );
};

var criarUmaFormas = function() {
    var geometry = new THREE.SphereGeometry( 1, 32, 32);
    var material = new THREE.MeshPhongMaterial( { color: "darkgreen" } );


    sphere = new THREE.Mesh( geometry, material );
    //sphere.rotation.set(10,30,0);
    sphere.castShadow = true;
    scene.add( sphere );


    sphere2 = new THREE.Mesh( geometry, material );
    sphere2.position.set(2, 1, -1);
    //sphere2.rotation.set(10,30,0);
    sphere2.castShadow = true;
    scene.add( sphere2 );


    var material2 = new THREE.MeshBasicMaterial( { color: "darkgreen" } );
    sphere3 = new THREE.Mesh( geometry, material2 );
    sphere3.position.set(1, 5, 0);
    //sphere3.rotation.set(10,30,0);
    sphere3.castShadow = false;
    scene.add( sphere3 );

    var planeGeometry = new THREE.PlaneGeometry(20, 20);
    var planeMaterial = new THREE.MeshStandardMaterial({ color: "darkblue"});
    plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -1;
    plane.receiveShadow = true;
    scene.add(plane);
};

var createLights = function () {
    pointlight = new THREE.PointLight(0xffffff);
    pointlight.position.set(1, 5, 0);
    pointlight.castShadow = true;
    scene.add(pointlight);
};
window.onload = this.init;
