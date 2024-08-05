import React from "react";
import {ReactComponent as ArrowLeftIcon} from '../../assets/svg/arrow-left.svg'
import {ReactComponent as ArrowRightIcon} from '../../assets/svg/arrow-right.svg'
import {ReactComponent as SearchIcon} from '../../assets/svg/search.svg'
import {ReactComponent as PanelBlockIcon} from '../../assets/svg/panel-block.svg'
import {ReactComponent as PanelLeftIcon} from '../../assets/svg/panel-left.svg'
import {ReactComponent as PanelRightIcon} from '../../assets/svg/panel-right-off.svg'
import {ReactComponent as PanelSplitIcon} from '../../assets/svg/panel-off.svg'
import { useAppSelector } from "../../shared/hooks";

const HeaderSection = React.memo((props: any) => {
    const folder_structure = useAppSelector(state => state.main.folder_structure);

    return (
        <div className="header-section">
            <div className="header-main">
                <div>
                    <ArrowLeftIcon />
                    <ArrowRightIcon />
                </div>
                <div className="text-container">
                    <SearchIcon />
                    <span>{folder_structure?.name?.split(/\/|\\/).at(-1)}</span>
                </div>
            </div>
            <div className="icons-container">
                <PanelLeftIcon />
                <PanelSplitIcon />
                <PanelRightIcon />
                <PanelBlockIcon />
            </div>
        </div>
    )
})

export default HeaderSection