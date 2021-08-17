const { readdirSync } = require("fs");
const { join: joinPath } = require("path");

const setup = (api) => {
    
    const src = readdirSync(joinPath(__dirname), {
      withFileTypes: false,
    });
    let paths = Object.values(src).filter((path)=>path.indexOf(".") == -1)
    paths.forEach((path)=>{
        const methods = readdirSync(joinPath(__dirname, path), {
            withFileTypes: false,
        });
        methods.forEach((method)=>{
            let routs = require(`./${path}/${method}`)
            routs.forEach((rout)=>{
                if(rout.auth) {
                    api[method.split(".")[0]](`/${path}/${rout.name}`, rout.auth, (rq,rs)=>rout.handler(rq,rs))
                } else {
                    api[method.split(".")[0]](`/${path}/${rout.name}`, (rq,rs)=>rout.handler(rq,rs))
                }
                console.log(`[route]instaced - ${method.split(".")[0]}: /${path}${rout.name}`)
            })
        })
    })

    return api;
};
  
module.exports = setup;