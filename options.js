const textarea = document.querySelector("#textarea");
const save = document.querySelector("#save");
const checkbox = document.querySelector("#enabled");

save.addEventListener("click", () => {
  console.log("Saved!");
});

checkbox.addEventListener("change", ev => {
  console.log("Changed!");
  console.log(ev);
});

window.addEventListener("DOMContentLoaded", () => {
  console.log("Loaded!");
});
