/* ==========================================================================
   WAHAB JEWELLERS — THREE.JS WEBGL HERO CANVAS
   Interactive Gold Particle Dust & Floating Caustic Gemstone Shader
   ========================================================================== */

window.addEventListener('load', () => {
  const container = document.getElementById('hero-canvas');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Gold Particle Dust Geometry
  const particleCount = 700;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const scales = new Float32Array(particleCount);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 12;
    positions[i + 1] = (Math.random() - 0.5) * 12;
    positions[i + 2] = (Math.random() - 0.5) * 12;
    scales[i / 3] = Math.random() * 0.05 + 0.01;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Gold Shader Material
  const material = new THREE.PointsMaterial({
    color: 0xd4af37,
    size: 0.035,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  // Floating Central Gem Crystal
  const meshGeo = new THREE.IcosahedronGeometry(1.2, 0);
  const meshMat = new THREE.MeshPhongMaterial({
    color: 0x081c15,
    emissive: 0xd4af37,
    emissiveIntensity: 0.15,
    wireframe: true,
    transparent: true,
    opacity: 0.4
  });
  const crystal = new THREE.Mesh(meshGeo, meshMat);
  scene.add(crystal);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xd4af37, 2, 50);
  pointLight.position.set(2, 3, 4);
  scene.add(pointLight);

  // Mouse Parallax Interaction
  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
  });

  // Animation Loop
  const clock = new THREE.Clock();
  const animate = () => {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    particleSystem.rotation.y = elapsedTime * 0.03;
    particleSystem.rotation.x = elapsedTime * 0.02;

    crystal.rotation.x = elapsedTime * 0.2 + mouseY;
    crystal.rotation.y = elapsedTime * 0.3 + mouseX;

    renderer.render(scene, camera);
  };

  animate();

  // Resize Listener
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
