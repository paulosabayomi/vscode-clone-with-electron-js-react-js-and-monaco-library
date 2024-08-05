import { IMainContext, TFolderTree } from "./types";
import {renderToStaticMarkup} from 'react-dom/server'
import FileIcon from "./file-icon";
import React from "react";
import { store } from "./store";

export const MainContext = React.createContext({} as IMainContext)

export const get_file_types = (file_name: string) => {
    const fileTypes = {
        '.gitignore': 'ignore',
        '.js': 'javascript',
        '.jsx': 'javascript',
        '.ts': 'typescript',
        '.tsx': 'typescript',
        '.json': 'json',
        '.html': 'html',
        '.css': 'css',
        '.scss': 'scss',
        '.less': 'less',
        '.py': 'python',
        '.java': 'java',
        '.cpp': 'cpp',
        '.c': 'c',
        '.cs': 'csharp',
        '.go': 'go',
        '.php': 'php',
        '.rb': 'ruby',
        '.swift': 'swift',
        '.kotlin': 'kotlin',
        '.dart': 'dart',
        '.xml': 'xml',
        '.yaml': 'yaml',
        '.yml': 'yaml',
        '.md': 'markdown',
    };
    return fileTypes[Object.keys(fileTypes).filter(type => (new RegExp(`${type}$`)).test(file_name))[0] as keyof typeof fileTypes]
} 

const organize_folder = (branch: TFolderTree[]) => {
    return branch.sort((a,b) => {
        if (a.is_dir !== b.is_dir) {
            // @ts-ignore
            return b.is_dir - a.is_dir
        }
        return a.name.localeCompare(b.name)
    })
}

export const path_join = (args: string[]) => {
    const os = /linux|macintosh|windows/i.exec(window.navigator.userAgent)[0].toLowerCase()
    console.log("os");
    return os == 'windows' ? args.join('\\') : args.join('/')   
}

export const makeContentList = (targetEl: HTMLElement, branch: TFolderTree[],tree: TFolderTree[], handle_set_editor: Function) => {
    console.log("was here 0000");
    
    if (branch == undefined) return;    
    const sorted_tree = organize_folder(branch)
    // const sorted_tree = branch
    sorted_tree.map(branch => {
        if (branch.is_dir) {
            const wrapper_cont = document.createElement('div');
            wrapper_cont.className = "content-list-wrapper ";
            wrapper_cont.id = "list-wrapper-" + (path_join([branch.parentPath, branch.name])).replace(/\/|\\|\./g, '-');

            // const new_file_item = document.createElement('div');
            // new_file_item.className = "content-item new-file-item"
            // new_file_item.innerHTML = `
            //     <div>
            //         <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#d2d4d3"> <path d="M1.75 3a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H1.75zM1.75 6a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5zM1 9.75A.75.75 0 011.75 9h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 9.75zM1.75 12a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5z"></path> </g> </g></svg>
            //     </div>
            //     <div class="file-name" contenteditable="true"></div>
            // `;

            const content_item = document.createElement('div')
            content_item.className = "content-item"
            content_item.innerHTML = `
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M10.072 8.024L5.715 3.667l.618-.62L11 7.716v.618L6.333 13l-.618-.619z" clip-rule="evenodd"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="m7.976 10.072l4.357-4.357l.62.618L8.284 11h-.618L3 6.333l.619-.618z" clip-rule="evenodd"/></svg>
                </div>
                <div class="file-name">${branch.name}</div>
            `
            const content_list = document.createElement('div')
            content_list.className = "content-list";
            // content_item.onauxclick = (e) => {window.electron.folderContext()}

            content_item.oncontextmenu = (e) => {window.electron.show_contextmenu({
                path: path_join([branch.parentPath, branch.name]),
                type: 'folder',
                rootPath: store.getState().main.folder_structure.root
            })}

            content_item.onclick = (e) => {
                if (content_list.classList.contains('shown')) {
                    content_item.classList.remove('shown')
                    content_list.classList.remove('shown')
                    content_list.style.display = 'none'
                    return content_list.innerHTML = ''
                }else{
                    content_list.classList.add('shown')
                    content_item.classList.add('shown')
                    content_list.style.display = 'block'
                }
                makeContentList(content_list, tree?.filter(cbranch => cbranch.parentPath == branch.path + '/' + branch.name), tree, handle_set_editor)
            };
            // wrapper_cont.appendChild(new_file_item);
            wrapper_cont.appendChild(content_item);
            wrapper_cont.appendChild(content_list);             
            targetEl.append(wrapper_cont);
        }else{
            const content_item = document.createElement('div');
            content_item.className = "content-item";
            content_item.onauxclick = (e) => {window.electron.show_contextmenu({
                path: branch.parentPath,
                type: 'file',
                rootPath: store.getState().main.folder_structure.root
            })}
            content_item.innerHTML = `
                <div>${renderToStaticMarkup(FileIcon({ type:branch.name.split('.').at(-1) }))}</div>
                <div class="file-name">${branch.name}</div>
            `
            content_item.onclick = (e) => handle_set_editor(branch.name, branch.parentPath + '/' + branch.name)
            targetEl.append(content_item);
        }
    })
}