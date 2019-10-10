var scene;
var camera;
var renderer;
var controls;

var init = function() {

    scene = new THREE.Scene();
    scene.background = new THREE.CubeTextureLoader().load(['imagens/MilkyWay/px.jpg', 'imagens/MilkyWay/nx.jpg', 'imagens/MilkyWay/py.jpg', 'imagens/MilkyWay/ny.jpg', 'imagens/MilkyWay/pz.jpg', 'imagens/MilkyWay/nz.jpg']);
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    this.createACube();
    //this.terra();
    //this.nuvens();
    this.LoadModel();
    this.createPlane();
    this.createLight();
    camera.position.z = 6;
    camera.position.y = 12;
    camera.rotation.x = 5;
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    document.body.appendChild( renderer.domElement );
    this.render();

};

var materialDeMadeira = function() {
    var madeiraTexture = new THREE.TextureLoader().load("imagens/madeira.jpg");
    var madeiraMaterial = new THREE.MeshPhongMaterial();

    madeiraMaterial.map = madeiraTexture;

    return madeiraMaterial;

};



function LoadModel(){

    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
        }
    };
    var onError = function () { };

    new THREE.MTLLoader()
        .setPath( 'aranha/' )
        .load( 'Only_Spider_with_Animations_Export.mtl', function ( materials ) {
            materials.preload();
            new THREE.OBJLoader()
                .setMaterials( materials )
                .setPath( 'aranha/' )
                .load( 'Only_Spider_with_Animations_Export.obj', function ( object ) {
                    object.position.set(5, -1, 0);
                    object.scale.set(0.3, 0.3, 0.3);
                    object.traverse(function(child){
                        child.castShadow = true;
                    });
                    scene.add( object );
                }, onProgress, onError );
        } );

}
var render = function() {
    requestAnimationFrame( render );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.render( scene, camera );
};

var createACube = function() {
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = this.materialDeMadeira();
    cube = new THREE.Mesh( geometry, material );
    cube.position.set(-5,0,0);
    //cube.rotation.set(10,30,0);
    cube.castShadow = true;
    scene.add( cube );
};

var createLight = function () {
    var spotLight = new THREE.DirectionalLight();
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