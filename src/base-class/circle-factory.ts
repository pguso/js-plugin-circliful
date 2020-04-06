import HalfCircle from "../circle-type/half-circle";
import PlainCircle from "../circle-type/plain-circle";
import SimpleCircle from "../circle-type/simple-circle";
import {BaseCircle} from "./base-circle";

export class CircleFactory {
    public static create(type: string): BaseCircle {
        let circleClass: BaseCircle;
        switch (type.toLowerCase()) {
            case "half":
                circleClass = new HalfCircle();
                break;
            case "plain":
                circleClass = new PlainCircle();
                break;
            case "simple":
                circleClass = new SimpleCircle();
                break;
            default:
                circleClass = new SimpleCircle();
        }

        return circleClass;
    }
}
