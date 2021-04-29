import * as vscode from 'vscode';
import { WebviewViewProvider } from 'vscode';

class RequestItHomeProvider implements WebviewViewProvider {
	resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext<unknown>,
		token: vscode.CancellationToken
	): void | Thenable<void> {
		webviewView.webview.html = `
			<table>
			<tr>
				<td>Col 1</td>
				<td>Col 2</td>
				<td>Col 3</td>
			</tr>
			<tr>
				<td>Col 1</td>
				<td>Col 2</td>
				<td>Col 3</td>
			</tr>
			<tr>
				<td>Col 1</td>
				<td>Col 2</td>
				<td>Col 3</td>
			</tr>
			</table>
		`
	}
}

export function activate(context: vscode.ExtensionContext) {
	vscode.window.registerWebviewViewProvider('request-it.home', new RequestItHomeProvider())
}

// this method is called when your extension is deactivated
export function deactivate() {}
