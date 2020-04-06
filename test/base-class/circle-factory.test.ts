import {CircleFactory} from "../../src/base-class/circle-factory";
import HalfCircle from "../../src/circle-type/half-circle";
import PlainCircle from "../../src/circle-type/plain-circle";
import SimpleCircle from "../../src/circle-type/simple-circle";

describe("CircleFactory", () => {
    describe("create()", () => {
        test("half", () => {
            const result = CircleFactory.create("half");

            expect(result).toBeInstanceOf(HalfCircle);
        });

        test("plain", () => {
            const result = CircleFactory.create("plain");

            expect(result).toBeInstanceOf(PlainCircle);
        });

        test("simple", () => {
            const result = CircleFactory.create("simple");

            expect(result).toBeInstanceOf(SimpleCircle);
        });
    });
});
