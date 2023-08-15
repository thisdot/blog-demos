<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
</script>

<div class="sphere-canvas">
	<Canvas>
		<Scene />
	</Canvas>
</div>

<nav>
	<a href="/">Home</a>
	<ul>
		<li>Explore</li>
		<li>Learn</li>
	</ul>
</nav>

<h1>Give a scroll</h1>

<style>
	.sphere-canvas {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}

	nav {
		display: flex;
		color: white;
		z-index: 2;
		position: relative;
		padding: 4rem 8rem;
		justify-content: space-between;
		align-items: center;
	}

	nav a {
		text-decoration: none;
		color: white;
		font-weight: bold;
	}

	nav ul {
		display: flex;
		list-style: none;
		gap: 4rem;
	}

	h1 {
		color: white;
		z-index: 2;
		position: absolute;
		font-size: 3rem;
		left: 50%;
		top: 75%;
		transform: translate(-50%, -75%);
	}
</style>
