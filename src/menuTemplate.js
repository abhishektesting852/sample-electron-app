const { shell } = require("electron");

const menuTemplate = [
  {
    label: "Help",
    submenu: [
      {
        label: "Visit Google",
        click: () => shell.openExternal("https://google.com"),
      },
      {
        label: "Quit",
        click: () => app.quit(),
        accelerator: `CmdOrCtrl+W`,
      },
    ],
  },
  {
    label: "About",
    click: () => console.log("Yooooooooo"),
  },
];

module.exports.menuTemplate = menuTemplate;
