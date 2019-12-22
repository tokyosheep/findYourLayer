/*
var obj = [
    {
        "name": "C.ai",
        "layers": [
            {
                "name": "レイヤー 3",
                "flag": false
            },
            {
                "name": "レイヤー 2",
                "flag": false
            },
            {
                "name": "レイヤー 1",
                "flag": true
            }
        ]
    },
    {
        "name": "A.ai",
        "layers": [
            {
                "name": "レイヤー 3",
                "flag": false
            },
            {
                "name": "レイヤー 2",
                "flag": false
            },
            {
                "name": "レイヤー 1",
                "flag": true
            }
        ]
    },
    {
        "name": "B.ai",
        "layers": [
            {
                "name": "レイヤー 1",
                "flag": true
            }
        ]
    }
];

selectEachLayers(obj);
*/

function selectCommonLayers(object){
    app.activeDocument = app.documents[0];
    var docs = getAlldocs();
    for(var n=0;n<docs.length;n++){ 
        app.activeDocument = docs[n];
        activeDocument.selection = null; 
        for(var j=0;j<object.selectedLay.length;j++){
            try{
                if(!selectItemsOnLayer(activeDocument.layers[object.selectedLay[j]]))continue;
                selectFunc(activeDocument.layers[object.selectedLay[j]],object.option);
            }catch(e){
                continue
            }
        }
    }
    return true;
}

function selectEachLayers(objects){
    app.activeDocument = app.documents[0];
    for(var n=0;n<objects.selected.length;n++){
        try{
            app.activeDocument = app.documents[objects.selected[n].name];
            activeDocument.selection = null;
        }catch(e){
            continue;
        }
        for(var j=0;j<objects.selected[n].layers.length;j++){
            try{
                if(app.activeDocument.layers[j].name == objects.selected[n].layers[j].name && objects.selected[n].layers[j].flag
                ){
                    if(!selectItemsOnLayer(activeDocument.layers[objects.selected[n].layers[j].name]))continue;
                    selectFunc(activeDocument.layers[objects.selected[n].layers[j].name],objects.option);
                }
            }catch(e){
                continue;
            }
        }
    }
    return true
}

function getAlldocs(){
    var docs = [];
    for(var i=0;i<app.documents.length;i++){
        docs[i] = app.documents[i];
    }
    return docs;
}

function selectItemsOnLayer(layer){
    //if(layer.locked || !layer.visible)return false;
    for(var i = 0;i<layer.pageItems.length;i++){
        try{
            $.writeln(layer.pageItems[i]);
            layer.pageItems[i].selected = true;
            return true;
        }catch(e){
            alert(e);
            return false;
        }
    }
}

function lockLayers(layer,flag){
    try{
        layer.locked = flag;
    }catch(e){

    }
}

function visibleLayer(layer,flag){
    try{
        lauyer.visible = flag;
    }catch(e){
        
    }
}

function selectFunc(layer,type){
    switch(type.btn){
        case "lock":
        lockLayers(layer,true);
        break;

        case "unlock":
        lockLayers(layer,false);
        break;

        case "visible":
        visibleLayer(layer,true);
        break;

        case "unbisible":
        visibleLayer(layer,false);
        break;

        case "downLay":

        break;

        case "upLay":

        break
    }
}