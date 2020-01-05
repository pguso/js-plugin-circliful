import {IDictionary} from "../interfaces/idictionary";

export default class ObjectHelper {
    public static extractPropertyFromObject(object: IDictionary, property: string) {
        let value: string | number | object = "";
        if (object.hasOwnProperty(property) && object[property]) {
            value = object[property];
        }

        return value;
    }
}
