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
    this.createACube();
    this.createASphere();
    this.createACylinder();
    this.createATorus();
    this.createPlane();
    this.createLight();
    camera.position.y = 50;
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    this.render();

};

var render = function() {
    requestAnimationFrame( render );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //cube.rotation.y +=.1;
    //cube.rotation.x +=.1;
    //cube.rotation.z +=.1;
    renderer.render( scene, camera );
};

var createACube = function() {
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshLambertMaterial( { color: "darkgreen" } );
    cube = new THREE.Mesh( geometry, material );

    cube.position.set(-10, -.5, 10);
    //cube.rotation.set(10,30,0);
    cube.castShadow = true;
    scene.add( cube );
};
var createASphere = function() {
    var geometry = new THREE.SphereGeometry( 1, 32, 32);
    var material = new THREE.MeshLambertMaterial( { color: "darkgreen" } );
    sphere = new THREE.Mesh( geometry, material );

    sphere.position.set(10, 0, 10);
    //sphere.rotation.set(10,30,0);
    sphere.castShadow = true;
    scene.add( sphere );
};
var createACylinder = function() {
    var geometry = new THREE.CylinderGeometry( 1, 1, 4, 32);
    var material = new THREE.MeshLambertMaterial( { color: "darkgreen" } );
    Cylinder = new THREE.Mesh( geometry, material );

    Cylinder.position.set(10, 1, -10);
    //Cylinder.rotation.set(10,30,0);
    Cylinder.castShadow = true;
    scene.add( Cylinder );
};
var createATorus = function() {
    var geometry = new THREE.TorusGeometry(radius = 1, tube =.3, radialSegments =16, tubularSegments =32);
    var material = new THREE.MeshLambertMaterial( { color: "darkgreen" } );
    Torus = new THREE.Mesh( geometry, material );

    Torus.position.set(-10, .2, -10);
    Torus.rotation.set(0,45,0);
    Torus.castShadow = true;
    scene.add( Torus );
};

var createLight = function () {
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(10, 20, 20);
    spotLight.castShadow = true;
    scene.add(spotLight);
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