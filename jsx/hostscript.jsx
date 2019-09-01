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

function selectCommonLayers(array){
    app.activeDocument = app.documents[0];
    var docs = getAlldocs();
    for(var n=0;n<docs.length;n++){
        app.activeDocument = docs[n];
        for(var j=0;j<array.length;j++){
            try{
                selectItemsOnLayer(activeDocument.layers[array[j]]);
            }catch(e){

            }
        }
    }
    return true;
}

function selectEachLayers(objects){
    app.activeDocument = app.documents[0];
    for(var n=0;n<objects.length;n++){
        try{
            app.activeDocument = app.documents[objects[n].name];
        }catch(e){
            continue;
        }
        for(var j=0;j<objects[n].layers.length;j++){
            try{
                $.writeln("activeLay:"+app.activeDocument.layers[j].name);
                $.writeln("objects:"+objects[n].layers[j].name);
                $.writeln(objects[n].layers[j].flag);
                $.writeln(app.activeDocument.layers[j].name == objects[n].layers[j].name);
                if(app.activeDocument.layers[j].name == objects[n].layers[j].name && objects[n].layers[j].flag
                ){
                    $.writeln("go");
                    selectItemsOnLayer(activeDocument.layers[objects[n].layers[j].name]);
                }
            }catch(e){
                continue;
            }
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

function selectItemsOnLayer(layer){
    for(var i = 0;i<layer.pageItems.length;i++){
        try{
            $.writeln(layer.pageItems[i]);
            layer.pageItems[i].selected = true;
        }catch(e){
            alert(e);
        }
    }
}
