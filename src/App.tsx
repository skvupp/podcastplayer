import React from 'react';
import './App.css';
import { Select } from 'antd';
import getChannels from './api';

const { Option } = Select;

export default function App(): React.ReactElement {
    getChannels('hei');
    return (
        <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            filterOption={(input, option) => {
                if (!option) return false;
                const children: string = option.children as unknown as string;
                if (typeof option.children !== 'string') return false;
                return (children as string).toLowerCase().indexOf(input.toLowerCase()) >= 0;
            }}
        >
            <Option>Jack</Option>
        </Select>

    );
}
