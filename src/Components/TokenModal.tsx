import {Button, Form, Input, Modal} from 'antd';
import React from 'react';
import {Episode} from '../types/Episode';

interface Props {
    visible: boolean;
    item?: Episode;
    onSuccess: (item: Episode)=>void;
    onClose: ()=>void;
}

export function TokenModal(props: Props): JSX.Element {
    const { visible, item, onSuccess, onClose } = props;
    if(!item) return <></>;

    const { link } = item;

    const onFinish = (sub: { token: string}) => {
        const { token } = sub;
        localStorage.setItem(link, token);
        onSuccess(item);
    };

    return <Modal visible={visible} footer={false}>
        <Form name="nest-messages" onFinish={onFinish} >
            <Form.Item required label="Lim inn kode" name="token">
                <Input.TextArea />
            </Form.Item>
            <p><a href={link} target="_blank" rel="noreferrer">Get code to open episode</a></p>
            <Form.Item>
                <Button style={{marginRight: '20px'}} onClick={onClose}>Close</Button>
                <Button type="primary" htmlType="submit">
                    Open
                </Button>
            </Form.Item>
        </Form>
    </Modal>;
}
