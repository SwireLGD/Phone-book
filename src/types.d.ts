export interface ContactFormProp {
    onClose: () => void;
}

export interface Contact {
    id: string;
    name: string;
    phone: string;
    email: string;
    photo: string;
}

export interface closeProps extends Contact {
    onClose: () => void;
}
