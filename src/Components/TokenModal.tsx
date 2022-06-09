import {Button, Form, Input, Modal} from 'antd';
import React from 'react';
import {Episode} from '../types/Episode';

interface Props {
    visible: boolean;
    item?: Episode;
    onSuccess: (item: Episode)=>void;
    onFail: ()=>void;
}

export function TokenModal(props: Props): JSX.Element {
    const { visible, item, onSuccess } = props;
    if(!item) return <></>;

    const { link } = item;

    const onFinish = (sub: { token: string}) => {
        const { token } = sub;
        localStorage.setItem(link, token);
        onSuccess(item);
    };

    return <Modal visible={visible} onOk={console.log}>
        <Form name="nest-messages" onFinish={onFinish}>
            <Form.Item required label="Lim inn kode" name="token">
                <Input.TextArea />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        <a href={link} target="">Get code to open episode</a>
    </Modal>;
}
