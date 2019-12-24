"use strict";
const csInterface = new CSInterface();
const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;
csInterface.evalScript(`$.evalFile("${extensionRoot}json2.js")`);//json2読み込み
module.exports = class ConectJsx {
    constructor(){
        this.funcType;
    }
    
    CallHostScript(obj){
        console.log(obj);
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