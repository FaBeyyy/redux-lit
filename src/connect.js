import { isClassOrFunction } from "./utils";

export const connect = (mapStateToProps) => (ClassName, componentName) => {

    const store = window.litStore;
    const state = window.litStore.getState();
    const props = mapStateToProps(state);

    const propKeys = Object.keys(props);

    if (!isClassOrFunction(ClassName)) throw new Error(`${ClassName.name} has to be a function or class`);

    propKeys.forEach(key => {
        ClassName.createProperty(key);
    });

    
    let userDefinedFirstUpdated = ClassName.prototype.firstUpdated;

    ClassName.prototype.firstUpdated = function(updatedProperties) {
        propKeys.forEach(key => {
            this[key] = props[key];
            const updatedProps = mapStateToProps(window.litStore.getState());
            if (this[key] !== updatedProps[key]) this[key] = updatedProps[key];
            store.subscribe(() => {
                const updatedProps = mapStateToProps(store.getState());

                if (this[key] !== updatedProps[key]) {
                    if (typeof updatedProps[key] === 'object') {
                        this[key] = {...updatedProps[key]};
                    }
                    
                } else {
                    this[key] = updatedProps[key];
                }
            })
        });

        userDefinedFirstUpdated = userDefinedFirstUpdated.bind(this);
        userDefinedFirstUpdated(updatedProperties);
    }

    ClassName.prototype.dispatch = function(passThrough) {
        return store.dispatch(passThrough);
    }

    if (componentName) customElements.define(componentName, ClassName); 

    return ClassName;
}



