import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { FileType, RelativePattern, TreeItemCollapsibleState, workspace, WorkspaceFolder } from 'vscode';
import { Event, Hover, ProviderResult, TreeDataProvider, TreeItem, Uri, EventEmitter } from 'vscode';

export class CollectionItem extends TreeItem {
    data: any;

    constructor(uri: Uri, public type: FileType) {
        super(uri, type === FileType.Directory ? TreeItemCollapsibleState.Collapsed : TreeItemCollapsibleState.None);

        this.id = uri.fsPath;

        if (type === FileType.File) {
            try {
                this.data = JSON.parse(readFileSync(uri.fsPath, 'utf8'));
                this.tooltip = this.data.description;
            } catch {
                this.data = {};
            }

            this.label = this.data.name;
        }
    }
}

export class CollectionExplorer implements TreeDataProvider<CollectionItem> {
    requestsDir = Uri.joinPath(workspace.workspaceFolders![0].uri, '.request-it/requests');

    tree = new Map<string, {item: CollectionItem, children: string[]}>();
    watcher = workspace.createFileSystemWatcher(new RelativePattern(this.requestsDir, '**/*.json'), false, false, false);

    private _emitter = new EventEmitter<CollectionItem | void>();

    onDidChangeTreeData = this._emitter.event;

    constructor() {
        this.watcher.onDidChange(this.onUpdate, this);
        this.watcher.onDidCreate(this.onUpdate, this);
        this.watcher.onDidDelete(this.onDelete, this);
    }

    onDelete(uri: Uri) {
        const tree = this.tree.get(uri.fsPath)!;

        for (const child of tree.children) {
            this.tree.delete(child);
        }

        this.tree.delete(uri.fsPath);

        this._emitter.fire();

        this.onUpdate(uri);
    }

    onUpdate(uri: Uri) {
        const {item} = this.tree.get(dirname(uri.fsPath))!;
        this._emitter.fire(item);
    }

    getTreeItem(element: CollectionItem): TreeItem | Thenable<TreeItem> {
        return element;
    }

    async getChildren(element?: CollectionItem): Promise<CollectionItem[]> {
        let dir: Uri = this.requestsDir;

        if (element) {
            dir = element.type === FileType.Directory
                ? element.resourceUri!
                : Uri.file(dirname(element.resourceUri!.fsPath));
        } else {
            this.tree.clear();
        }
    
        const res = await workspace.fs.readDirectory(dir);
        const items = res.map(([filename, type]) => {
            const uri = Uri.joinPath(dir, filename);
            const item = new CollectionItem(uri, type);

            this.tree.set(uri.fsPath, {
                item,
                children: []
            });

            return item;
        });

        if (dir !== this.requestsDir) {
            this.tree.get(dir.fsPath)!.children = items.map(item => item.resourceUri!.fsPath);
        }

        return items;
    }
}