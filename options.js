const textarea = document.querySelector("#textarea");
const save = document.querySelector("#save");
const checkbox = document.querySelector("#enabled");
const times = document.querySelector("#times");

save.addEventListener("click", () => {
  const blocked = textarea.value
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean);

  const targetTimes = times.value.split("-").map(s =>
    s
      .trim()
      .split(":")
      .map(c => parseInt(c))
  );
  const [startTime, endTime] = targetTimes;

  // Check time for enabled or not
  const currentDate = new Date();
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    startTime[0],
    startTime[1]
  );
  const endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    endTime[0],
    endTime[1]
  );

  // console.log(startDate);
  // console.log(currentDate);
  // console.log(endDate);

  const enabled = currentDate > startDate && currentDate < endDate;
  // chrome.storage.local.set({ blocked });
  chrome.storage.local.set({ blocked, enabled, startTime, endTime });
  // console.log(enabled);
});

checkbox.addEventListener("change", ev => {
  // console.log(new Date().getMinutes());
  // const enabled = ev.target.checked;
  // chrome.storage.local.set({ enabled });
});

window.addEventListener("DOMContentLoaded", () => {
  // Set value of text area to value of "blocked" sites
  chrome.storage.local.get(
    ["blocked", "enabled", "startTime", "endTime"],
    function (local) {
      const { blocked, enabled, startTime, endTime } = local;
      if (Array.isArray(blocked)) {
        textarea.value = blocked.join("\n");
        checkbox.checked = enabled;
      }
      times.value = startTime.join(":") + "-" + endTime.join(":");
    }
  );
});
