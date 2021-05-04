import * as vscode from "vscode";
import { WebviewViewProvider } from "vscode";
import { join } from "path";
import { CollectionExplorer } from "./collection-explorer";
import { getWebviewContent } from "./webview";
import { HttpClient } from "./Agent";

export function activate(context: vscode.ExtensionContext) {
  const client = new HttpClient();

  client.request({
    vars: {},
    url: 'https://api.pubby.club/rooms/browser',
    method: 'GET',
    name: '',
  }).then(res => {
    console.log(res.toString('utf8'));
  });
  // vscode.window.registerWebviewViewProvider(
  //   "request-it.home",
  //   new RequestItHomeProvider(
  //     vscode.Uri.file(join(context.extensionPath, "www"))
  //   )
  // );

  const assetsRoot = vscode.Uri.file(join(context.extensionPath, "www"));

  context.subscriptions.push(
    vscode.window.registerTreeDataProvider(
      "request-it.requests",
      new CollectionExplorer()
    ),
    vscode.commands.registerCommand("request-it.create-request", () => {
      const request = vscode.window.createWebviewPanel(
        "request-it.requests",
        "Request",
        {
          viewColumn: vscode.ViewColumn.One,
        },
        {
          enableScripts: true,
          enableCommandUris: true,
        }
      );

      const response = vscode.window.createWebviewPanel(
        "request-it.requests",
        "Response",
        {
          viewColumn: vscode.ViewColumn.Two,
        },
        {
          enableScripts: true,
          enableCommandUris: true,
        }
      );

      request.webview.html = getWebviewContent(assetsRoot, "/request");
      response.webview.html = getWebviewContent(assetsRoot, "/response");
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
