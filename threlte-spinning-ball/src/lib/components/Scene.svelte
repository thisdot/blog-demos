<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { interactivity } from '@threlte/extras';
	import { spring } from 'svelte/motion';
	import { onMount } from 'svelte';

	interactivity();
	const scale = spring(0, { stiffness: 0.1 });

	onMount(() => {
		scale.set(1);
	});

	let mousedown = false;
	let rgb: number[] = [];

	function updateSphereColor(e: MouseEvent) {
		if (mousedown) {
			rgb = [
				Math.floor((e.pageX / window.innerWidth) * 255),
				Math.floor((e.pageY / window.innerHeight) * 255),
				150
			];
			console.log(rgb.join(','));
		}
	}
	window.addEventListener('mousedown', () => (mousedown = true));
	window.addEventListener('mouseup', () => (mousedown = false));
	window.addEventListener('mousemove', updateSphereColor);

	$: sphereColor = rgb.join(',');
</script>

<T.PerspectiveCamera makeDefault position={[-10, 20, 10]} fov={15}>
	<OrbitControls
		enableZoom={false}
		enablePan={false}
		enableDamping
		autoRotate
		autoRotateSpeed={1.5}
	/>
</T.PerspectiveCamera>

<T.DirectionalLight intensity={0.8} position.x={10} position.y={10} />
<T.AmbientLight intensity={0.02} />

<T.Mesh scale={$scale} on:pointerenter={() => scale.set(1.1)} on:pointerleave={() => scale.set(1)}>
	<T.SphereGeometry args={[1, 32, 32]} />
	<T.MeshStandardMaterial color={`rgb(${sphereColor})`} roughness={0.2} />
</T.Mesh>
