class numericFilteration{
    constructor(arr, property, queryParameter){
        this.arr = arr
        this.property = property
        this.queryParameter = queryParameter
    }
    

    filterMax(){
        this.arr = this.arr.filter(el=>{
            const prop = this.property
            return `el.${prop}` <= Number(this.queryParameter) 
        })
        return this.arr
    }

    // filterMin(arr, property){
    //     arr = arr.filter(el=>{
    //         return el.priceForProduct <= Number(req.query.maxrange)
    //     })
    // }
}

module.exports = numericFilteration;