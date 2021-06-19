class MapExtended extends Map {
    constructor(){
        super()
    }

    /**
     * 
     * @returns {Array<object>}
     */
    array(){
        let arr = [];
        for (const [key, value] of this.entries()){
            let obj = {};
            obj[key] = value;
            arr.push(obj);
        }
        let result = [...arr];

        return result;
    }
}

module.exports = MapExtended;