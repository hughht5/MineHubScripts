// ==UserScript==
// @name         MineHub Trial
// @namespace    http://tampermonkey.net/
// @version      0.1.6
// @description  temporary script for the current trial
// @author       hugh halford-thompson, MineHub
// @match        https://minehub-ui-sandbox.eu-de.mybluemix.net/*
// @match        https://minehub-ui-uat.mybluemix.net/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/hughht5/MineHubScripts/master/Greasemonkey%20script/trial.js
// @downloadURL  https://raw.githubusercontent.com/hughht5/MineHubScripts/master/Greasemonkey%20script/trial.js
// ==/UserScript==

(function () {

  var changed = false;

  window.addEventListener('load', function () {
    console.log("It's loaded! - changing text every 1/2 second. Try to find a better way to detect onLoad sow e can call run() only once.");
    run();
    setInterval(run, 500); // check again in a half second
  });

  var run = function () {

    //globally change product names
    var replacements = {
      "Fluorine": "34AU NBLL",
      "Chlorine": "34AU MACF",
      "Indium": "34AU NHGF",
      "Iron Ore": "34AU YNDF"
    };
    changeWords(replacements);

    //when creating production reports
    if (window.location.href.endsWith("inventory/PR/create-inventory")) {
      //Remove fields from drop down other than Iron Ore
      console.log('removing values from production report dropdown');
      $("#primaryConcentrate > option").each(function () {
        if (this.value == 'Fe' || this.value == 'In (s)' || this.value == 'F' || this.value == 'Cl' || this.textContent == 'Select a Product') {
        } else {
          //console.log('removing ' + this.value + ' from product dropdown');
          this.remove();

        }
      });
      console.log('Changing create PR words');
      changeProductionReportWords();
    }

    //when viewing production reports
    if (window.location.href.includes("/inventory/PR/PR")) {

      console.log('Changing view PR words');
      var replacements = {
        "Te": "LOI",
        "Thermal Coal": "Oth.Metals",
        "Ti": "Size<6.3MM",
        "Zn": "Size>31.5MM",
        "Na": "P"
      };
      changeWords(replacements);

      //also remove blank values
      $(".col-4.no-gutters").each(function () {
        if (this.children[1].children[1].textContent.startsWith("0.00 ")) {
          console.log("removing 0.00 value item from production report");
          this.remove();
        }
      });
    }

    //when viewing buyer / seller assays
    if (window.location.href.includes("inventory-assay-home/assay-report/")) {
      console.log('Changing assay words');
      changeProductionReportWords();
    }

    //when creating a contract
    if (window.location.href.endsWith("contracts/new/edit#Material&Quality")) {
      console.log('Changing create new contract materials page');
      changeMaterialsAndQuality();
    }


    if (window.location.href.includes("contracts/new/edit")) {
      if (window.location.href.endsWith("contracts/new/edit")) { //if user is on the first page of creating a contract:
        console.log('Removing submit button from first page of contract');
        $(".bx--btn--primary").each(function () {
          this.hidden = true;

        });
      } else {
        //else show the submit button
        this.hidden = false;

      }
    }

    if (window.location.href.endsWith("contracts/new/edit#ShippingDetails")) {
      console.log('Changing create new contract shipping page');
      changeShippingDetails();
    }
    if (window.location.href.endsWith("contracts/new/edit#PaymentTerms")) {
      console.log('Changing create new contract payment terms page');
      changePaymentTerms();
    }
    if (window.location.href.endsWith("contracts/new/edit#Signature")) {
      console.log('Hiding Submit Transaction button and renaming save draft to submit');
      changeSignaturePage();
    }


    //When viewing contracts
    if (window.location.href.includes("/contracts/") && window.location.href.endsWith("/details#Material&Quality")) {
      console.log('Changing view contract materials page');
      changeViewMaterialsAndQuality();
    }
    if (window.location.href.includes("/contracts/") && window.location.href.endsWith("/details#ShippingDetails")) {
      console.log('Changing view contract shipping page');
      changeViewShippingDetails();
    }
    if (window.location.href.includes("/contracts/") && window.location.href.endsWith("/details#PaymentTerms")) {
      console.log('Changing view contract payment page');
      changeViewPaymentTerms();
    }

    //when editing a draft contract
    if (window.location.href.includes("/contracts/") && window.location.href.includes("/edit")) {
      // Allow the buyer to edit the contract
      $("input").each(function () {
        this.disabled = false
      });
      $("textarea").each(function () {
        this.disabled = false
      });
      /*var elements = document.getElementsByClassName("ng-untouched ng-pristine bx--text-area");
      for (var i=0, max=elements.length; i < max; i++) {
          elements[i].disabled = false;
          console.log("element " + i + " now editable");
      }
      var elements = document.getElementsByClassName("ng-untouched ng-pristine bx--text-input");
      for (var i=0, max=elements.length; i < max; i++) {
          elements[i].disabled = false;
          console.log("element " + i + " now editable");
      }
      document.getElementById("ibm-label-37").disabled = false;          //dischare port field
      */
    }
    if (window.location.href.includes("/contracts/") && window.location.href.endsWith("/edit#Material&Quality")) {
      console.log('Changing edit draft contract materials page');
      changeMaterialsAndQuality();
    }
    if (window.location.href.includes("/contracts/") && window.location.href.endsWith("/edit#ShippingDetails")) {
      console.log('Changing edit draft contract shipping page');
      changeShippingDetails();
    }
    if (window.location.href.includes("/contracts/") && window.location.href.endsWith("/edit#PaymentTerms")) {
      console.log('Changing edit draft contract payment page');
      changePaymentTerms();
    }
    if (window.location.href.includes("/contracts/") && window.location.href.endsWith("/edit#Signature")) {
      console.log('Hiding Submit Transaction button and renaming save draft to submit');
      changeSignaturePage();
    }


  }

  function changeViewPaymentTerms() {
    //replace some words
    var replacements = {
      "Penalties Statement": "Despatch Rate",
      " Penalties calculated on a composite basis ": "Final Payment Received"
    };
    changeWords(replacements);

    //remove some fields
    $(".col").each(function () {
      if (this.children[0] != undefined) {
        if (this.children[0].textContent == 'First Provisional Invoice Payable Upon Vessel Arrival' ||
          this.children[0].textContent == 'LIBOR and Additional Interest Rate' ||
          this.children[0].textContent == 'Second Provisional Invoice'
        ) {
          this.remove();
        }
      }
    });
    //deal with duplicate metal pricing statement
    var count = 0;
    $(".col").each(function () {
      if (this.children[0] != undefined) {
        if (this.children[0].textContent == 'Metal Pricing Statement') {
          if (count == 0) {
            this.children[0].textContent = 'Index';
          }
          if (count == 1) {
            this.children[0].textContent = 'Demurrage Rate';
          }
          count++;
        }
      }
    });

  }


  function changeViewShippingDetails() {
    //replace some words
    var replacements = {
      "Delivery City": "Discharge Port",
      "Delivery and Insurance Instructions": "Load Port",
      "Weighing, Sampling, Moisture Determination and Assays": "Second Discharge Port",
      "WSMD": ""
    };
    changeWords(replacements);

    //remove some fields
    $(".col").each(function () {
      if (this.children[0] != undefined) {
        if (this.children[0].textContent == 'Discharge Rate'
        ) {
          this.remove();
        }
      }
    });
  }

  function changePaymentTerms() {
    //replace some words
    var replacements = {
      "Provisional Invoices Metals Pricing Statement": "Index",
      "Title and Risk": "Demurrage Rate",
      "Penalties calculate on a composite basis": "Final Payment Received",
      "Penalties Terms": "Despatch Rate"
    };
    changeWords(replacements);

    //remove some fields
    $(".bx--col-md-8").each(function () {
      if (this.children[0].children[0] != undefined) {
        if (this.children[0].children[0].textContent == 'First Provisional Invoice Payable Upon Vessel Arrival (%)' ||
          this.children[0].children[0].textContent == 'LIBOR + Additional Interest Rate (%)' ||
          this.children[0].children[0].textContent == 'Second Provisional Invoice Payable Upon Information Not Being Available Within Payment Period(%)'
        ) {
          this.remove();
        }
      }
    });
  }

  function changeSignaturePage() {
    $(".bx--btn--primary").each(function () {
      if (this.textContent == 'Submit Transaction') {
        this.hidden = true;
      } else if (this.textContent == 'Save Draft') {
        this.textContent = 'Submit';
        this.hidden = false;
      }
    });
  }


  function changeShippingDetails() {
    //replace some words
    var replacements = {
      "Delivery City": "Discharge Port",
      "Delivery and Insurance Instructions": "Load Port",
      "Weighing, Sampling, Moisture Determination and Assays": "Second Discharge Port",
      "WSMD": ""
    };
    changeWords(replacements);

    //remove some fields
    $(".bx--col-md-4").each(function () {
      if (this.children[0].children[0] != undefined) {
        if (this.children[0].children[0].textContent == 'Discharge Rate (WMT per weather working days)'
        ) {
          this.remove();
        }
      }
    });
  }

  //Remove elements in the list other than those related to Iron Ore
  function changeProductionReportWords() {
    console.log('removing element boxes in production report page');
    $(".col-md-1.mb-3").each(function () {
      if (this.children[0].textContent == 'Weight (WMT)' ||
        this.children[0].textContent == 'Weight (DMT)' ||
        this.children[0].textContent == 'Moisture (%)' ||
        this.children[0].textContent == 'Al2O3 (%)' ||
        this.children[0].textContent == 'Cu (%)' ||
        this.children[0].textContent == 'Fe (%)' ||
        this.children[0].textContent == 'P (%)' ||
        this.children[0].textContent == 'S (%)' ||
        this.children[0].textContent == 'SiO2 (%)' ||
        this.children[0].textContent == 'LOI (%)' ||
        this.children[0].textContent == 'Oth.Metals (%)' ||
        this.children[0].textContent == 'Maximum size (mm)' ||
        this.children[0].textContent == '% above maximum size' ||
        this.children[0].textContent == 'Minimum size (mm)' ||
        this.children[0].textContent == 'Emissions - Mine Operations (MT)' ||
        this.children[0].textContent == 'Emissions - Logistics (MT)' ||
        this.children[0].textContent == '% below minimum size') {
        //skip if it's one we want
      } else {
        //repurpose those that we need
        if (this.children[0].textContent == 'As (%)') {
          this.children[0].textContent = "LOI (%)";
        } else if (this.children[0].textContent == 'Na (%)') {
          this.children[0].textContent = "P (%)";
        } else if (this.children[0].textContent == 'Te (%)') {
          this.children[0].textContent = "Oth.Metals (%)";
        } else if (this.children[0].textContent == 'Thermal Coal (%)') {
          this.children[0].textContent = "Minimum size (mm)";
        } else if (this.children[0].textContent == 'Sn (%)') {
          this.children[0].textContent = "% below minimum size";
        } else if (this.children[0].textContent == 'Ti (%)') {
          this.children[0].textContent = "Maximum size (mm)";
        } else if (this.children[0].textContent == 'Zn (%)') {
          this.children[0].textContent = "% above maximum size";
        } else if (this.children[0].textContent == 'Cl (%)') {
          this.children[0].textContent = "Emissions - Mine Operations (MT)";
        } else if (this.children[0].textContent == 'Cr (%)') {
          this.children[0].textContent = "Emissions - Logistics (MT)";
        } else {
          //remove the rest
          this.remove();
        }
      }
    });
  }


  function changeViewMaterialsAndQuality() {
    //replace some words
    var replacements = {
      "DMT of Product": "Quantity (WMT)",
      "Contract Metal Type": "Material",
      "Splitting Limits": "Shipping Tolerance (%)",
      "Mine General Assay Range:": "Premium / Discount"
    };
    changeWords(replacements);

    //remove some fields
    $(".headerLabel").each(function () {
      if (this.textContent == 'Deductions:' ||
        this.textContent == 'Lot Breakdown'
      ) {
        this.remove();
      }
    });
    $(".col").each(function () {
      if (this.children[0].children[0] != undefined) {
        if (this.children[0].children[0].textContent == 'Payables' ||
          this.children[0].children[0].textContent == 'Treatment Charge' ||
          this.children[0].children[0].textContent == 'Parts for Seller' ||
          this.children[0].children[0].textContent == 'Parts for Buyer' ||
          this.children[0].children[0].textContent == 'Parts held in reserve' ||
          this.children[0].children[0].textContent == 'Penalties:'
        ) {
          this.remove();
        }
      }
    });
  }

  function changeMaterialsAndQuality() {
    //replace some words
    var replacements = {
      "DMT of Product": "Quantity (WMT)",
      "DMT Of Product": "Quantity (WMT)",//different apelling for the edit draft page...
      "Contract Metal Type": "Material",
      "Splitting Limits": "Shipping Tolerance",
      " or g/dmt": "",
      "Mine General Assay Range:": "Premium / Discount"
    };
    changeWords(replacements);

    //change / remove dropdown options
    $(".bx--list-box__menu-item").each(function () {
      if (this.textContent == "Fluorine") {
        this.textContent = "34AU NBLL";
      } else if (this.textContent == "Chlorine") {
        this.textContent = "34AU MACF";
      } else if (this.textContent == "Indium") {
        this.textContent = "34AU NHGF";
      } else if (this.textContent == "Iron Ore") {
        this.textContent = "34AU YNDF";
      } else if (this.textContent == "34AU NBLL" ||
        this.textContent == "34AU MACF" ||
        this.textContent == "34AU NHGF" ||
        this.textContent == "34AU YNDF") {
        //do nothing
      } else {
        this.remove();
      }
    });

    //remove some fields
    $(".bx--col-md-2").each(function () {
      if (this.children[0].children[0] != undefined) {
        if (this.children[0].children[0].textContent == 'Payables(%)' ||
          this.children[0].children[0].textContent == 'Parts for Seller' ||
          this.children[0].children[0].textContent == 'Parts for Buyer' ||
          this.children[0].children[0].textContent == 'Parts held in reserve'
        ) {
          this.remove();
        }
      }
    });
    $(".bx--col-md-4").each(function () {
      if (this.children[0].children[0] != undefined) {
        if (this.children[0].children[0].textContent == 'Penalties (USD per DMT)' ||
          this.children[0].children[0].textContent == 'Treatment Charge (USD per DMT)'
        ) {
          this.remove();
        }
      }
    });
    $(".bx--col-md-8").each(function () {
      if (this.children[0].children[0] != undefined) {
        if (this.children[0].children[0].textContent == 'Silver (USD per Payable Silver Ounce)') {
          this.remove();
        }
      }
    });
    $(".header").each(function () {
      if (this.textContent == 'Deductions:' ||
        this.textContent == 'Lot Breakdown:'
      ) {
        this.remove();
      }
    });
  }


  //Replace words in the replacements list
  function changeWords(replacements) {

    console.log('replacing words:' + JSON.stringify(replacements));
    //change words
    var regex, key, textnodes, node, s;

    regex = {};
    for (key in replacements) {
      regex[key] = new RegExp(key, 'g');
    }

    textnodes = document.evaluate("//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < textnodes.snapshotLength; i++) {
      node = textnodes.snapshotItem(i);
      s = node.data;
      for (key in replacements) {
        s = s.replace(regex[key], replacements[key]);
      }
      node.data = s;
    }
  }

}());
