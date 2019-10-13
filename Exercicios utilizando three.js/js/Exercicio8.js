var scene;
var camera;
var renderer;
var controls;

var init = function() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    var geometry = new THREE.SphereGeometry( 1, 32, 32);
    var material = new THREE.MeshStandardMaterial( { color: "darkgreen" } );
    var material2 = new THREE.MeshBasicMaterial( { color: "darkgreen" } );

    this.criarUmaForma(0, 0, 0, geometry, material, true);
    this.criarUmaForma(2, 1, -1, geometry, material, true);
    this.criarUmaForma(1, 6, 0, geometry, material2, false);
    this.createPlane();
    this.createLight();
    camera.position.z = 6;
    camera.position.y = 12;
    camera.rotation.x = 5;
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    this.render();

};

var render = function() {
    requestAnimationFrame( render );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.render( scene, camera );
};

var criarUmaForma = function(x, y, z, geometry, material, shadow) {
    forma = new THREE.Mesh( geometry, material );

    forma.position.set(x, y, z);
    //forma.rotation.set(10,30,0);
    forma.castShadow = shadow;
    scene.add( forma );
};

var createLight = function () {
    var pointlight = new THREE.PointLight(0xffffff);
    pointlight.position.set(1, 6, 0);
    pointlight.castShadow = true;
    scene.add(pointlight);
};

var createPlane = function() {
    var planeGeometry = new THREE.PlaneGeometry(20, 20);
    var planeMaterial = new THREE.MeshStandardMaterial({ color: "darkblue"});
    plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -1;
    plane.receiveShadow = true;
    scene.add(plane);
};
window.onload = this.init;