window.mysms = {};

(function(self){
  self.init = function(){
    var cameraStartPos = new THREE.Vector3();
    var cameraStartRot = new THREE.Vector3();
    var cameraEndPos = new THREE.Vector3();
    var cameraEndRot = new THREE.Vector3();
    
    var cameraAnimating = false;
    var time = 0;
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
      
      if(!cameraAnimating) {
        if(moveLeft) camera.rotation.y += 0.05;
        if(moveRight) camera.rotation.y -= 0.05;
      
        var forward = new THREE.Vector3(0, 0, -1);
        forward.applyQuaternion(camera.quaternion);
      
        if(moveForward) {
          camera.position.add(forward.multiplyScalar(0.05));
        }
      
        if(moveBackward) {
          camera.position.add(forward.multiplyScalar(-0.05));
        }
      } else {
        time += 0.01;
        
        camera.position.x = (1 - time)*cameraStartPos.x + time*cameraEndPos.x;
        camera.position.y = (1 - time)*cameraStartPos.y + time*cameraEndPos.y;
        camera.position.z = (1 - time)*cameraStartPos.z + time*cameraEndPos.z;
        
        camera.rotation.x = (1 - time)*cameraStartRot.x + time*cameraEndRot.x;
        camera.rotation.y = (1 - time)*cameraStartRot.y + time*cameraEndRot.y;
        camera.rotation.z = (1 - time)*cameraStartRot.z + time*cameraEndRot.z;
        
        if(time >= 1) {
          time = 0;
          cameraAnimating = false;
        }
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
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      var intersects = raycaster.intersectObjects(meshes);

      if(intersects.length > 0) {
        // start
        cameraStartPos.x = camera.position.x;
        cameraStartPos.y = camera.position.y;
        cameraStartPos.z = camera.position.z;
        
        cameraStartRot.x = camera.rotation.x;
        cameraStartRot.y = camera.rotation.y;
        cameraStartRot.z = camera.rotation.z;
        
        // end
        cameraEndPos.x = intersects[0].object.position.x;
        cameraEndPos.y = intersects[0].object.position.y;
        cameraEndPos.z = intersects[0].object.position.z;
        
        cameraEndRot.x = intersects[0].object.rotation.x;
        cameraEndRot.y = intersects[0].object.rotation.y;
        cameraEndRot.z = intersects[0].object.rotation.z;
        
        var normalMatrix = new THREE.Matrix3().getNormalMatrix(intersects[0].object.matrixWorld);
        var worldNormal = intersects[0].face.normal.clone().applyMatrix3(normalMatrix).normalize();
        cameraEndPos.add(worldNormal);
        
        var planeDirToCamera = camera.position.clone().sub(intersects[0].object.position);
        var angle = worldNormal.dot(planeDirToCamera.normalize());
        
        if(angle < 0) {
          console.log("behind pic");
        }
        
        cameraAnimating = true;
      }
    }, false);
  };
})(window.mysms);
