window.mysms = {};

(function(self){
  self.init = function(){
    var meshes = [];
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    var moveLeft = false, moveRight = false;
    var moveForward = false, moveBackward = false;
  
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  
    var photos = document.querySelectorAll('[data-photo-url]');
    for(var i = 0; i < photos.length; i++) {
      var geometry = new THREE.PlaneGeometry(1, 1, 1);
      var material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: new THREE.TextureLoader().load(photos[i].getAttribute('data-photo-url'))
      });
      var mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      meshes.push(mesh);
    }
    
    for(var i = 0; i < meshes.length; i++) {
      meshes[i].position.x = Math.random() * 10 - 5;
      meshes[i].position.y = Math.random() * 10 - 5;
      meshes[i].position.z = Math.random() * 10 - 5;
      
      meshes[i].rotation.x += Math.random() * 10 - 5;
      meshes[i].rotation.y += Math.random() * 10 - 5;
    }

    camera.position.z = 6;
  
    function render() {
    	requestAnimationFrame(render);
      
      if(moveLeft) camera.rotation.y += 0.05;
      if(moveRight) camera.rotation.y -= 0.05;
      
      var forward = new THREE.Vector3();
      forward.set(Math.sin(camera.rotation.y), 0, Math.cos(camera.rotation.y));
      
      if(moveForward) {
        camera.position.add(forward.multiplyScalar(-0.05));
      }
      
      if(moveBackward) {
        camera.position.add(forward.multiplyScalar(0.05));
      }
      
    	renderer.render(scene, camera);
    }
    render();
    
    document.addEventListener('keydown', function(event){
      switch(event.keyCode) {
        case 38:
      	case 87:
      	  moveForward = true;
      		break;
        case 40:
      	case 83:
      	  moveBackward = true;
      		break;
        case 37:
        case 65:
          moveLeft = true;
          break;
        case 39:
        case 68:
          moveRight = true;
          break;
      }
    }, false);
    
    document.addEventListener('keyup', function(event){
      switch(event.keyCode) {
        case 38:
      	case 87:
      	  moveForward = false;
      		break;
        case 40:
      	case 83:
      	  moveBackward = false;
      		break;
        case 37:
        case 65:
          moveLeft = false;
          break;
        case 39:
        case 68:
          moveRight = false;
          break;
      }
    }, false);
    
    document.addEventListener('mousedown', function(event){
      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();
      
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      var intersects = raycaster.intersectObjects(meshes);

      if(intersects.length > 0) {
        console.log(intersects[0].object.position);
      }
    }, false);
  };
})(window.mysms);
