


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