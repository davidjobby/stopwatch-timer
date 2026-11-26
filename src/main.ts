
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="min-h-screen bg-gray-950 flex items-center justify-center text-white">
    <div class="bg-gray-900 p-8 rounded-xl text-center">

      <h1 class="text-2xl font-bold mb-6">
        Stopwatch & Timer
      </h1>

      <div class="flex gap-3 justify-center mb-5">
        <button id="stopwatch" class="bg-green-600 p-2 rounded">
          Stopwatch
        </button>

        <button id="timer" class="bg-blue-600 p-2 rounded">
          Timer
        </button>
      </div>

      <input
        id="timeInput"
        type="number"
        min="1"
        placeholder="Enter seconds"
        class="hidden bg-gray-700 p-2 rounded mb-4 w-40"
      />

      <h2 id="display" class="text-4xl font-mono mb-6">
        00:00:00
      </h2>

      <div class="flex gap-3 justify-center">
        <button id="start" class="bg-green-600 p-2 rounded">Start</button>
        <button id="pause" class="bg-yellow-600 p-2 rounded">Pause</button>
        <button id="reset" class="bg-red-600 p-2 rounded">Reset</button>
      </div>

    </div>
  </div>
`;

const display = document.getElementById("display")!;
const timeInput = document.getElementById("timeInput") as HTMLInputElement;

let seconds = 0;
let interval: number | undefined;
let mode = "stopwatch";

function showTime() {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  display.textContent =
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(secs).padStart(2, "0");
}

function stop() {
  clearInterval(interval);
  interval = undefined;
}

// Start
document.getElementById("start")!.onclick = () => {
  if (interval !== undefined) return;

  if (mode === "timer" && seconds === 0) {
    seconds = Math.max(0, Math.floor(Number(timeInput.value) || 0));
    showTime();
  }

  if (mode === "timer" && seconds === 0) return;

  interval = window.setInterval(() => {
    if (mode === "stopwatch") {
      seconds++;
    } else {
      seconds--;

      if (seconds === 0) {
        stop();
        alert("Time is up!");
      }
    }

    showTime();
  }, 1000);
};

// Pause
document.getElementById("pause")!.onclick = () => {
  stop();
};

// Reset
document.getElementById("reset")!.onclick = () => {
  stop();
  seconds = 0;
  showTime();
};

// Stopwatch mode
document.getElementById("stopwatch")!.onclick = () => {
  stop();
  mode = "stopwatch";
  seconds = 0;
  timeInput.classList.add("hidden");
  showTime();
};

// Timer mode
document.getElementById("timer")!.onclick = () => {
  stop();
  mode = "timer";
  seconds = 0;
  timeInput.classList.remove("hidden");
  showTime();
};
