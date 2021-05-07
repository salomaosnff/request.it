import * as vscode from "vscode";
import { WebviewViewProvider } from "vscode";
import { join } from "path";
import { CollectionExplorer } from "./collection-explorer";
import { getWebviewContent } from "./webview";
import { HttpClient } from "./http/Agent";
import { JSONRequestInterceptor } from "./http/interceptors/json/request.interceptor";
import { JSONResponseInterceptor } from "./http/interceptors/json/response.interceptor";
import { Command } from "./types/command";
import { CommandRegistry } from "./command-registry";
import { Request } from "./types/request-file";

export function activate(context: vscode.ExtensionContext) {
  const client = new HttpClient();

  client.interceptors.request.use(new JSONRequestInterceptor());
  client.interceptors.response.use(new JSONResponseInterceptor());

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

      const commandRegistry = new CommandRegistry();
      commandRegistry.commands.set("request", (request: Request) => {
        client.request(request).then((res) => {
          response.webview.postMessage({ name: "response", args: res });
        });
      });

      request.webview.onDidReceiveMessage((t: Command<any>) => {
        commandRegistry.call<any>(t);
      });

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
