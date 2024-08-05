import React from "react";
import {ReactComponent as RemoteIcon} from '../../assets/svg/remote.svg'
import {ReactComponent as SourceIcon} from '../../assets/svg/source.svg'
import {ReactComponent as CloudUploadIcon} from '../../assets/svg/cloud-upload.svg'
import {ReactComponent as RadioTowerIcon} from '../../assets/svg/radio-tower.svg'
import {ReactComponent as BellDotIcon} from '../../assets/svg/bell-dot.svg'
import {ReactComponent as CheckAllIcon} from '../../assets/svg/check-all.svg'
import {ReactComponent as BracketErrorIcon} from '../../assets/svg/bracket-error.svg'
import { useAppSelector } from "../../shared/hooks";
import { get_file_types } from "../../shared/functions";

const FooterComponent = React.memo((props: any) => {
    const editor_indent = useAppSelector(state => state.main.indent);
    const active_file = useAppSelector(state => state.main.active_file)

    return (
        <div className="footer-section">
            <div>
                <div className="remove-item">
                    <RemoteIcon />
                </div>
                <div className="">
                    <span className="bigger-icon" style={{marginRight: 5}}>
                        <SourceIcon />
                    </span>
                    <span>main</span>
                    <span className="bigger-icon" style={{marginLeft: 5}}>
                        <CloudUploadIcon />
                    </span>
                </div>
                <div className="">
                    <span className="bigger-icon" style={{marginRight: 5}}>
                        <RadioTowerIcon />
                    </span>
                    <div>0</div>
                </div>
            </div>
            <div>
                <div className="">
                    <div>Ln {editor_indent.line}, Col {editor_indent.column}</div>
                </div>
                <div className="">
                    <div>Spaces: 4</div>
                </div>
                <div className="">
                    <div>UTF-8</div>
                </div>
                <div className="">
                    <div>LF</div>
                </div>
                <div className="">
                    <span className="bigger-icon" style={{marginRight: 5}}>
                        <BracketErrorIcon />
                    </span>
                    <div style={{textTransform: 'capitalize'}}>{active_file == undefined ? '' : get_file_types(active_file.name)}</div>
                </div>
                <div className="">
                    <span className="bigger-icon" style={{marginRight: 5}}>
                        <CheckAllIcon />
                    </span>
                    <div>Prettier</div>
                </div>
                <div className="">
                    <span className="bigger-icon" style={{marginRight: 5}}>
                        <BellDotIcon />
                    </span>
                </div>
            </div>
        </div>
    )
})

export default FooterComponent