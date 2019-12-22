"use strict";
/*
create checkbox and radiobox 
on topcoat css
*/
module.exports.makeCheckbox = function makeCheckbox(parent){
    const li = document.createElement("li");
    /* create input element on ul list so It create li element as well */
    parent.appendChild(li);
    const label = document.createElement("label");
    label.classList.add("topcoat-checkbox");
    li.appendChild(label);
    
    const input = document.createElement("input");
    input.type = "checkbox";
    label.appendChild(input);
    
    const div = document.createElement("div");
    div.classList.add("topcoat-checkbox__checkmark");
    label.appendChild(div);
    
    const span = document.createElement("span");
    label.appendChild(span);
    
    return {li:li,label:label,checkbox:input,div:div,span:span};
}

/*
both of function return created element as a object
*/

module.exports.makeRadioButton = function makeRadioButton(parent){
    const li = document.createElement("li");
    parent.appendChild(li);
    const label = document.createElement("label");
    label.classList.add("topcoat-radio-button");
    li.appendChild(label);
    
    const input = document.createElement("input");
    input.type = "radio";
    label.appendChild(input);
    
    const div = document.createElement("div");
    div.classList.add("topcoat-radio-button__checkmark");
    label.appendChild(div);
    
    const span = document.createElement("span");
    label.appendChild(span);
    
    return {li:li,label:label,radioBox:input,div:div,span:span};
}