import * as THREE from "./assets/vendor/three-0.160.1/three.module.min.js";

import { phaseDuration } from "./sandbox.js";

const homeImage = new URL("./assets/screenshots/vyapar-sanket-home.png", import.meta.url).href;


function finish(color, metalness = 0.05, roughness = 0.58) {
  return new THREE.MeshStandardMaterial({ color, metalness, roughness });
}

// Local XY faces point towards the visitor. Bevels stay small enough to retain crisp edges.
function roundedBody(parent, width, height, depth, radius, material, bevel = 0.015) {
  const x = -width / 2, y = -height / 2, r = radius;
  const shape = new THREE.Shape();
  shape.moveTo(x + r, y);
  shape.lineTo(-x - r, y);
  shape.quadraticCurveTo(-x, y, -x, y + r);
  shape.lineTo(-x, -y - r);
  shape.quadraticCurveTo(-x, -y, -x - r, -y);
  shape.lineTo(x + r, -y);
  shape.quadraticCurveTo(x, -y, x, -y - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth, bevelEnabled: bevel > 0, bevelSize: bevel, bevelThickness: bevel,
    bevelSegments: 2, curveSegments: 6, steps: 1,
  });
  geometry.translate(0, 0, -depth / 2);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function face(parent, width, height, texture, z) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({ map: texture, toneMapped: false, transparent: true }));
  mesh.position.z = z;
  parent.add(mesh);
  return mesh;
}

function drawing(width, height, paint) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  paint(canvas.getContext("2d"), width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function slipPrint() {
  return drawing(640, 780, (ctx) => {
    ctx.fillStyle = "#365345";
    ctx.fillRect(39, 47, 57, 9);
    ctx.font = "bold 26px system-ui";
    ctx.fillText("PARTNER RESEARCH", 40, 111);
    ctx.fillStyle = "#243c30";
    ctx.font = "bold 76px Georgia";
    ctx.fillText("Signal slip", 38, 233);
    ctx.strokeStyle = "#aaa593";
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(40, 277); ctx.lineTo(600, 277); ctx.stroke();
    ctx.fillStyle = "#647263";
    ctx.font = "30px system-ui";
    ctx.fillText("Partner signal", 39, 344);
    ctx.strokeStyle = "#c6c6b8";
    ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      const y = 413 + i * 55;
      ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(592, y); ctx.stroke();
    }
    ctx.fillStyle = "#a3854d";
    ctx.fillRect(40, 699, 82, 8);
  });
}

function brokerPrint() {
  return drawing(640, 240, (ctx) => {
    ctx.fillStyle = "#f8eed4";
    ctx.font = "bold 70px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("Your broker", 320, 140);
    ctx.fillStyle = "#c2a76b";
    ctx.fillRect(281, 181, 78, 6);
  });
}

function disc(parent, x, y, z, radius, height, material) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 20), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  parent.add(mesh);
}

function addPaper(scene) {
  const paper = finish(0xfdf8e9), buff = finish(0xc9b791);
  for (let i = 0; i < 5; i++) {
    const sheet = new THREE.Group();
    sheet.position.set(-2.65 + i * 0.024, 0.07 + i * 0.052, 0.0 - i * 0.015);
    sheet.rotation.set(-Math.PI / 2, 0, -0.13 + i * 0.052, "XYZ");
    scene.add(sheet);
    roundedBody(sheet, 1.94, 2.36, i === 0 ? 0.07 : 0.035, 0.035, i === 0 ? buff : paper, 0.005);
    if (i === 4) face(sheet, 1.88, 2.29125, slipPrint(), 0.026);
  }
}

function addPhone(scene, texture) {
  const height = 3.66;
  const width = height * texture.image.width / texture.image.height;
  const phone = new THREE.Group();
  phone.position.set(-0.03, 2.0, -0.30);
  phone.rotation.set(-0.125, -0.07, -0.018);
  scene.add(phone);
  roundedBody(phone, width + 0.18, height + 0.20, 0.17, 0.16, finish(0x3c4042, 0.68, 0.32), 0.029);
  roundedBody(phone, width + 0.13, height + 0.15, 0.012, 0.12, finish(0x141917, 0.18), 0.009).position.z = 0.104;
  face(phone, width, height, texture, 0.123);
  const holder = roundedBody(scene, width + 0.48, 0.18, 1.05, 0.09, finish(0x333c37, 0.45), 0.035);
  holder.position.set(-0.03, 0.14, -0.28);
  const lip = roundedBody(scene, width + 0.16, 0.20, 0.16, 0.055, finish(0x29312f, 0.55), 0.015);
  lip.position.set(-0.03, 0.27, 0.13);
}

function addBroker(scene) {
  const broker = new THREE.Group();
  broker.position.set(2.82, 0.50, -0.20);
  broker.rotation.y = -0.15;
  scene.add(broker);
  const green = finish(0x23563f, 0.26, 0.39), base = finish(0x263c31, 0.35);
  roundedBody(broker, 1.84, 0.62, 0.90, 0.14, base, 0.07).position.y = -0.07;
  roundedBody(broker, 1.87, 0.65, 1.00, 0.16, green, 0.08).position.y = 0.06;
  const label = face(broker, 1.62, 0.6075, brokerPrint(), 0.595);
  label.position.y = 0.07;
  const brass = finish(0xd2ad65, 0.55, 0.30);
  for (const x of [-0.66, 0.66]) {
    disc(broker, x, 0.475, -0.30, 0.046, 0.014, brass);
  }
  for (let i = 0; i < 5; i++) {
    const slat = roundedBody(broker, 0.46, 0.027, 0.024, 0.01, base, 0);
    slat.position.set(0, 0.47, -0.25 + i * 0.105);
  }
}

function addPath(scene) {
  const points = [
    [-2.58, 0.094, 1.08], [-2.58, 0.09, 1.50], [-2.35, 0.09, 1.69],
    [-0.32, 0.09, 1.69], [-0.03, 0.09, 1.49], [-0.03, 0.09, 0.29],
    [0.45, 0.09, 0.27], [0.72, 0.09, 0.64], [1.24, 0.09, 0.73],
    [2.58, 0.09, 0.73], [2.80, 0.09, 0.59], [2.80, 0.09, 0.55],
  ].map(([x,y,z]) => new THREE.Vector3(x,y,z));
  const path = new THREE.CatmullRomCurve3(points);
  const line = new THREE.Mesh(new THREE.TubeGeometry(path, 90, 0.030, 8, false), finish(0xc2974d, 0.58, 0.32));
  line.castShadow = true;
  scene.add(line);
  // A raised amber beacon with a dark rim stays readable over paper and brass.
  const pulse = new THREE.Group();
  const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.24),
    new THREE.MeshStandardMaterial({ color: 0xffb32e, emissive: 0xa56005, emissiveIntensity: 0.51 }));
  core.position.y = 0.18;
  core.scale.y = 1.32;
  pulse.add(core);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.23, 0.041, 8, 36), finish(0x553711));
  rim.rotation.x = -Math.PI / 2;
  pulse.add(rim);
  scene.add(pulse);
  return { pulse, path, phoneStop: 5 / (points.length - 1) };
}

function makeDesk(texture) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe8e1d3);
  const camera = new THREE.OrthographicCamera(-4.72, 4.72, 3.147, -3.147, 0.1, 80);
  camera.position.set(2.05, 7.68, 13.4);
  camera.lookAt(0, 1.64, 0);
  scene.add(new THREE.HemisphereLight(0xfffffa, 0xbab8af, 2));
  const light = new THREE.DirectionalLight(0xfffcf1, 2.6);
  light.position.set(-4, 8, 5);
  light.castShadow = true;
  light.shadow.mapSize.set(512, 512);
  Object.assign(light.shadow.camera, {left:-6, right:6, top:5, bottom:-5, far:22});
  light.shadow.normalBias = 0.022;
  light.shadow.bias = -0.0002;
  light.shadow.radius = 5;
  light.shadow.blurSamples = 6;
  scene.add(light);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), finish(0xd7d2c6, 0.01, 0.91));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);
  const grid = new THREE.GridHelper(48, 60, 0xb2a58b, 0xb2a58b);
  grid.material.transparent = true;
  grid.material.opacity = 0.25;
  grid.position.y = 0.004;
  scene.add(grid);
  // The recessed green base gives the route a distinct working surface.
  const plinth = new THREE.Group();
  plinth.position.set(0,-0.12,0.06);
  plinth.rotation.x = -Math.PI / 2;
  scene.add(plinth);
  roundedBody(plinth, 8.5, 4.7, 0.20, 0.26, finish(0x183e33,0.15), 0.035);
  floor.position.y = -0.27;
  grid.position.y = -0.265;
  addPaper(scene);
  addPhone(scene, texture);
  addBroker(scene);
  return { scene, camera, ...addPath(scene) };
}

export async function mountDesk(container) {
  // Complete the image decode before attaching a canvas so failures preserve the still.
  const texture = await new THREE.TextureLoader().loadAsync(homeImage);
  texture.colorSpace = THREE.SRGBColorSpace;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "low-power" });
  } catch (error) {
    texture.dispose();
    throw error;
  }
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.6));
  const {scene, camera, path, pulse, phoneStop} = makeDesk(texture);
  const canvas = renderer.domElement;
  canvas.className = "desk-render";
  canvas.setAttribute("aria-hidden", "true");
  container.append(canvas);

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let state = { phase: "idle", run: 0, phaseStartedAt: performance.now() };
  let onScreen = true;
  let frameId = 0;
  let destroyed = false;
  function cancelFrame() {
    cancelAnimationFrame(frameId);
    frameId = 0;
  }
  function schedule() {
    if (!destroyed && onScreen && !document.hidden && !frameId) frameId = requestAnimationFrame(draw);
  }
  function draw(now) {
    frameId = 0;
    if (destroyed || !onScreen || document.hidden) return;
    const travelling = state.phase === "toPhone" || state.phase === "toBroker";
    const duration = travelling ? phaseDuration[state.phase] : 0;
    const progress = duration && !reducedMotion.matches
      ? Math.min(1, Math.max(0, (now - state.phaseStartedAt) / duration)) : 1;
    const eased = progress * progress * (3 - 2 * progress);
    let t = phoneStop;
    if (state.phase === "toPhone") t = phoneStop * eased;
    if (state.phase === "toBroker") t = phoneStop + (1 - phoneStop) * eased;
    if (state.phase === "done") t = 1;
    pulse.visible = state.phase !== "idle";
    pulse.position.copy(path.getPoint(t));
    pulse.position.y += 0.14;
    renderer.render(scene, camera);
    if (duration && progress < 1) schedule();
  }
  function resize() {
    if (destroyed) return;
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(Math.round(width), Math.round(height), false);
    const halfHeight = Math.max(3.147, 4.72 * height / width);
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.right = halfHeight * width / height;
    camera.left = -camera.right;
    camera.updateProjectionMatrix();
    schedule();
  }
  function visibility() {
    if (document.hidden || !onScreen) cancelFrame();
    else schedule();
  }
  const intersection = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    visibility();
  });
  const size = new ResizeObserver(resize);
  function destroy() {
    if (destroyed) return;
    destroyed = true;
    cancelFrame();
    intersection.disconnect();
    size.disconnect();
    document.removeEventListener("visibilitychange", visibility);
    reducedMotion.removeEventListener("change", schedule);
    canvas.removeEventListener("webglcontextlost", destroy);
    canvas.remove();
    const materials = new Set();
    scene.traverse((object) => {
      object.geometry?.dispose();
      if (object.material) materials.add(object.material);
    });
    for (const material of materials) {
      material.map?.dispose();
      material.dispose();
    }
    renderer.dispose();
  }
  canvas.addEventListener("webglcontextlost", destroy);
  intersection.observe(container);
  size.observe(container);
  document.addEventListener("visibilitychange", visibility);
  reducedMotion.addEventListener("change", schedule);
  resize();
  return {
    update(next) {
      if (destroyed) return;
      state = { ...next, phaseStartedAt: next.phaseStartedAt ?? performance.now() };
      schedule();
    },
    destroy,
  };
}
