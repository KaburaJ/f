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

      // Embed the HTML content as a string directly into the JavaScript file
      const htmlContent = `
	  <!DOCTYPE html>
	  <html lang="en">
		<head>
		  <meta charset="UTF-8" />
		  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
		  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		  <title>Fetro Collections</title>
		  <style>
			.gallery {
			  --s: 180px;
			  --g: 6px;
	  
			  display: grid;
			  grid: auto-flow var(--s) / repeat(2, var(--s));
			  gap: var(--g);
			}
	  
			.button {
			  width: 100px;
			  margin-left: 170px;
			  margin-top: 20px;
			  place-content: center;
			}
			.gallery > img {
			  width: 100%;
			  aspect-ratio: 1;
			  cursor: pointer;
			  filter: grayscale();
			  z-index: 0;
			  transition: 0.25s, z-index 0s 0.25s;
			}
			.gallery > img:hover {
			  width: calc(200% + var(--g));
			  filter: grayscale(0);
			  z-index: 1;
			  --_c: 50%;
			  transition: 0.4s, z-index 0s;
			}
			.gallery > img:nth-child(1) {
			  clip-path: circle(var(--_c, 55% at 70% 70%));
			  place-self: start;
			}
			.gallery > img:nth-child(2) {
			  clip-path: circle(var(--_c, 55% at 30% 70%));
			  place-self: start end;
			}
			.gallery > img:nth-child(3) {
			  clip-path: circle(var(--_c, 55% at 70% 30%));
			  place-self: end start;
			}
			.gallery > img:nth-child(4) {
			  clip-path: circle(var(--_c, 55% at 30% 30%));
			  place-self: end;
			}
	  
			body {
			  margin: 0;
			  min-height: 100vh;
			  background: #000;
			  display: flex;
			  flex-direction: column !important;
			  align-items: center;
			  gap: 40px;
			  color: white;
			}
			.row {
			  display: grid;
			  grid-template-columns: repeat(3, 1fr);
			  place-content: center;
			  margin-bottom: 40px;
			}
	  
			@media screen and (max-width: 900px) {
			  .row {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				place-content: center;
				margin-bottom: 40px;
			  }
			  .gallery {
				--s: 150px;
				--g: 6px;
	  
				display: grid;
				grid: auto-flow var(--s) / repeat(2, var(--s));
				gap: var(--g);
			  }
			  .button {
				width: 100px;
				margin-left: 100px;
				margin-top: 20px;
				place-content: center;
			  }
			}
			@media screen and (max-width: 400px) {
			  .row {
				display: flex;
				flex-direction: column;
				place-content: center;
				margin-bottom: 40px;
			  }
			}
		  </style>
		</head>
	  
		<body>
		  <h1>Fetro Collections</h1>
		  <div class="row">
			<div>
			  <div class="gallery">
				<img
				  src=\${panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'images', 'cars', '1.jpg'))}
				  alt="a big park inside a modern city"
				/>
				<img
				  src="/images/cars/2.jpg"
				  alt="a small street between building"
				/>
				<img
				  src="/images/cars/3.jpg"
				  alt="seen from the sky of a big city"
				/>
				<img
				  src="/images/cars/4.jpg"
				  alt="a bridge in the night"
				/>
			  </div>
			  <button class="button" id="selectCollection1">select</button>
			</div>
			<div>
			  <div class="gallery">
				<img
				  src="/images/family/1.jpg"
				  alt="a big park inside a modern city"
				/>
				<img
				  src="/images/family/2.jpg"
				  alt="a small street between building"
				/>
				<img
				  src="/images/family/3.jpg"
				  alt="seen from the sky of a big city"
				/>
				<img
				  src="/images/family/4.jpg"
				  alt="a bridge in the night"
				/>
			  </div>
			  <button class="button" id="selectCollection2">select</button>
			</div>
			<div>
			  <div class="gallery">
				<img
				  src="/images/leo/1.jpg"
				  alt="a big park inside a modern city"
				/>
				<img
				  src="/images/leo/2.jpg"
				  alt="a small street between building"
				/>
				<img
				  src="/images/leo/3.jpg"
				  alt="seen from the sky of a big city"
				/>
				<img
				  src="/images/leo/4.jpg"
				  alt="a bridge in the night"
				/>
			  </div>
			  <button class="button" id="selectCollection3">select</button>
			</div>
		  </div>
		  <div class="row">
			<div>
			  <div class="gallery">
				<img
				  src="/images/family/5.jpg"
				  alt="a big park inside a modern city"
				/>
				<img
				  src="/images/family/6.jpg"
				  alt="a small street between building"
				/>
				<img
				  src="/images/family/7.jpg"
				  alt="seen from the sky of a big city"
				/>
				<img
				  src="/images/family/1.jpg"
				  alt="a bridge in the night"
				/>
			  </div>
			  <button class="button" id="selectCollection4">select</button>
			</div>
			<div>
			  <div class="gallery">
				<img
				  src="/images/rick/1.jpg"
				  alt="a big park inside a modern city"
				/>
				<img
				  src="/images/rick/2.jpg"
				  alt="a small street between building"
				/>
				<img
				  src="/images/rick/3.jpg"
				  alt="seen from the sky of a big city"
				/>
				<img
				  src="/images/rick/4.jpg"
				  alt="a bridge in the night"
				/>
			  </div>
			  <button class="button" id="selectCollection5">select</button>
			</div>
			<div>
			  <div class="gallery">
				<img
				  src="/images/ted/1.jpg"
				  alt="a big park inside a modern city"
				/>
				<img
				  src="/images/ted/2.jpg"
				  alt="a small street between building"
				/>
				<img
				  src="/images/ted/3.jpg"
				  alt="seen from the sky of a big city"
				/>
				<img
				  src="/images/ted/4.jpg"
				  alt="a bridge in the night"
				/>
			  </div>
			  <button class="button" id="selectCollection6">select</button>
			</div>
		  </div>
		  <div class="row">
			<div>
			  <div class="gallery">
				<img
				  src="/images/house/1.jpg"
				  alt="a big park inside a modern city"
				/>
				<img
				  src="/images/house/2.jpg"
				  alt="a small street between building"
				/>
				<img
				  src="/images/house/3.jpg"
				  alt="seen from the sky of a big city"
				/>
				<img
				  src="/images/house/4.jpg"
				  alt="a bridge in the night"
				/>
			  </div>
			  <button class="button" id="selectCollection7">select</button>
			</div>
			<div>
			  <div class="gallery">
				<img
				  src="/images/family/5.jpg"
				  alt="a big park inside a modern city"
				/>
				<img
				  src="/images/family/6.jpg"
				  alt="a small street between building"
				/>
				<img
				  src="/images/family/7.jpg"
				  alt="seen from the sky of a big city"
				/>
				<img
				  src="vscode-resource:/fetro/images/family/1.jpg"
				  alt="a bridge in the night"
				/>
			  </div>
			  <button class="button" id="selectCollection8">select</button>
			</div>
			<div>
			  <div class="gallery">
				<img
				  src="https://picsum.photos/id/1029/500/500"
				  alt="a big park inside a modern city"
				/>
				<img
				  src="https://picsum.photos/id/1047/500/500"
				  alt="a small street between building"
				/>
				<img
				  src="https://picsum.photos/id/1067/500/500"
				  alt="seen from the sky of a big city"
				/>
				<img
				  src="https://picsum.photos/id/122/500/500"
				  alt="a bridge in the night"
				/>
			  </div>
			  <button class="button" id="selectCollection9">select</button>
			</div>
		  </div>
		  <script>
			  const selectButtons = document.querySelectorAll(".button");
	  
			  selectButtons.forEach((button, index) => {
				  button.addEventListener("click", () => {
					  vscode.postMessage({ command: "selectCollection", collectionIndex: index });
				  });
			  });
		  </script>
	  </html>	  
      `;

      panel.webview.html = htmlContent;

      panel.webview.onDidReceiveMessage((message) => {
        if (message.command === "navigateToSliderPage") {
          const sliderPageUri = vscode.Uri.file(
            path.join(context.extensionPath, "style.html")
          );
          // Asynchronously read the HTML content for the slider page
          fs.readFile(sliderPageUri.fsPath, "utf8", (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            panel.webview.html = data;
          });
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
