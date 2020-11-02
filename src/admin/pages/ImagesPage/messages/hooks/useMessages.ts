import {imagesMessages, Message} from '../store';


export interface ImagesMessagesInterface {
    addMessage: (message: string) => void;
    removeMessage: (messageId: number) => void;
    setStateUpdater: (updater: () => void) => void;
    messages: Message[];
}

export const useMessages = (): ImagesMessagesInterface => imagesMessages;
