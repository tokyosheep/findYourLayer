"use strict";

module.exports = function createTable(parent){
    const tr = document.createElement("tr");
    parent.appendChild(tr);
    const td1 = document.createElement("td");
    tr.appendChild(td1);
    const td2 = document.createElement("td");
    tr.appendChild(td2);
    const select = document.createElement("select");
    td2.appendChild(select);
    return {tr:tr,td1:td1,td2:td2,select:select};
}