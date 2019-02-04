import { isClassOrFunction } from "../src/utils";

describe('util functions should', () => {
    it('should check if class or function', () => {
        expect(isClassOrFunction('string')).toBe(false);          //string
        expect(isClassOrFunction(123)).toBe(false);               //number
        expect(isClassOrFunction({})).toBe(false);                //object
        expect(isClassOrFunction(function(){})).toBe(true);       //function
        expect(isClassOrFunction(class TestClass {})).toBe(true); //class
        expect(isClassOrFunction(null)).toBe(false);              //null
        expect(isClassOrFunction(undefined)).toBe(false);         //undefined
        expect(isClassOrFunction(NaN)).toBe(false);               //NaN
    })
});