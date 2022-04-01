import { useEffect } from 'react';

import * as THREE from 'three';

import SceneInit from './utils/SceneInit';
import { GUI } from 'dat.gui';
import { AmbientLight } from 'three';

function App() {
	useEffect(() => {
		const test = new SceneInit('myThreeJsCanvas');
		test.initialize();
		test.animate();

		// GUI
		const gui = new GUI();

		// Red Box
		const boxArray = [];
		for (let i = 0; i < 3; i++) {
			const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
			const boxMaterial = new THREE.MeshPhongMaterial({
				color: 0xffff00,
			});
			const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
			boxMesh.castShadow = true;
			boxMesh.receiveShadow = true;
			test.scene.add(boxMesh);
			boxArray.push(boxMesh);
		}

		boxArray[2].position.x = 2;
		boxArray[0].position.x = -2;
		boxArray[0].material.color = new THREE.Color(0xff0000);
		boxArray[1].material.color = new THREE.Color(0x00ff00);
		boxArray[2].material.color = new THREE.Color(0x0000ff);

		const groundGeometry = new THREE.BoxGeometry(8, 0.5, 8);
		const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xfafafa });
		const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
		groundMesh.receiveShadow = true;
		groundMesh.position.y = -2;
		test.scene.add(groundMesh);

		const al = new THREE.AmbientLight(0xffffff, 0.1);
		test.scene.add(al);
		// set up ambient light gui
		const alFolder = gui.addFolder('ambient light');
		const alSettings = { color: al.color.getHex() };
		alFolder.add(al, 'visible');
		alFolder.add(al, 'intensity', 0, 1, 0.1);
		alFolder
			.addColor(alSettings, 'color')
			.onChange((value) => al.color.set(value));
		alFolder.open();

		//Directional light helper
		const dl = new THREE.DirectionalLight(0xff0000, 0.5);
		dl.castShadow = true;
		dl.position.set(0, 13, 5);
		const dlHelper = new THREE.DirectionalLightHelper(dl, 3);
		test.scene.add(dl, dlHelper);

		// Camera
		test.camera.position.z = -2;
	}, []);

	return (
		<div>
			<canvas id="myThreeJsCanvas" />
		</div>
	);
}

export default App;
