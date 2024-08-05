import {ReactComponent as GitFileIcon} from '../assets/svg/git.svg'
import {ReactComponent as HTMLFileIcon} from '../assets/svg/html.svg'
import {ReactComponent as CSSFileIcon} from '../assets/svg/css.svg'
import {ReactComponent as JSFileIcon} from '../assets/svg/javascript.svg'
import {ReactComponent as JSONFileIcon} from '../assets/svg/json.svg'
import {ReactComponent as MarkdownFileIcon} from '../assets/svg/markdown.svg'
import {ReactComponent as TSFileIcon} from '../assets/svg/ts-1.svg'
import {ReactComponent as TTFFileIcon} from '../assets/svg/ttf.svg'
import {ReactComponent as SVGFileIcon} from '../assets/svg/svg.svg'
import {ReactComponent as UnknownFileIcon} from '../assets/svg/unknown.svg'

const FileIcon = ({type}:{type: string}) => {
    const typeIcon = {
        gitignore: <GitFileIcon />,
        html: <HTMLFileIcon />,
        css: <CSSFileIcon />,
        js: <JSFileIcon />,
        jsx: <JSFileIcon />,
        json: <JSONFileIcon />,
        md: <MarkdownFileIcon />,
        ts: <TSFileIcon />,
        tsx: <TSFileIcon />,
        ttf: <TTFFileIcon />,
        svg: <SVGFileIcon />,
        unknown: <UnknownFileIcon />,
    }

    return typeIcon[type as keyof typeof typeIcon] || typeIcon['unknown']
}

export default FileIcon