var SelectFunc = function(layer,option){
    this.layer = layer;
    this.option = option;
}

SelectFunc.prototype.whichFunc = function(/*layer,type*/){
    switch(this.option.id){
        case "lock":
        lockLayers(this.layer,true);
        break;

        case "unlock":
        lockLayers(this.layer,false);
        break;

        case "visible":
        visibleLayer(this.layer,true);
        break;

        case "unvisible":
        visibleLayer(this.layer,false);
        break;

        case "downLay":
            backWorkd(this.layer);
        break;

        case "upLay":
            forwardFlont(this.layer);
        break;

        case "process":
            selectItemsOnLayer(this.layer);
        break;

        default:
        break;
    }
}

var CommonLayers = function(obj){
    this.obj = obj;
}

CommonLayers.prototype.selectDoc = function(){
    app.activeDocument = app.documents[0];
    var docs = getAlldocs();
    for(var n=0;n<docs.length;n++){ 
        app.activeDocument = docs[n];
        activeDocument.selection = null; 
        this.getLayers();
    }
}

CommonLayers.prototype.getLayers = function(){
    for(var j=0;j<this.obj.selectedLay.length;j++){
        try{
            //if(!selectItemsOnLayer(activeDocument.layers[this.obj.selectedLay[j]]))continue;
            var layProcess = new SelectFunc(activeDocument.layers[this.obj.selectedLay[j]],this.obj.option);
            layProcess.whichFunc();
            //selectFunc(activeDocument.layers[this.obj.selectedLay[j]]);
        }catch(e){
            continue
        }
    }
}

var EachLayers = function(obj){
    this.obj = obj;
}

EachLayers.prototype.selectDoc = function(){
    app.activeDocument = app.documents[0];
    for(var i=0;i<this.obj.selectedLay.length;i++){
        try{
            app.activeDocument = app.documents[this.obj.selectedLay[i].name];
            activeDocument.selection = null;
            this.selectLayers(this.obj.selectedLay[i].layers);
        }catch(e){
            continue;
        }
    }
}

EachLayers.prototype.selectLayers = function(layers){
    for(var n=0;n<layers.length;n++){
        if(app.activeDocument.layers[n].name === layers[n].name && layers[n].flag){
            var func = new SelectFunc(app.activeDocument.layers[n],this.obj.option);
            func.whichFunc();
        }
    }
}

function getAlldocs(){
    var docs = [];
    for(var i=0;i<app.documents.length;i++){
        docs[i] = app.documents[i];
    }
    return docs;
}

function lockLayers(layer,flag){
    try{
        layer.locked = flag;
    }catch(e){

    }
}

function visibleLayer(layer,flag){
    try{
        layer.visible = flag;
    }catch(e){
        
    }
}

function forwardFlont(layer){
    try{
        layer.zOrder(ZOrderMethod.BRINGFORWARD);
    }catch(e){

    }
}

function backWorkd(layer){
    try{
        layer.zOrder(ZOrderMethod.SENDBACKWARD);
    }catch(e){

    }
}

function selectItemsOnLayer(layer){
    if(layer.locked || !layer.visible)return false;
    for(var i = 0;i<layer.pageItems.length;i++){
        try{
            layer.pageItems[i].selected = true;
        }catch(e){
            alert(e);
            return false;
        }
    }
    return true;
}

function selectCommonLayers(obj){
    var commonLayers = new CommonLayers(obj);
    commonLayers.selectDoc();
    return true;
}

function selectEachLayers(obj){
    var eachLay = new EachLayers(obj);
    eachLay.selectDoc();
    return true;
}
