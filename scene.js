import * as THREE from "./assets/vendor/three.module.js";

const hero = document.querySelector("[data-pocket-hero]");
const desk = document.querySelector("[data-trading-desk]");
const canvas = document.querySelector("[data-trading-desk-canvas]");

if (hero && desk && canvas) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const saveData = Boolean(connection && connection.saveData);

  if (!reducedMotion.matches && !saveData && window.WebGLRenderingContext) {
    try {
      const quality = window.matchMedia("(max-width: 680px)").matches ? 1.25 : 1.75;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, quality));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      const target = new THREE.Vector3(0, 0.15, 0);
      const pointer = new THREE.Vector2();
      const clock = new THREE.Clock();
      let active = true;
      let sceneVisible = true;
      let currentPhase = -1;

      scene.add(new THREE.HemisphereLight(0xfff6df, 0x123a2d, 2.2));
      const keyLight = new THREE.DirectionalLight(0xffe9b3, 3.4);
      keyLight.position.set(5, 8, 8);
      scene.add(keyLight);
      const greenLight = new THREE.PointLight(0x2fd17f, 7, 15, 2);
      greenLight.position.set(-4, 1, 4);
      scene.add(greenLight);

      const deskGroup = new THREE.Group();
      deskGroup.rotation.set(-0.17, -0.34, 0.02);
      scene.add(deskGroup);

      const material = (color, roughness = 0.55, metalness = 0.08) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
      const ivory = material(0xf5ebd8, 0.72);
      const green = material(0x176b4d, 0.42, 0.12);
      const greenLightMaterial = material(0x74dca4, 0.36, 0.15);
      const brass = material(0xc8942d, 0.32, 0.72);
      const ink = material(0x17201c, 0.48, 0.18);
      const cream = material(0xfffbf0, 0.72);
      const signalMaterial = new THREE.MeshStandardMaterial({ color: 0xf7c85a, emissive: 0xa66700, emissiveIntensity: 1.2, roughness: 0.27, metalness: 0.45 });

      const addBox = (group, size, position, materialValue, radius = 0) => {
        const geometry = radius ? new THREE.BoxGeometry(size[0], size[1], size[2], 4, 4, 1) : new THREE.BoxGeometry(...size);
        const mesh = new THREE.Mesh(geometry, materialValue);
        mesh.position.set(...position);
        group.add(mesh);
        return mesh;
      };

      const phone = new THREE.Group();
      phone.position.set(0, 0, 0);
      deskGroup.add(phone);
      addBox(phone, [5.25, 7.85, 0.42], [0, 0, 0], ink, 0.22);
      addBox(phone, [4.84, 7.37, 0.2], [0, 0, 0.31], cream, 0.18);
      addBox(phone, [1.05, 0.1, 0.12], [0, 3.4, 0.49], ink, 0.05);

      const interior = new THREE.Group();
      interior.position.z = 0.5;
      phone.add(interior);
      addBox(interior, [4.15, 5.4, 0.16], [0, -0.34, 0], ivory, 0.08);
      addBox(interior, [3.76, 0.12, 0.1], [0, -2.72, 0.14], brass, 0.02);

      const goalPanel = new THREE.Group();
      interior.add(goalPanel);
      addBox(goalPanel, [1.35, 0.95, 0.17], [-1.18, 1.62, 0.2], green, 0.12);
      addBox(goalPanel, [0.82, 0.12, 0.08], [-1.18, 1.68, 0.31], greenLightMaterial, 0.03);
      addBox(goalPanel, [0.62, 0.1, 0.07], [-1.18, 1.38, 0.31], cream, 0.02);

      const brokerPanel = new THREE.Group();
      interior.add(brokerPanel);
      addBox(brokerPanel, [1.35, 0.95, 0.17], [1.18, -1.56, 0.2], ink, 0.12);
      addBox(brokerPanel, [0.82, 0.12, 0.08], [1.18, -1.5, 0.31], greenLightMaterial, 0.03);
      addBox(brokerPanel, [0.62, 0.1, 0.07], [1.18, -1.79, 0.31], cream, 0.02);

      const ledger = new THREE.Group();
      interior.add(ledger);
      addBox(ledger, [1.18, 1.7, 0.16], [1.16, 1.45, 0.22], cream, 0.05);
      for (let row = 0; row < 4; row += 1) {
        addBox(ledger, [0.76, 0.045, 0.05], [1.16, 1.92 - row * 0.26, 0.34], row === 0 ? brass : ink, 0.01);
      }

      const manager = new THREE.Group();
      manager.position.set(-0.78, -0.22, 0.25);
      interior.add(manager);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.27, 20, 16), brass);
      head.position.y = 0.72;
      manager.add(head);
      addBox(manager, [0.52, 0.82, 0.35], [0, 0.23, 0], green, 0.12);
      const deskTop = addBox(manager, [1.3, 0.44, 0.16], [0.42, -0.2, 0.03], brass, 0.06);
      deskTop.rotation.z = -0.08;
      const arm = addBox(manager, [0.64, 0.12, 0.12], [0.31, 0.41, 0.1], brass, 0.04);
      arm.rotation.z = -0.28;

      const signal = new THREE.Group();
      signal.position.set(-2.1, 0.2, 0.45);
      interior.add(signal);
      const signalOrb = new THREE.Mesh(new THREE.SphereGeometry(0.25, 22, 16), signalMaterial);
      signal.add(signalOrb);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.39, 0.035, 12, 36), brass);
      ring.rotation.x = Math.PI / 2;
      signal.add(ring);

      const route = new THREE.Group();
      interior.add(route);
      const routeA = addBox(route, [0.98, 0.075, 0.055], [-1.28, -0.6, 0.27], brass, 0.03);
      routeA.rotation.z = -0.45;
      const routeB = addBox(route, [0.9, 0.075, 0.055], [-0.13, -1.05, 0.27], brass, 0.03);
      routeB.rotation.z = 0.16;
      const routeC = addBox(route, [0.92, 0.075, 0.055], [0.72, -1.22, 0.27], brass, 0.03);
      routeC.rotation.z = -0.26;
      const actionDot = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), greenLightMaterial);
      actionDot.position.set(1.68, -1.45, 0.32);
      route.add(actionDot);

      const phases = [
        {
          label: "01 / CONFIGURE",
          title: "Configure your mandate",
          description: "Set the goal, risk boundary, and broker-connected workflow before a signal can act."
        },
        {
          label: "02 / SIGNAL",
          title: "Research becomes a signal",
          description: "A partner-published signal enters the app and is checked against your selected configuration."
        },
        {
          label: "03 / EXECUTE",
          title: "Your configured workflow acts",
          description: "Eligible actions follow the connected broker workflow; market risk and execution conditions still apply."
        }
      ];
      const progressLabel = desk.querySelector("[data-desk-progress]");
      const titleLabel = desk.querySelector("[data-desk-title]");
      const descriptionLabel = desk.querySelector("[data-desk-description]");

      function setPhase(nextPhase) {
        if (nextPhase === currentPhase) return;
        currentPhase = nextPhase;
        const phase = phases[nextPhase];
        desk.dataset.scenePhase = ["configure", "signal", "execute"][nextPhase];
        progressLabel.textContent = phase.label;
        titleLabel.textContent = phase.title;
        descriptionLabel.textContent = phase.description;
      }

      function updatePhase() {
        const bounds = hero.getBoundingClientRect();
        const travel = Math.max(1, bounds.height - window.innerHeight * 0.45);
        const progress = THREE.MathUtils.clamp((-bounds.top + window.innerHeight * 0.18) / travel, 0, 0.999);
        setPhase(Math.min(2, Math.floor(progress * 3)));
      }

      function resize() {
        const bounds = desk.querySelector(".desk-stage").getBoundingClientRect();
        const width = Math.max(1, Math.floor(bounds.width));
        const height = Math.max(1, Math.floor(bounds.height));
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }

      function onPointerMove(event) {
        const bounds = desk.getBoundingClientRect();
        pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      }

      function render() {
        if (active && sceneVisible && !document.hidden) {
          const time = clock.getElapsedTime();
          deskGroup.rotation.y += ((-0.34 + pointer.x * 0.09) - deskGroup.rotation.y) * 0.035;
          deskGroup.rotation.x += ((-0.17 + pointer.y * 0.045) - deskGroup.rotation.x) * 0.035;
          camera.position.set(pointer.x * 0.22, 0.12 - pointer.y * 0.12, 13.9);
          camera.lookAt(target);
          manager.rotation.z = Math.sin(time * 1.1) * 0.018;
          signal.position.y = 0.2 + Math.sin(time * 1.8) * 0.08;
          signal.rotation.z += 0.015;
          ring.rotation.z -= 0.026;
          const phaseStrength = currentPhase === 0 ? 1 : currentPhase === 1 ? 1.45 : 1.85;
          signalOrb.scale.setScalar(currentPhase === 1 ? 1 + Math.sin(time * 4) * 0.12 : 0.8);
          signalOrb.material.emissiveIntensity = phaseStrength;
          actionDot.scale.setScalar(currentPhase === 2 ? 1 + Math.sin(time * 5) * 0.2 : 0.72);
          greenLight.intensity = currentPhase === 2 ? 9 : 7;
          renderer.render(scene, camera);
        }
        window.requestAnimationFrame(render);
      }

      const observer = new IntersectionObserver((entries) => {
        sceneVisible = entries.some((entry) => entry.isIntersecting);
      }, { threshold: 0.06 });

      camera.position.set(0, 0.12, 13.9);
      camera.lookAt(target);
      resize();
      updatePhase();
      setPhase(0);
      observer.observe(hero);
      window.addEventListener("resize", resize, { passive: true });
      window.addEventListener("scroll", updatePhase, { passive: true });
      desk.addEventListener("pointermove", onPointerMove, { passive: true });
      desk.addEventListener("pointerleave", () => pointer.set(0, 0), { passive: true });
      document.addEventListener("visibilitychange", () => { active = !document.hidden; });
      reducedMotion.addEventListener("change", (event) => {
        if (event.matches) window.location.reload();
      });
      document.documentElement.classList.add("webgl-ready");
      render();
    } catch (error) {
      console.warn("Pocket trading desk WebGL scene unavailable; static illustration retained.", error);
    }
  }
}
