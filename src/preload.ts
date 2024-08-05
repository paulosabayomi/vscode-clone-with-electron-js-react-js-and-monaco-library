// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer, contextBridge } from "electron";
import { path_join } from "./shared/functions";
import { store } from "./shared/store";
import { set_folder_structure } from "./shared/rdx-slice";

ipcRenderer.on('command-create-file', (event, data) => {
    const new_file_item = document.createElement('div');
    new_file_item.className = "content-item new-file-item"
    new_file_item.innerHTML = `
        <div>
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#d2d4d3"> <path d="M1.75 3a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H1.75zM1.75 6a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5zM1 9.75A.75.75 0 011.75 9h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 9.75zM1.75 12a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5z"></path> </g> </g></svg>
        </div>
        <div class="file-name" contenteditable="true"></div>
    `;
    setTimeout(() => {
        (new_file_item.querySelector('.file-name') as HTMLElement).focus();        
    }, 0);
    (new_file_item.querySelector('.file-name') as HTMLElement).onkeyup = (e) => {
        try {
            if (e.key.toLowerCase() == 'enter') {
                const targetEditableEl = e.currentTarget as HTMLElement
                const value = targetEditableEl.innerText
                console.log("value", value);
                
                if (value != '') {
                    renderer.create_file({
                        path: path_join([data.path, value]),
                        fileName: value.trim(),
                        rootPath:  data.rootPath
                    })
                }
                new_file_item?.remove()
            }
            
        } catch (error) {
            
        }
    }
    (new_file_item.querySelector('.file-name') as HTMLElement).onblur = (e) => {
        const targetEditableEl = e.currentTarget as HTMLElement
        const value = targetEditableEl.innerText
        console.log("value", value);
        
        if (value != '') {
            renderer.create_file({
                path: path_join([data.path, value]),
                fileName: value,
                rootPath:  data.rootPath
            })
        }
        new_file_item.remove()
    }

    const targetEl = document.querySelector(`#list-wrapper-${data.path.replace(/\/|\\|\./g, '-')}`).querySelector('.content-list');
    targetEl.prepend(new_file_item);
})

ipcRenderer.on('command-update-folder-structure', (event, data) => {
    console.log("new strucutre response data", data);    
})

ipcRenderer.on('new-folder-opened', (event, data) => {
    console.log("new folder opened",);    
    window.location.reload()
})

const renderer = {
    openFolder: async () => {
        const folder = await ipcRenderer.invoke('open-folder')
        console.log("folder", folder);   
        return folder     
    },
    get_folder: async () => {
        const folder = await ipcRenderer.invoke('get-folder')
        console.log("folder", folder);   
        return folder     
    },
    clear_folder: () => {
        /** Added after the tutorial for clearing the folder, for testing */
        ipcRenderer.send('clear-folder')
    },
    get_file_content: async (path: string) => {
        const file_content = await ipcRenderer.invoke('get-file-content', path)
        console.log("file_content", file_content);   
        return file_content     
    },
    save_file: (data:{path: string, content: string}) => {
        ipcRenderer.send('save-file', data)
    },
    show_contextmenu: (data: {path: string, type: 'folder' | 'file', rootPath: string}) => {
        const response = ipcRenderer.send('folder-contextmenu', data)
        console.log("response");
    },
    create_file: (data: {path: string, fileName: string, rootPath: string}) => {
        ipcRenderer.send('create-file', data)
    },
}

contextBridge.exposeInMainWorld('electron', renderer);

export type ERenderer = typeof renderer
