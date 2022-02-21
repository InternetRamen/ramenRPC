const { ipcRenderer, contextBridge } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
    let hour = new Date().getHours();

    document.querySelector("#main").innerHTML =
        "Good " +
        ((hour < 12 && "Morning") || (hour < 18 && "Afternoon") || "Evening") +
        ", Jaden";

    document.querySelector(".form-floating").addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(document.querySelector("#obj").value);
        ipcRenderer.send("a", document.querySelector("#obj").value);
        ipcRenderer.on("reply", (event, arg) => {
            document.querySelector(".form-control").classList.add("success");
            setTimeout(function() {
                document
                    .querySelector(".form-control")
                    .classList.remove("success");
            }, 3000)
        })
    });
});
