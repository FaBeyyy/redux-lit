declare namespace ReduxLit {
    /**
    * @param mapStateToProps function that returns props that should be added to the component.
    */
    declare function connect(mapStateToProps: function) : (ClassName: class, componentName: string) => void;
    /**
     * @param store redux store object.
     */
    delcare function initLitStore(store: Object): Object;
}
export = ReduxLit;