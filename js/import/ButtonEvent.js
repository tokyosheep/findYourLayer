"use strict";
const csInterface = new CSInterface();
const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;

module.exports = class JsxEvent{
    constructor(jsx,btn){
        this.jsx = jsx;
        this.btn = btn;
        this.btn.addEventListener("click",this);
    }
    
    handleEvent(){}
    
    sendJsx(){
        return new Promise((resolve,reject)=>{
            csInterface.evalScript(`$.evalFile("${extensionRoot}${this.jsx}")`,(o)=>{
                if(!o){
                    reject(false);
                }
                const object = JSON.parse(o);
                resolve(object);
            });
        });
    }
    
    removeChildren(parent){
        while(parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
    }
}