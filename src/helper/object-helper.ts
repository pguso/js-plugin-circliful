import {IDictionary} from "../interface/idictionary";

export default class ObjectHelper {
    public static extractPropertyFromObject(object: IDictionary, property: string) {
        let value: string | object | number | boolean | [];
        if (object.hasOwnProperty(property) && object[property]) {
            value = object[property];
        }

        return value;
    }
}
