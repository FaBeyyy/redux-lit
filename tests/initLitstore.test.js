import { initLitStore } from "../src/initLitStore";

describe('init lit store should', () => {
    it('should window set litStore and return store', () => {
        const store = {attribute: test};
        const storeReturnVal = initLitStore(store);
        expect(store).toEqual(storeReturnVal);
        expect(window.litStore).toEqual(store);
    });
});