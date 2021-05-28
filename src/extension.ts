import * as vscode from "vscode";
import { join } from "path";
import { CollectionExplorer } from "./collection-explorer";
import { HttpClient } from "./http/Agent";
import { JSONRequestInterceptor } from "./http/interceptors/json/request.interceptor";
import { CommandRegistry } from "./command-registry";
import { Request } from "./types/request-file";
import { VarsRequestInterceptor } from "./http/interceptors/vars/request.interceptor";
import { RequestView } from "./views/RequestView";
import { ResponseView } from "./views/ResponseView";
import { SingletonContainer } from "./views/SingletonContainer";
import { TimeRequestInterceptor } from "./http/interceptors/time/request.interceptor";
import { TimeResponseInterceptor } from "./http/interceptors/time/response.interceptor";
import { TextResponseInterceptor } from "./http/interceptors/text/response.interceptor";
import { FormRequestInterceptor } from "./http/interceptors/form/request.interceptor";
import { FormData } from "./types/form-data";

export function activate(context: vscode.ExtensionContext) {
  const client = new HttpClient();

  client.interceptors.request.use(new JSONRequestInterceptor());
  client.interceptors.request.use(new VarsRequestInterceptor());
  client.interceptors.request.use(new TimeRequestInterceptor());
  client.interceptors.request.use(new FormRequestInterceptor());
  client.interceptors.response.use(new TimeResponseInterceptor());
  client.interceptors.response.use(new TextResponseInterceptor());

  const assetsRoot = vscode.Uri.file(join(context.extensionPath, "www"));
  const commands = new CommandRegistry();

  commands.add("request", (request: Request) => {
    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Window,
        title: "Requisitando...",
      },
      async () => {
        try {
          const responsePanel = SingletonContainer.get(ResponseView);
          request.url = "https://httpbin.org/post";
          request.method = "POST";
          request.contentType = "multipart";
          request.body = FormData.from({ a: "1" });
          const res = await client.request(request);
          console.log("response", res);

          responsePanel.reveal(vscode.ViewColumn.Two);
          responsePanel.webview.postMessage({ name: "response", args: res });
        } catch (error) {
          console.log(error);
        }
      }
    );
  });

  context.subscriptions.push(
    vscode.window.registerTreeDataProvider(
      "request-it.requests",
      new CollectionExplorer()
    ),
    vscode.commands.registerCommand("request-it.create-request", () => {
      SingletonContainer.get(RequestView, { assetsRoot, commands, context });
      SingletonContainer.set(ResponseView, { assetsRoot, commands, context });
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
