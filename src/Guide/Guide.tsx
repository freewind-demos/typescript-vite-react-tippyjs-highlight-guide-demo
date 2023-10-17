import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';

import React, {FC, useEffect, useMemo, useState} from 'react';
import {Step} from './typings';
import {Button, Space, Typography} from "antd";
import {useMemoizedFn, usePrevious} from "ahooks";
import {css} from "@emotion/css";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";

interface Props {
    run: boolean;
    steps: Step[];
    onClose: () => void;
}

const HIGHLIGHT = css`
  outline: 3px dashed indianred;
  outline-offset: 5px;
  border-radius: 5px;
  position: relative;
`
export const Guide: FC<Props> = ({
                                     run,
                                     steps,
                                     onClose: _onClose
                                 }) => {
    const onClose = useMemoizedFn(_onClose);
    const [index, setIndex] = useState<number>()
    const [collapse, setCollapse] = useState(false);
    const step = useMemo(() => index === undefined ? undefined : steps[index], [index, steps])
    const isLastStep = index === steps.length - 1;

    const preStep = usePrevious(step);

    useEffect(() => {
        if (run) {
            setIndex(0)
        } else {
            setIndex(undefined);
        }
    }, [run]);

    useEffect(() => {
        preStep?.element.classList.remove(HIGHLIGHT);
        step?.element.classList.add(HIGHLIGHT);
        if (preStep !== undefined && step === undefined) {
            onClose();
        }
    }, [step, preStep])

    return step
        ? <Tippy interactive
                 theme={'light-border'}
                 appendTo={document.body}
                 offset={[0, 18]}
                 reference={step.element}
                 visible
                 content={collapse
                     ? <Button type='text' size={'small'} icon={<PlusOutlined rev/>} title={"expand"}
                               onClick={() => setCollapse(false)}/>
                     : <Space direction={"vertical"} style={{width: '100%'}}>
                         <Space style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                             <Typography.Text>{step.description}</Typography.Text>
                             <Button size={'small'} icon={<MinusOutlined rev/>} title={"collapse"}
                                     onClick={() => setCollapse(true)}/>
                         </Space>
                         <Space style={{display: 'flex', justifyContent: 'space-between'}}>
                             <Button size={'small'} onClick={() => setIndex(undefined)}
                             >Exit</Button>
                             <Space>
                                 <Button type={'text'} size={'small'}
                                         onClick={() => setIndex(n => n === undefined ? undefined : Math.max(0, n - 1))}
                                 >Back</Button>
                                 <Button type={'primary'} size={'small'}
                                         onClick={() => {
                                             if (isLastStep) {
                                                 setIndex(undefined);
                                             } else {
                                                 setIndex(n => n === undefined ? undefined : n + 1)
                                             }
                                         }}>{isLastStep ? 'Done' : `Next (${(index ?? 0) + 1}/${steps.length})`}</Button>
                             </Space>
                         </Space>
                     </Space>}
        />
        : null;
};
