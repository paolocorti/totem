class Castle {

  constructor(scene) {
    this.scene = scene
  }

  // CASTLE CORE CUBE
  addCore() {
    const coreGeometry = new THREE.IcosahedronGeometry( 30 )
    const coreMaterial = new THREE.MeshLambertMaterial( { color: 0xfe2b75, emissive: 0xfe2b75 } )
    const castleCoreMesh = new THREE.Mesh( coreGeometry, coreMaterial )
    castleCoreMesh.position.set(0,50,0)
    this.coreMesh.push( castleCoreMesh )
    this.scene.add( castleCoreMesh )
  }

  init() {
    this.group = new THREE.Object3D();

    for (var i = 0; i < 30; i++) {
      addCube(i, true)
    }

    scene.add(this.group)
  }

  addCube(index, initialGeneration) {
    const cubeGeo = new THREE.BoxGeometry( 50, 50, 50 )
    const cubeMaterial = new THREE.MeshLambertMaterial( { wireframe: false, color: 0xffffff} );
    const cube = new THREE.Mesh( cubeGeo, cubeMaterial );
    const loader = new THREE.OBJLoader();
    //loader.load('./asset/1407_prova.obj', function ( object ) {
    //cube = object.children[0];
    cube.name = 'Cube'+index;
    cube.life = 2;
    //cube.scale.set(2,2,2)
    cube.rotation.set(0, 0, 0)
    const coordinates = this.generateRandomCoordinates()

    cube.position.set(coordinates.x,coordinates.y,coordinates.z)

    var finalY = 25;
    if (positions) {
      for (key in positions) {
        var p = positions[key]
        if (p.x === coordinates.x && p.z === coordinates.z) {
          //cube.position.setY(cube.position.y + 50)
          finalY = p.y + 50;
          //console.log('Found a cube in this postion, generate a new one in a new row');
        }
      }
    }

    if (initialGeneration) {
      var coordinates = getGridCoordinatesFromWorldCoordiantes(cube.position);
      positions[cube.name] = {x: coordinates.x, y: finalY, z: coordinates.z }
      cube.position.set(coordinates.x,finalY,coordinates.z)
      collidableMeshList.push(cube);
    } else {
      var tween = new TWEEN.Tween({y: 400})
      .to({ y: finalY}, 500)
      .onUpdate(function() {
        cube.position.setY(this.y)
      })
      .onComplete(function() {
        collidableMeshList.push(cube);
      })
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .start();
    }

    group.add(cube)
    //});
  }

  generateRandomCoordinates() {
    var randomPos = new THREE.Vector3(((Math.random() * 200) - 100),300,((Math.random() * 200) - 100))
    randomPos = randomPos.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );

    if (randomPos.x === 25 && (randomPos.z === 25 || randomPos.z === -25)) {
      randomPos.setX(randomPos.x + 50)
    }
    if (randomPos.x === -25 && (randomPos.z === 25 || randomPos.z === -25)) {
      randomPos.setX(randomPos.x - 50)
    }

    return randomPos
  }
}
