export function initLitStore(store) {
    if (!window.litStore) window.litStore = store;
    return window.litStore;
}
