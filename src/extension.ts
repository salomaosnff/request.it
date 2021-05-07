import * as vscode from "vscode";
import { join } from "path";
import { CollectionExplorer } from "./collection-explorer";
import { HttpClient } from "./http/Agent";
import { JSONRequestInterceptor } from "./http/interceptors/json/request.interceptor";
import { JSONResponseInterceptor } from "./http/interceptors/json/response.interceptor";
import { CommandRegistry } from "./command-registry";
import { Request } from "./types/request-file";
import { VarsRequestInterceptor } from "./http/interceptors/vars/request.interceptor";
import { RequestView } from "./views/RequestView";
import { ResponseView } from "./views/ResponseView";
import { SingletonContainer } from "./views/SingletonContainer";

export function activate(context: vscode.ExtensionContext) {
  const client = new HttpClient();

  client.interceptors.request.use(new JSONRequestInterceptor());
  client.interceptors.response.use(new JSONResponseInterceptor());
  client.interceptors.request.use(new VarsRequestInterceptor());

  const assetsRoot = vscode.Uri.file(join(context.extensionPath, "www"));
  const commands = new CommandRegistry();

  commands.add("request", (request: Request) => {
    vscode.window.withProgress({
      location: vscode.ProgressLocation.Window,
      title: 'Requisitando...'
  }, async () => {
      const res = await client.request(request);
      SingletonContainer
          .get(ResponseView).webview
          .postMessage({ name: "response", args: res });
    });
  });

  context.subscriptions.push(
    vscode.window.registerTreeDataProvider(
      "request-it.requests",
      new CollectionExplorer()
    ),
    vscode.commands.registerCommand("request-it.create-request", () => {
      SingletonContainer.get(RequestView, { assetsRoot, commands, context });
      SingletonContainer.get(ResponseView, { assetsRoot, commands, context });
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
