import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';

import {useMessages} from '../../hooks/useMessages';

import {ImageMessage} from './../ImageMessage';


const useForceUpdate = () => {
    const [, update] = useState(0);
    const forceUpdate = useCallback(() => update(s => ++s), []);

    return forceUpdate;
};

const useMessagesStoreWithUpdates = () => {
    const update = useForceUpdate();
    const imagesMessages = useMessages();

    useEffect(() => {
        imagesMessages.setStateUpdater(update);
    }, [update]);

    return imagesMessages;
};


const ImagesBoxWrapper = styled.div`
    position: fixed;
    right: 12px;
    bottom: 12px;
    
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    
    height: 0px;

    background: #eee;
`;

export const ImagesBox: React.FC = () => {
    const imagesMessages = useMessagesStoreWithUpdates();

    return (
        <ImagesBoxWrapper>
            {imagesMessages.messages.map(
                image => (
                    <ImageMessage
                        removeMessage={() => imagesMessages.removeMessage(image.id)}
                        key={image.id}
                    >
                        {image.text}
                    </ImageMessage>
                ),
            )}
        </ImagesBoxWrapper>
    );
};
