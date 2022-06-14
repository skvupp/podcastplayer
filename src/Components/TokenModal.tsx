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

    return <Modal visible={visible} footer={false} closeIcon={false} closable={false} width={700}>
        <h2>This is a protected episode</h2>
        <p>A protected episode needs an authorization token to be played.
        </p>
        <Form name="nest-messages" onFinish={onFinish} >
            <Form.Item required label="Paste authorization code here" name="token">
                <Input.TextArea />
            </Form.Item>
            <p>
                <a href={link} target="_blank" rel="noreferrer">Get token to open episode</a><br/>
            </p>
            <Form.Item>
                <Button style={{marginRight: '20px'}} onClick={onClose}>Close</Button>
                <Button type="primary" htmlType="submit">
                    Open
                </Button>
            </Form.Item>
        </Form>
    </Modal>;
}
