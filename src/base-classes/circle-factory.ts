import HalfCircle from "../circle-type/half-circle";
import PlainCircle from "../circle-type/plain-circle";
import SimpleCircle from "../circle-type/simple-circle";
import {BaseCircle} from "./base-circle";

export class CircleFactory {
    private circleClass: BaseCircle;

    public create(type: string): BaseCircle {
        switch (type.toLowerCase()) {
            case "half":
                this.circleClass = new HalfCircle();
                break;
            case "plain":
                this.circleClass = new PlainCircle();
                break;
            case "simple":
                this.circleClass = new SimpleCircle();
                break;
            default:
                this.circleClass = new SimpleCircle();
        }

        return this.circleClass;
    }
}
