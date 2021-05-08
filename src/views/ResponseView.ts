import vscode from 'vscode';
import { CommandRegistry } from '../command-registry';
import { Command } from '../types/command';
import { getWebviewContent } from '../webview';
import { Singleton } from './SingletonContainer';

export interface ResponseViewOptions {
    readonly assetsRoot: vscode.Uri,
    readonly commands: CommandRegistry,
    readonly context: vscode.ExtensionContext
}

export class ResponseView implements Singleton<vscode.WebviewPanel, ResponseViewOptions>  {
    value ?: vscode.WebviewPanel;

    shouldUpdate = false;

    get(opts: ResponseViewOptions) {
        const panel = vscode.window.createWebviewPanel(
            "request-it.response",
            "Response",
            {
                viewColumn: vscode.ViewColumn.Two,
            },
            {
                enableScripts: true,
                enableCommandUris: true,
                localResourceRoots: [opts.assetsRoot]
            }
        );

        panel.webview.onDidReceiveMessage((t: Command<any>) => opts.commands.call<any>(t));
        panel.webview.html = getWebviewContent(opts.assetsRoot, "/response");

        const onDispose = panel.onDidDispose(() => {
            this.value = undefined;
            this.shouldUpdate = true;
        });

        opts.context.subscriptions.push(panel, onDispose);

        return panel;
    }
}
