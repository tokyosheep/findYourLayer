(function(){
    var documents = [];
    var docs = getAlldocs();
    for(var n=0;n<docs.length;n++){
        app.activeDocument = docs[n];
        documents[n] = {};
        documents[n].layers = getLayerName();
        documents[n].name = activeDocument.name;
    }
    return JSON.stringify (documents);

    function getAlldocs(){
        var docs = [];
        for(var i=0;i<app.documents.length;i++){
            docs[i] = app.documents[i];
        }
        return docs;
    }

    function getLayerName(){
        var names = [];
        var layers = activeDocument.layers;
        for(var i=0;i<layers.length;i++){
            names[i] = layers[i].name;
        }
        return names;
    }
})();