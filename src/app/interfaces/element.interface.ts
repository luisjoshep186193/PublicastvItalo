export interface Elemento {
    name?: string;
    duration?: number;
    dateCreated?: Date;
    dateModified?: Date;
    title?: string;
    description?: string;
    type?: string;
    url?: string;
}

export interface ElementId extends Elemento { id: string; }
