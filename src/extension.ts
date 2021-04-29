import * as vscode from "vscode";
import { WebviewViewProvider } from "vscode";
import { join } from "path";
import { readFileSync } from "fs";
import { get } from "http";
class RequestItHomeProvider implements WebviewViewProvider {
  constructor(public uri: vscode.Uri) {}

  public getNonce() {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  public getWebviewContent() {
    // <meta http-equiv="refresh" content="2;url=http://localhost:8080" />
    const nonce = this.getNonce();

    return `
		<!DOCTYPE html>
		<html lang="">
			<head>
				<meta charset="utf-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width,initial-scale=1.0">
				<link rel="icon" href="/favicon.ico">
				<title>request.it</title>
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src 'nonce-${nonce}' 'unsafe-eval'; object-src 'self';style-src vscode-resource: 'unsafe-inline' http: https: data:;">
				<base href="${this.uri.with({ scheme: "vscode-resource" })}/">
				<!--<link rel="stylesheet" type="text/css" href="/">-->
			</head>
			<body>
				<noscript>
					<strong>We're sorry but request.it doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
				</noscript>
				<div id="app"></div>
				<!-- built files will be auto injected -->
				<script type="text/javascript" nonce="${nonce}" src="js/chunk-vendors.js"></script>
				<script type="text/javascript" nonce="${nonce}" src="js/app.js"></script>
			</body>
		</html>		
		`;
  }

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext<unknown>,
    token: vscode.CancellationToken
  ): void | Thenable<void> {
    webviewView.webview.options = {
      // localResourceRoots: [this.uri],
      enableScripts: true,
      enableCommandUris: true,
      portMapping: [
        {
          extensionHostPort: 8080,
          webviewPort: 8080,
        },
      ],
    };

    // if (process.env.NODE_ENV === "development") {
    //   let html = "";
    //   get("http://localhost:8080", (res) => {
    //     res.on("data", (chunk) => {
    //       html += chunk;
    //     });
    //     res.on("close", () => {
    //       console.log("close", html);
    //       webviewView.webview.html = html;
    //     });
    //     res.on("error", (err) => {
    //       console.log(err);
    //     });
    //   });

    //   return;
    // }

    // webviewView.webview.html = readFileSync(
    //   join(this.uri.fsPath, "index.html"),
    //   {
    //     encoding: "utf8",
    //   }
    // )

    webviewView.webview.html = this.getWebviewContent();
  }
}

export function activate(context: vscode.ExtensionContext) {
  vscode.window.registerWebviewViewProvider(
    "request-it.home",
    new RequestItHomeProvider(
      vscode.Uri.file(join(context.extensionPath, "www"))
    )
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
