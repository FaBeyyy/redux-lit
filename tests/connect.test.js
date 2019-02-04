describe('connect should', () => {
    it('')
});


export const connect = (mapStateToProps) => (ClassName, componentName) => {
    const store = window.litStore;
    const state = window.litStore.getState();
    const props = mapStateToProps(state);

    const propKeys = Object.keys(props);

    if (!isClassOrFunction(ClassName)) throw new Error(`${ClassName.name} has to be a function or class`);

    propKeys.forEach(key => {
        ClassName.createProperty(key);
    });

    const userDefinedFirstUpdated = ClassName.prototype.firstUpdated;

    ClassName.prototype.firstUpdated = function(updatedProperties) {
        propKeys.forEach(key => {
            this[key] = props[key];
            store.subscribe(() => {
                if (this[key] !== store.getState()[key]) this[key] = store.getState()[key];
            })
        });
        userDefinedFirstUpdated(updatedProperties);
    }

    ClassName.prototype.dispatch = function(passThrough) {
        return store.dispatch(passThrough);
    }

    if (componentName) customElements.define(componentName, ClassName); 

    return ClassName;
}
