import React from 'react';
import { Button, Popup } from 'semantic-ui-react';

const MyPopupExample = () => (
    <Popup
        content="Add users to your feed"
        triggreer={
            <Button
                icon="add"
                onClick={() => {
                    return alert('Test');
                }}
            />
        }
    />
);

export default MyPopupExample;
