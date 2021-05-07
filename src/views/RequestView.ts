import vscode from 'vscode';
import { CommandRegistry } from '../command-registry';
import { Command } from '../types/command';
import { getWebviewContent } from '../webview';
import { Singleton } from './SingletonContainer';

export interface RequestViewOptions {
    readonly assetsRoot: vscode.Uri,
    readonly context: vscode.ExtensionContext
    readonly commands: CommandRegistry
}

export class RequestView implements Singleton<vscode.WebviewPanel, RequestViewOptions> {
    value?: vscode.WebviewPanel;
    
    shouldUpdate = false;

    get(opts: RequestViewOptions): vscode.WebviewPanel {
        const panel = vscode.window.createWebviewPanel(
            "request-it.request",
            "Request",
            {
                viewColumn: vscode.ViewColumn.One,
            },
            {
                enableScripts: true,
                enableCommandUris: true,
            }
        );

        panel.webview.onDidReceiveMessage((t: Command<any>) => opts.commands.call<any>(t));
        panel.webview.html = getWebviewContent(opts.assetsRoot, "/request");
        
        const onDispose = panel.onDidDispose(() => {
            this.value = undefined;
            this.shouldUpdate = true;
        });

        opts.context.subscriptions.push(panel, onDispose);

        return panel;
    }
}