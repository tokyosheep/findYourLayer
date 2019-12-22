"use strict";
const csInterface = new CSInterface();
module.exports = class ConectJsx {
    constructor(funcType){
        this.funcType = funcType
    }
    
    CallHostScript(obj){
        return new Promise((resolve,reject)=>{
            csInterface.evalScript(`${this.funcType}(${JSON.stringify(obj)})`,(o)=>{
                if(!o){
                    reject(o);
                }
                resolve(o);
            });
        });
    }
}