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
    const lock = document.getElementById("lock");
    const unlock = document.getElementById("unlock");
    const downLay = document.getElementById("downLay");
    const upLay = document.getElementById("upLay");
    const visible = document.getElementById("visible");
    const unbisible = document.getElementById("unbisible");
    const optNumber = document.getElementById("optNumber");
    
    const JsxEvent = require(`${__dirname}/js/import/ButtonEvent`);
    const makeBoxes = require(`${__dirname}/js/import/makeBoxes`);
    const ConnectJsx = require(`${__dirname}/js/import/connect`);
    const createSelectTable = require(`${__dirname}/js/import/createSelectTable`);
    
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
            const table = createSelectTable(layers);
            table.td1.textContent = obj.name;
            table.select.id = Object.keys(obj)[0];
            table.select.classList.add("layers");
            table.select.multiple = true;
            table.select.dataset.name = obj.name;
            obj.layers.forEach((v,i)=>{
                const option = this.createOption(v,i);
                table.select.appendChild(option);
            });
        }
        
        createOption(value,index){
            const option = document.createElement("option");
            option.value = index;
            option.textContent = value;
            return option;
        }
        
        createCheckBox(parent,layerName){
            const checkList = makeBoxes.makeCheckbox(parent);
            checkList.span.textContent = layerName;
            checkList.checkbox.classList.add("commonLay");
            checkList.checkbox.id = layerName;
        }
    }
    const cf = new createForm("getLayers.jsx",loadLayers);
    
    console.log(document.forms);
    class SelectLayers extends JsxEvent{
        constructor(btn,func = null){
            super(null,btn);
            this.func = func;
        }
        
        handleEvent(){
            if(this.func === null)this.func = document.forms.selectType.type.value;
            this.type = document.forms.selectType.type.value;
            console.log(this.type);
            const option = {btn:this.btn.id};
            if(this.type === "selectCommonLayers"){
                const commons = new CommonLayer(this.func,option);
            }
            if(this.type === "selectEachLayers"){
                const each = new EachDocmentlayers(this.func,option);
            }
        }
    }
    const proceed = new SelectLayers(process);
    
    
    class CommonLayer extends ConnectJsx{
        constructor(funcType,option){
            super(funcType);
            this.option = option;
            this.connectLay();
        }
        
        async connectLay(){
            console.log("go");
            const selectedLay = Array.from(document.getElementsByClassName("commonLay")).filter(v => v.checked).map(v => v.id);
            console.log(selectedLay);
            const flag = await this.CallHostScript({selectedLay:selectedLay,option:this.option}).catch(err => console.log(err));
            console.log(flag);
        }
        
    }
    
    class EachDocmentlayers extends ConnectJsx{
        constructor(funcType,option){
            super(funcType);
            this.option = option;
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
            const flag = await this.CallHostScript({selected:selected,option:this.option}).catch(err => console.log(err));
            console.log(flag);
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
    
