window.onload = () =>{
    "use strict";
    const csInterface = new CSInterface();
    themeManager.init();
    const filePath = csInterface.getSystemPath(SystemPath.EXTENSION) +`/js/`;
    const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;
    
    const fs = require("fs");
    const path = require("path"); 
    csInterface.evalScript(`$.evalFile("${extensionRoot}json2.js")`);//json2読み込み
    
    const layers = document.getElementById("layers");
    const commonLay = document.getElementById("commonLay");
    const loadLayers = document.getElementById("loadLayers");
    const process = document.getElementById("process");
    
    class JsxEvent{
        constructor(jsx,btn){
            this.jsx = jsx;
            this.btn = btn;
            this.btn.addEventListener("click",this);
        }
        
        handleEvent(){}
        
        sendJsx(jsx){
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
    
    
    class createForm extends JsxEvent{
        constructor(jsx,btn){
            super(jsx,btn);
        }
        
        async handleEvent(){
            const layerNames = await this.sendJsx().catch(e => console.log(e));
            console.log(layerNames);
            [layers,commonLay].forEach(v => this.removeChildren(v));
            layerNames.forEach(obj=>{
                this.createSelectForm(obj);
            });
            const allLayers = layerNames.reduce((acc,obj)=>{
                return acc.concat(Array.from(new Set(obj.layers)));
            },[]);
            console.log(allLayers);
            const common = allLayers.reduce((acc,lay)=>{
                if(acc.has(lay)){
                    acc.set(lay, acc.get(lay) + 1);
                }else{
                    acc.set(lay,1);
                }
                return acc;
            },new Map([["docLength",layerNames.length]]));
            console.log(common);
            common.forEach((v,k)=>{
                console.log(common.get("docLength"));
                if(common.get("docLength") === v && k !== "docLength"){
                    this.createCheckBox(commonLay,k);
                }
            })
            
        }
        
        createSelectForm(obj){
            const tr = document.createElement("tr");
            layers.appendChild(tr);
            const td1 = document.createElement("td");
            td1.textContent = obj.name;
            tr.appendChild(td1);
            const td2 = document.createElement("td");
            tr.appendChild(td2);
            const select = document.createElement("select");
            select.id = Object.keys(obj)[0];
            select.classList.add("layers");
            select.multiple = true;
            select.dataset.name = obj.name;
            td2.appendChild(select);
            obj.layers.forEach((v,i)=>{
                const option = this.createOption(v,i);
                select.appendChild(option);
            });
        }
        
        createOption(value,index){
            const option = document.createElement("option");
            option.value = index;
            option.textContent = value;
            return option;
        }
        
        createCheckBox(parent,layerName){
            const li = document.createElement("li");
            parent.appendChild(li);
            const label = document.createElement("label");
            label.textContent = layerName;
            label.classList.add("topcoat-checkbox");
            li.appendChild(label);
            const input = document.createElement("input");
            input.type = "checkbox";
            input.classList.add("commonLay");
            input.id = layerName;
            label.appendChild(input);
            const div = document.createElement("div");
            div.classList.add("topcoat-checkbox__checkmark");
            label.appendChild(div);
        }
    }
    const cf = new createForm("getLayers.jsx",loadLayers);
    
    
    class SelectLayers extends JsxEvent{
        constructor(btn){
            super(null,btn);
        }
        
        handleEvent(){
            const type = document.forms.selects.type.value;
            console.log(type);
            if(type === "commons"){
                const commons = new CommonLayer("selectCommonLayers");
            }
            if(type === "eachLay"){
                const each = new EachDocmentlayers("selectEachLayers");
            }
        }
    }
    const proceed = new SelectLayers(process);
    
    class ConectJsx {
        constructor(funcType){
            this.funcType = funcType
        }
        
        SelectLayers(obj){
            return new Promise((resolve,reject)=>{
                csInterface.evalScript(`${this.funcType}(${JSON.stringify(obj)})`,(o)=>{
                    if(!o){
                        reject(o);
                    }
                    resolve(JSON.parse(o));
                });
            });
        }
    }
    
    class CommonLayer extends ConectJsx{
        constructor(funcType){
            super(funcType);
            this.connectLay();
        }
        
        async connectLay(){
            console.log("go");
            const selectedLay = Array.from(document.getElementsByClassName("commonLay")).filter(v => v.checked).map(v => v.id);
            console.log(selectedLay);
            const flag = await this.SelectLayers(selectedLay).catch(err => console.log(err));
            console.log(flag);
        }
        
    }
    
    class EachDocmentlayers extends ConectJsx{
        constructor(funcType){
            super(funcType);
            this.connectLay();
        }
        
        async connectLay(){
            const selectBoxes = Array.from(document.getElementsByClassName("layers"));
            const selected = selectBoxes.reduce((acc,current,index)=>{
                const obj = {}
                obj.name = current.dataset.name;
                console.log(current.getElementsByTagName("option"));
                obj.layers = Array.from(current.getElementsByTagName("option")).map(v=>{
                    return {name:v.textContent,flag:v.selected};
                });
                acc[index] = obj;
                return acc;
            },[]);
            console.log(selected);
            const write = await writeJson(`${extensionRoot}debug.json`,selected);
            const flag = await this.SelectLayers(selected).catch(err => console.log(err));
        }
    }
    
    function writeJson(json_path,obj){
        return new Promise(resolve=>{
            fs.writeFile(json_path,JSON.stringify(obj,null,4),(err)=>{//デバッグ用にjson書き出し
                if(err){
                    alert(err);
                }
                resolve(true);
            })
        })    
    }
}
    
