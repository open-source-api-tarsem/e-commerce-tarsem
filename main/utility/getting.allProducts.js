const vendorDashboard = require("./../model/vendor.product.revenue.dashboard/vendor.product.revenue.dashboard.model")

class gettingAllProducts{
    async getAllProducts(){
        const vendorProducts = await vendorDashboard.find()
        const allProducts = []
        vendorProducts.forEach(el=>{
            allProducts.push([el.product, el._id])
        })
        const allDistinguishProductArray = []
        allProducts.forEach(el=>{
            allDistinguishProductArray.push(...[...el[0]])
        })
        
        return allDistinguishProductArray
    }
}

const gettingAllProductsfromVendors = new gettingAllProducts()

module.exports = gettingAllProductsfromVendors