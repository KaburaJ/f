const vscode = require("vscode");
const path = require("path");
const fs = require("fs");

function activate(context) {
  console.log('Congratulations, your extension "fetro" is now active!');

  let disposable = vscode.commands.registerCommand(
    "fetro.showImageSlider",
    function () {
      const panel = vscode.window.createWebviewPanel(
        "imageSlider",
        "Image Slider",
        vscode.ViewColumn.One,
        { enableScripts: true }
      );

      const htmlPath = vscode.Uri.file(
        path.join(context.extensionPath, "slider.html")
      );

      // Asynchronously read the HTML content
      fs.readFile(htmlPath.fsPath, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        panel.webview.html = data;
      });

      // Listen for messages from the webview
      panel.webview.onDidReceiveMessage((message) => {
        console.log("Received message from webview:", message);

        if (message.command === "selectCollection") {
          const collectionIndex = message.collectionIndex;
          const customMessage = message.message;
          console.log("Custom message:", customMessage);

          // Display custom message
          vscode.window.showInformationMessage(customMessage);
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
