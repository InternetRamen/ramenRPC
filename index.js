// Modules to control application life and create native browser window
const {
    app,
    BrowserWindow,
    nodeIntegration,
    ipcMain,
    Tray,
    Menu,
} = require("electron");
const path = require("path");
let tray = null
function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        icon: "./icon.ico",
        show: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });
     tray = new Tray(path.join(__dirname, "icon.ico"));
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Show App",
            click: function () {
                mainWindow.show();
            },
        },
        {
            label: "Quit",
            click: function () {
                app.isQuiting = true;
                app.quit();
            },
        },
    ]);
    tray.setContextMenu(contextMenu);

    mainWindow.on("minimize", function (event) {
        event.preventDefault();
        mainWindow.hide();
    });

    mainWindow.on("close", function (event) {
        if (!app.isQuiting) {
            event.preventDefault();
            mainWindow.hide();
        }
    });
    mainWindow.loadFile(`index.html`);
    // mainWindow.webContents.openDevTools()
    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.setLoginItemSettings({
    openAtLogin: true,
});

app.whenReady().then(() => {
    createWindow();

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

try {
    require("electron-reloader")(module, { debug: true, watchRenderer: true });
} catch {}

const clientId = "940402794425376778";

const RPC = require("discord-rpc");

const client = new RPC.Client({ transport: "ipc" });
const start = new Date();
let detail = "";
function setActivity(status) {
    client.setActivity({
        largeImageKey: "bigtransparentpfp",
        largeImageText: "InternetRamen#7457",
        details: status,
        buttons: [
            {
                label: "hmu",
                url: "https://jadenhou.me",
            },
        ],
        startTimestamp: start,
    });
}

client.on("ready", () => {
    console.log("Ready!");
});
ipcMain.on("a", (event, args) => {
    console.log(args);
    detail = args;
    setActivity(detail);
    event.reply("reply", "yay");
});

// Log in to RPC with client id
client.login({ clientId });
