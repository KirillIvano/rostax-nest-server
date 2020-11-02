import React, {useRef} from 'react';
import styled from 'styled-components';
import {Copy16, CloseOutline16} from '@carbon/icons-react';


const Message = styled.div`
    padding: 8px;
    margin-top: 8px;
    margin-bottom: 8px;

    display: flex;
    align-items: center;

    font-size: 14px;
`;

const Copy = styled(Copy16)`
    margin-left: 12px;
    cursor: pointer;
`;

const Close = styled(CloseOutline16)`
    margin-left: 12px;
    cursor: pointer;
`;

type ImageMessageProps = {
    children: string;

    removeMessage: () => void;
}

export const ImageMessage: React.FC<ImageMessageProps> = ({
    children,
    removeMessage,
}) => {
    const textRef = useRef<HTMLSpanElement>(null);

    const handleCopy = () => {
        if (textRef.current) {
            const rng = document.createRange();
            rng.selectNode(textRef.current);

            const selection = window.getSelection();

            if (selection) {
                selection.removeAllRanges();
                selection.addRange(rng);
            }
        }
    };

    return (
        <Message >
            <span ref={textRef}>{children}</span>
            <Copy onClick={handleCopy} />
            <Close onClick={removeMessage} />
        </Message>
    );
};
