// ==UserScript==
// @name         MineHub word changer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://minehub-ui-sandbox.eu-de.mybluemix.net/*
// @grant        none
// @run-at      document-idle
// ==/UserScript==

// ==UserScript==
// @name           Replace Text On Webpages
// @namespace      https://userscripts-mirror.org/users/23652
// @description    Replaces text on websites. Now supports wildcards in search queries. Won't replace text in certain tags like links and code blocks
// @include        http://*
// @include        https://*
// @include        file://*
// @exclude        https://userscripts-mirror.org/scripts/review/*
// @exclude        https://userscripts-mirror.org/scripts/edit/*
// @exclude        https://userscripts-mirror.org/scripts/edit_src/*
// @exclude        https://userscripts-mirror.org/scripts/review/*
// @exclude        https://userscripts-mirror.org/scripts/edit/*
// @exclude        https://userscripts-mirror.org/scripts/edit_src/*
// @copyright      JoeSimmons
// @version        1.1.0
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @downloadURL    https://userscripts-mirror.org/scripts/source/41369.user.js
// @updateURL      https://userscripts-mirror.org/scripts/source/41369.meta.js
// ==/UserScript==
(function () {
    var change = function(){

        //choose product:
        //woodpulp
        //iron
        //phosphates
        //basic
        //...
        var product = "iron";

        var replacements, regex, key, textnodes, node, s;
        if (product == "basic"){
            console.log("condition met basic");
            replacements = {
                "Concentrate": "Product",
                "Contracts": "Transactions",
                "Contract": "Transaction",
                "CONTRACT": "TRANSACTION",
                "Contract ID": "Transaction ID",
                "Signatures": "Confirmations",
                "Sign": "Confirm",
                "Invalid date": "31 Sep 2019",
                "Create New Contract": "Create New Transaction",
            };
        } else if (product == "iron"){
            console.log("condition met iron");
            replacements = {
                "Concentrate": "Product",
                "Contracts": "Transactions",
                "Contract": "Transaction",
                "CONTRACT": "TRANSACTION",
                "Contract ID": "Transaction ID",
                "Signatures": "Confirmations",
                "Sign": "Confirm",
                "Invalid date": "31 Sep 2019",
                "Create New Contract": "Create New Transaction",
                "Mn ": "Aluminium Oxide ",
                "MgO ": "Silica ",
                "Sb ": "Phosphorus ",
                "Hg ": "Titanium ",
                "Cd ": "Chromium ",
                "Penasquito": "Wheelarra",
                "Red Lake": "Mt Newman",
                "Porcupine": "Yandi",
                "Copperrrency": "CCY",
            };
        } else if (product == "phosphates"){
            console.log("condition met phosphates");
            replacements = {
                "Mn ": "Aluminium dioxide ",
                "Cl ": "Silica ",
                "Zn ": "Calcium dioxide ",
                "Fe ": "Feric oxide ",
                "Pb ": "Potassium Oxide ",
                "Sb ": "Phosphorous Pentoxide ",
                "InS ": "Vanadium ",
                "Moisture": "Loss of Ignition",
                "Concentrate": "Product",
                "Antimony": "Phosphate Rock",
                "Arsenic": "Potash",
                "Wheelarra": "Wingate Creek",
                "Mt Newman": "Hopewell",
                "Yandi": "South Pasture Mine",

            };
        } else if (product == "woodpulp"){
            console.log("condition met woodpulp");
            replacements = {
                "Cu": "shortstrand",
                "Cl": "longstrand",
                "Zinc": "wood pulp",
            };
        }

        regex = {};
        for (key in replacements) {
            regex[key] = new RegExp(key, 'g');
        }

        textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        for (var i = 0; i < textnodes.snapshotLength; i++) {
            node = textnodes.snapshotItem(i);
            s = node.data;
            for (key in replacements) {
                s = s.replace(regex[key], replacements[key]);
            }
            node.data = s;
        }

        setTimeout(change, 500); // check again in a second
    }

    change();
}());
