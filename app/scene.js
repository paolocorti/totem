DEBUG_MODE = false

class Scene {
  constructor() {
    this.container = document.createElement( 'div' )
    document.body.appendChild( this.container )
  }

  init() {
    this.scene = new THREE.Scene()

    if (DEBUG_MODE) {
      this.axes = new THREE.AxisHelper(100)
      this.scene.add(axes)
    }

    this.camera = this.createCamera()

    // add light
    this.hemiLight = this.createLight()
    this.scene.add( this.hemiLight )



    this.renderer = new THREE.WebGLRenderer( { antialias: true } )
    //renderer.setClearColor( 0xcea1d0 )
    this.renderer.setPixelRatio( window.devicePixelRatio )
    this.renderer.setSize( window.innerWidth, window.innerHeight )
    this.container.appendChild( this.renderer.domElement )

    window.addEventListener( 'resize', this.onWindowResize, false )
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize( window.innerWidth, window.innerHeight )
  }

  createCamera() {
    const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 500, 1000 )
    camera.position.x = 100
    camera.position.y = 100
    camera.position.z = 100
    camera.lookAt( new THREE.Vector3() )

    return camera
  }

  createLight() {
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 )
    hemiLight.color.setHSL( 0.6, 1, 0.6 )
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 )
    hemiLight.position.set( 0, 500, 0 )

    return hemiLight
  }


  animate() {
    requestAnimationFrame( this.animate )
    this.render()
    //TWEEN.update();
    //update();
  }

  render() {
    this.renderer.render( this.scene, this.camera )
  }
}
