import { Uri } from "vscode";

function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function getWebviewContent(uri: Uri, route: string) {
  // <meta http-equiv="refresh" content="2;url=http://localhost:8080" />
  const nonce = getNonce();

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
				<base href="${uri.with({ scheme: "vscode-resource" })}/">
				<!--<link rel="stylesheet" type="text/css" href="/">-->
        <script type="text/javascript" nonce="${nonce}">
          const VUE_initialState = "${route}";
					window.vscodeAcquireVsCodeApi = acquireVsCodeApi();
        </script>
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
