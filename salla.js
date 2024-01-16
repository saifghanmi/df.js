// ==UserScript==
// @name         Salla dash v0.0
// @namespace    http://tampermonkey.net/
// @version      2024-01-16
// @description  try to take over the world!
// @author       You
// @match        https://s.salla.sa/orders/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=salla.sa
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (window.location.href.startsWith("https://s.salla.sa/orders/order/")) {

const targetSelector = "#content_box > div.content > div.row > div > div.order-panels.rec-responsive > div:nth-child(5) > div.panel-body > div > div > div > span:nth-child(3)";
const searchText = "توصيل سريع";

const checkForTarget = () => {
  const element = document.querySelector(targetSelector);
  if (element) {
    const text = element.textContent;
    if (text && text.includes(searchText)) {
      const highlightedText = `<span style="font-size: xx-large; color: red;">${searchText}</span>`;
      const updatedHTML = text.replace(new RegExp(searchText, "g"), highlightedText);
      element.innerHTML = updatedHTML;
      clearInterval(intervalId);
    }
  }
};

const intervalId = setInterval(checkForTarget, 23);

  const elementToMove = document.querySelector("#content_box > div.content > div.row > div > div:nth-child(8)");
  const targetElement = document.querySelector("#content_box > div.content > div.row > div > div.panel.panel-default.no-margin");

  if (elementToMove && targetElement) {
    targetElement.parentNode.insertBefore(elementToMove, targetElement);
  }
}

})();
