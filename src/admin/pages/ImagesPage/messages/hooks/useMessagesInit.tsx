import React, {useEffect} from 'react';
import {render} from 'react-dom';

import {ImagesBox} from '../components/ImagesBox';


const createMessagesContainer = () => {
    const messagesContainer = document.createElement('div');

    document.body.appendChild(messagesContainer);

    return messagesContainer;
};


let areMessagesRendered = false;

export const useMessagesInit = (): void => {
    useEffect(() => {
        if (!areMessagesRendered) {
            const container = createMessagesContainer();
            render(<ImagesBox />, container);

            areMessagesRendered = true;
        }
    }, []);
};
