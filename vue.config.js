//
// const OPEN = process.env.OPEN && Boolean(process.env.OPEN);
const path = require("path")
// function resolve (dir) {
//     return path.join(__dirname, dir)
// }
module.exports={
    // outputDir:"Ooyo",
    // lintOnSave:"error",
    // devServer:{
    //     port:8000,
    //     open:OPEN|| false,
    //     host:"127.0.0.1"
    // },
    configureWebpack:{
        resolve: {
            alias: {
                "components":path.resolve(__dirname,'src/components'),
                "http":path.resolve(__dirname,'src/http'),
                "pages":path.resolve(__dirname,'src/pages'),
                "router":path.resolve(__dirname,'src/router'),
                "routes":path.resolve(__dirname,'src/routes'),
                "store":path.resolve(__dirname,'src/store'),
            }
        }
    }
}