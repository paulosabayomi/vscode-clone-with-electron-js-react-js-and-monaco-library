export interface IFolderStructure {
    name: string;
    root: string;
    tree: TFolderTree[]
}

export type TFolderTree = {
    name: string;
    parentPath: string;
    path: string;
    // children?: TFolderTree[];
    is_dir: boolean;
}

export interface IMainState {
    folder_structure: IFolderStructure;
    active_files: TActiveFile[];
    active_file: TActiveFile;
    indent: TIndent;
}

export type TActiveFile = {
    path: string;
    name: string;
    icon: any;
    is_touched: boolean;
}

export type TIndent = {
    line: number;
    column: number;
}

export type TSelectedFile = {
    name: string;
    path: string;
    content: string;
}

export interface IMainContext {
    handle_set_editor: Function;
    handle_remove_editor: Function;
}