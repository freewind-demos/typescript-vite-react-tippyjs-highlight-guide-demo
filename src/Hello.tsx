import React, {FC, useState} from 'react';
import './Hello.pcss';
import {Guide} from "./Guide";

type Props = {};

function get(selector: string): HTMLElement {
    return document.querySelector<HTMLElement>(selector)!;
}

export const Hello: FC<Props> = ({}) => {

    const [run, setRun] = useState(true);
    return <>
        <button onClick={() => setRun(true)}>Guide</button>
        <Guide run={run} onClose={() => setRun(false)} steps={[
            {element: get('#button1'), description: 'sdl ksdf kdsj fdskfsdkfsdfdsf lks dfsdfsdl ksdf kdsj fdskfsdkfsdfdsf lks dfsdfsdl ksdf kdsj fdskfsdkfsdfdsf lks dfsdfsdl ksdf kdsj fdskfsdkfsdfdsf lks dfsdfsdl ksdf kdsj fdskfsdkfsdfdsf lks dfsdf'},
            {element: get('#button2'), description: 'sdl ksdf kdsj fdskfsdkfsdfdsf lks dfsdf'},
            {element: get('#p1'), description: 'sdl ksdf kdsj fdskfsdkfsdfdsf lks dfsdf'},
            {element: get('#p2'), description: 'sdl ksdf kdsj fdskfsdkfsdfdsf lks dfsdf'},
            {element: get('#input1'), description: 'sdl ksdf kdsj fdskfsdkfsdfdsf lks dfsdf'},
            {element: get('#textarea1'), description: 'sdl ksdf kdsj fdskfsdkfsdfdsf lks dfsdf'},
        ]}/>
    </>;
}
