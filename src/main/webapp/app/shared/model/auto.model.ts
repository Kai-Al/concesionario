
import { IMarca } from './marca.model';

export interface IAuto {
    id?: number;
    Modelo?: string;
    Foto?: any;
    Precio?: number;
    Descripcion?: string;
    marca?: IMarca;
}

export const defaultValue:  Readonly<IAuto> = {

};
