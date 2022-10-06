import {Input} from 'antd';
import React, {ChangeEvent} from 'react';

export function RssField(props: {onSelect: (url: string)=>void}): JSX.Element {
    const {onSelect} = props;
    const onChange = (evt: ChangeEvent)=>{
        if(!evt.target) return;
        const val = (evt.target as HTMLInputElement).value;
        onSelect(val);
    };
    return (<Input allowClear style={{width: '100%', margin: '10px', marginBottom: 0}} placeholder="RSS-feed" onChange={onChange} />);
}
