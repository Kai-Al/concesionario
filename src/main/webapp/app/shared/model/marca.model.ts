
import { IAuto } from './auto.model';

export interface IMarca {
    id?: number;
    Nombre?: string;
    Pais?: string;
    autos?: IAuto[];
}

export const defaultValue:  Readonly<IMarca> = {

};
