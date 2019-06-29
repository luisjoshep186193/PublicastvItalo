export interface Elemento {
    name?: string;
    duration?: number;
    dateCreated?: Date;
    dateModified?: Date;
    title?: string;
    description?: string;
    type?: string;
    url?: string;
    email?: string;
    psw?: string;
    tokn?: string;
    elements?: ElementId[];
}

export interface ElementId extends Elemento { id: string; }
