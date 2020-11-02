
export type Message = {
    id: number;
    text: string;
}

export class MessagesStore {
    private _updateState: () => void | undefined;
    private _messages: Message[] = [];
    private _id = 0;

    get messages(): Message[] {
        return this._messages;
    }

    setStateUpdater(updater: () => void): void {
        this._updateState = updater;
    }

    addMessage(image: string): void {
        this._messages.push({text: image, id: this.getUniqueId()});
        this._updateState();
    }

    removeMessage(id: number): void {
        this._messages = this._messages.filter(message => message.id !== id);
        this._updateState();
    }

    private getUniqueId() {
        return this._id++;
    }
}


export const imagesMessages = new MessagesStore();
