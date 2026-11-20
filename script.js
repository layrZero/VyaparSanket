import { initialState, phaseDuration, samples, statusText, transition } from "./sandbox.js";

const byId = id => document.getElementById("sandbox-" + id);
const panel = document.getElementById("sandbox");
const controls = byId("controls");
const status = byId("status");
const order = byId("order");
const position = byId("position");
const send = byId("send");
const confirmOrder = byId("confirm");
const skip = byId("skip");
const replay = byId("replay");
const reset = byId("reset");
const playOnDesk = document.querySelector(".desk-play");
const stage = document.querySelector(".desk-stage");
const backup = document.querySelector(".backup-pulse");
const fields = ["goal", "mode", "signal"];
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const phaseLabels = {
  idle: "Ready at partner", toPhone: "Partner → phone", check: "Phone checks settings",
  review: "Waiting at your phone", skipped: "Stopped at your phone",
  toBroker: "Phone → broker", done: "Broker received order"
};
let state = initialState();
let timer;
let desk;
let opened = false;

async function openDesk() {
  if (opened) return;
  opened = true;
  playOnDesk.hidden = true;
  controls.before(document.querySelector(".hero-figure"));
  panel.classList.add("is-running");
  document.querySelector(".hero").classList.add("demo-open");
  panel.scrollIntoView({block:"start"});
  try {
    const {mountDesk} = await import("./scene.js");
    desk = await mountDesk(document.getElementById("desk"));
    desk.update(state);
  } catch {
    // The signal also travels over the rendered still while WebGL is unavailable.
  }
}

function render() {
  const focus = document.activeElement;
  const finished = ["done","skipped"].includes(state.phase);
  const review = state.phase === "review";
  for (const field of fields) byId(field).value = state[field];
  status.textContent = statusText(state);
  order.textContent = samples[state.signal].order;
  order.hidden = !(review || state.phase === "toBroker" || state.phase === "done");
  position.hidden = state.signal !== "close";
  position.textContent = state.positionOpen ? "Sample position: 1 share of Sample C is open." : "Sample position: Sample C is closed.";
  send.hidden = review || finished;
  send.setAttribute("aria-disabled", String(state.phase !== "idle"));
  confirmOrder.hidden = skip.hidden = !review;
  replay.hidden = !finished;
  replay.setAttribute("aria-describedby", status.id);
  confirmOrder.setAttribute("aria-describedby", status.id + " " + order.id);
  if ([panel,send,replay,confirmOrder,skip].includes(focus) && (focus.hidden || focus === panel)) {
    (review ? confirmOrder : finished ? replay : send).focus({preventScroll:true});
  }
  stage.hidden = !opened;
  stage.textContent = phaseLabels[state.phase];
  backup.hidden = !opened || state.phase === "idle";
  backup.style.setProperty("--travel", (phaseDuration[state.phase] || 0) + "ms");
  backup.dataset.phase = state.phase;
  if (desk) {
    try { desk.update(state); }
    catch { desk.destroy(); desk = undefined; }
  }
}

function schedule() {
  clearTimeout(timer);
  const delay = phaseDuration[state.phase];
  if (delay === undefined) return;
  const event = {type:"advance", phase:state.phase, run:state.run};
  if (reduced.matches) dispatch(event);
  else timer = setTimeout(() => dispatch(event), Math.max(0, state.phaseStartedAt + delay - performance.now()));
}
function dispatch(event) {
  const next = transition(state,event,performance.now());
  if (next === state) return;
  state = next;
  render();
  schedule();
}
function start(event,type) {
  if (event.detail > 1) return;
  void openDesk();
  dispatch({type});
}
for (const field of fields) byId(field).addEventListener("change", event => dispatch({type:"select",field,value:event.target.value}));
send.addEventListener("click", event => start(event,"send"));
replay.addEventListener("click", event => start(event,"replay"));
confirmOrder.addEventListener("click", () => dispatch({type:"confirm",run:state.run}));
skip.addEventListener("click", () => dispatch({type:"skip",run:state.run}));
reset.addEventListener("click", () => dispatch({type:"reset"}));
for (const link of document.querySelectorAll("[data-try-signal]")) {
  link.addEventListener("click",event => {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    start(event,["done","skipped"].includes(state.phase) ? "replay" : "send");
  });
}
reduced.addEventListener("change",schedule);
render();
controls.hidden = false;
playOnDesk.hidden = false;
byId("example").hidden = true;
if (new URLSearchParams(location.search).get("demo") === "signal") {
  void openDesk();
  dispatch({type:"send"});
}
