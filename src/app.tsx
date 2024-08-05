import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import router from "./shared/router";
import { useAppDispatch } from "./shared/hooks";
import { IFolderStructure } from "./shared/types";
import { set_folder_structure } from "./shared/rdx-slice";
import { ipcRenderer } from "electron";
  

const App = React.memo((props: any) => {
    const dispatch = useAppDispatch()

    const get_folder = React.useCallback(async () => {
        const folder = await window.electron.get_folder() as IFolderStructure;
        folder != undefined && dispatch(set_folder_structure(folder))
    }, [])

    React.useLayoutEffect(() => {
        get_folder();
        console.log("hello there can you see this?")
        console.log("hello world I am sending a greeting")
        console.log("you can see this right now?!")
        
    }, [])

    return (
        <RouterProvider router={router} />
    )
})

export default App