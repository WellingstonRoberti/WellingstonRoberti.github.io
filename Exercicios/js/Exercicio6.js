var scene;
var camera;
var renderer;
var controls;
var xSpeed = 0.1;
var ySpeed = 0.1;

var init = function() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    this.createACube();
    this.createPlane();
    this.createLight();
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
        cube.position.z -= ySpeed;
    } else if (keyCode == 40) {
        cube.position.z += ySpeed;
    } else if (keyCode == 37) {
        cube.position.x -= xSpeed;
    } else if (keyCode == 39) {
        cube.position.x += xSpeed;
    }
};
var render = function() {
    requestAnimationFrame( render );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.render( scene, camera );
};

var createACube = function() {
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshLambertMaterial( { color: "darkgreen" } );
    cube = new THREE.Mesh( geometry, material );

    //cube.position.set(2, 1, -1);
    //cube.rotation.set(10,30,0);
    cube.castShadow = true;
    scene.add( cube );
};

var createLight = function () {
    var pointlight = new THREE.PointLight(0xffffff);
    pointlight.position.set(1, 5, 0);
    pointlight.castShadow = true;
    scene.add(pointlight);
};

var createPlane = function() {
    var planeGeometry = new THREE.PlaneGeometry(20, 20);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: "darkblue"});
    plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -1;
    plane.receiveShadow = true;
    scene.add(plane);
};
window.onload = this.init;