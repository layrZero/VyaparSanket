// The three examples use fictional instruments and independent starting positions.
export const samples = {
  intraday: { goal: "trading", order: "Buy 1 share of Sample A · Market order · Intraday" },
  investment: { goal: "investing", order: "Buy 1 share of Sample B · Market order · Long-term investment" },
  close: { order: "Sell the 1 share of Sample C already held · Market order · Close position" }
};

export const phaseDuration = { toPhone: 1550, check: 850, toBroker: 1450 };

export function initialState(run = 0) {
  return { run, phase: "idle", goal: "trading", mode: "manual", signal: "intraday",
    positionOpen: true, reason: "", phaseStartedAt: 0 };
}

const options = {
  goal: ["trading", "investing"],
  mode: ["manual", "automatic"],
  signal: Object.keys(samples)
};

export function transition(state, event, now = 0) {
  const next = (phase, changes = {}) => ({ ...state, phase, phaseStartedAt: now, ...changes });
  switch (event.type) {
    case "reset":
      return initialState(state.run + 1);
    case "select":
      if (!options[event.field]?.includes(event.value) || state[event.field] === event.value) return state;
      return next("idle", { [event.field]: event.value, run: state.run + 1, reason: "", positionOpen: true });
    case "send":
    case "replay": {
      const ready = event.type === "send" ? state.phase === "idle" : ["skipped", "done"].includes(state.phase);
      return ready ? next("toPhone", { run: state.run + 1, positionOpen: true, reason: "" }) : state;
    }
  }
  if (event.run !== state.run) return state;
  if (event.type === "confirm" && state.phase === "review") return next("toBroker");
  if (event.type === "skip" && state.phase === "review") return next("skipped", { reason: "visitor" });
  if (event.type !== "advance" || event.phase !== state.phase) return state;
  switch (state.phase) {
    case "toPhone":
      return next("check");
    case "check":
      if (state.signal === "close") return next("review");
      if (samples[state.signal].goal !== state.goal) return next("skipped", { reason: "goal" });
      return next(state.mode === "manual" ? "review" : "toBroker");
    case "toBroker":
      return next("done", { positionOpen: state.signal !== "close" });
    default:
      return state;
  }
}

export function statusText(state) {
  switch (state.phase) {
    case "idle": return "Ready for a sample signal.";
    case "toPhone": return "The partner sent the sample signal to your phone.";
    case "check": return state.signal === "close" ? "Your phone found the sample open position." : "Your phone is checking the signal against your sample settings.";
    case "review": return state.signal === "close" ? "Review and confirm to close the sample position." : "This opening signal matches your goal. Review the simulated order.";
    case "toBroker": return "Your phone sent the simulated order to the broker.";
    case "done": return state.signal === "close" ? "Closing order simulated" : "Opening order simulated";
    case "skipped":
      if (state.reason === "goal") return state.signal === "intraday"
        ? "Skipped — this intraday signal is outside your selected goal"
        : "Skipped — this investment signal is outside your selected goal";
      return state.signal === "close" ? "Close skipped. The sample position stays open." : "Opening order skipped.";
  }
}
