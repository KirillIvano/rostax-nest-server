import React, {useEffect, useState, useCallback} from 'react';
import {useNotice, DropZone, Box} from 'admin-bro';
import styled from 'styled-components';

import {useMessages} from './messages/hooks/useMessages';
import {useMessagesInit} from './messages/hooks/useMessagesInit';


const ImageInput = styled(DropZone)`
    max-width: 400px;
    margin: 16px;
`;

const getFormData = (file: File) => {
    const formData = new FormData();

    formData.set('file', file);

    return formData;
};

const useFileUploadRequest = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');

    const request = useCallback((file: File) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/files');

        xhr.send(getFormData(file));
        setLoading(true);

        xhr.addEventListener('load', () => {
            if (xhr.status >= 300) {
                setError('Не удалось загрузить картинку');
                return;
            }

            try {
                setImageUrl(JSON.parse(xhr.response).fileName);
            } catch {
                setError('Некорректный ответ сервера');
            }

            setLoading(false);
        });
    }, []);

    return {
        request,
        loading,
        error,
        imageUrl,
    };
};

export default (): React.ReactNode => {
    const {request, loading, imageUrl, error} = useFileUploadRequest();
    const sendNotice = useNotice();
    const imagesMessages = useMessages();

    useMessagesInit();

    useEffect(() => {
        error && sendNotice({message: error, type: 'error'});
    }, [error]);

    useEffect(
        () => {
            if (!loading && imageUrl) {
                imagesMessages.addMessage(imageUrl);
                sendNotice({message: `Успешно загружена картинка ${imageUrl}`});
            }
        },
        [imageUrl, loading],
    );

    return (
        <Box>
            <ImageInput onChange={([file]) => file && request(file)}></ImageInput>
        </Box>
    );
};
