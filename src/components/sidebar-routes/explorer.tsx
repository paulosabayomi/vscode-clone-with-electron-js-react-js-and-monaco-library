import React from "react";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { MainContext, makeContentList } from "../../shared/functions";
import PerfectScrollbar from 'react-perfect-scrollbar'
import { update_active_file, update_active_files } from "../../shared/rdx-slice";
import { TActiveFile } from "../../shared/types";
import FileIcon from "../../shared/file-icon";
import { store } from "../../shared/store";
import {ReactComponent as AngleRightIcon} from '../../assets/svg/r-chevron.svg'
import {ReactComponent as AngleLeftIcon} from '../../assets/svg/d-chevron.svg'

const ExplorerRoute = React.memo((props: any) => {
    const folder_structure = useAppSelector(state => state.main.folder_structure);
    const content_main_div_ref = React.useRef<HTMLDivElement | undefined>(undefined);
    const dispatch = useAppDispatch();
    const active_files = useAppSelector(state => state.main.active_files)
    const useMainContextIn = React.useContext(MainContext)

    const handle_display_file_list = React.useCallback(() => {
        if (Object.keys(folder_structure).length == 0) return;
        const files = folder_structure.tree.filter(content => content.parentPath == folder_structure.root)
        makeContentList(content_main_div_ref.current, files, folder_structure.tree, handle_set_editor)
    }, [folder_structure,  content_main_div_ref.current])

    const handle_set_editor = React.useCallback(async (branch_name: string, full_path: string) => {
        console.log("branch", branch_name, full_path);
        const get_file_content = await window.electron.get_file_content(full_path)
        const active_file: TActiveFile = {
            icon: <FileIcon type={branch_name.split('.').at(-1)} />,
            path: full_path,
            name: branch_name,
            is_touched: false
        }

        const selected_file = {
            name: branch_name,
            path: full_path,
            content: get_file_content
        }

        if (store.getState().main.active_files.findIndex(file => file.path == full_path) == -1) {
            store.dispatch(update_active_files([...store.getState().main.active_files, active_file]))
        }

        dispatch(update_active_file(active_file))

        // dispatch(set_selected_file(selected_file))
        setTimeout(() => {
            useMainContextIn.handle_set_editor(selected_file)            
        }, 0);
        
    }, [active_files])

    React.useLayoutEffect(() => {
        handle_display_file_list()
    }, [folder_structure, content_main_div_ref.current])

    return (
        <div className="folder-tree">
            <div className="title">Explorer</div>
            {/** Added after the tutorial for clearing the folder, for testing */}
            {/* <button onClick={() => window.electron.clear_folder()}>Clear Directory</button> */}
            <div className="explorer-content-wrapper">
                <div className="content-list-outer-container">
                    <div>
                        <AngleLeftIcon />
                        <span>{folder_structure?.name?.split(/\/|\\/).at(-1)}</span>
                    </div>
                    <PerfectScrollbar className="scroller">
                        <div ref={content_main_div_ref} className="content-list main"></div>
                    </PerfectScrollbar>
                </div>
                <div>
                    <AngleRightIcon />
                    <span>Outline</span>
                </div>
                <div>
                    <AngleRightIcon />
                    <span>Timeline</span>
                </div>
            </div>
        </div>
    )
})

export default ExplorerRoute