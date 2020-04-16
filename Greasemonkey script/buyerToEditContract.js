// ==UserScript==
// @name         MineHub_Buyer_to_edit_contract
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://minehub-ui-sandbox.eu-de.mybluemix.net/contracts/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.body.addEventListener('click', fn, true);

    function fn(){

        // Your code here...
        setTimeout(function () {
            var elements = document.getElementsByClassName("ng-untouched ng-pristine");
            for (var i=0, max=elements.length; i < max; i++) {
                elements[i].disabled = false;
                console.log("element " + i + " now editable");
            }
        }, 200);
    }
})();
