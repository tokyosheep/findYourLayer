(function(){
    $.writeln(activeDocument.activeLayer.zOrderPosition);
    var layer = activeDocument.activeLayer;
    //layer.move(app.activeDocument.layers[2],ElementPlacement.PLACEAFTER);
    //layer.zOrder(ZOrderMethod.BRINGFORWARD);
    layer.zOrder(ZOrderMethod.SENDBACKWARD);
})();