import { ERenderer } from "./preload";

declare global {
    interface Window {
        electron: ERenderer;
        set_folder_data: Function;
    }
    
    declare module '*.svg' {
        import React from 'react';
        import { SVGProps } from 'react';
        export const ReactComponent: React.FunctionComponent<SVGProps<SVGSVGElement>>;
    }
}