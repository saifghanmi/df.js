// ==UserScript==
// @name         Salla dash v0.1
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


var spans = document.querySelectorAll("span");

for (var i = 0; i < spans.length; i++) {
  var span = spans[i];
  var spanText = span.textContent;

  var matches = spanText.match(/من: "(.+)"\nالى: "(.+)"\nالرسالة: "((?:[^"\\]|\\.)+)"(?:\nالرابط: (.+))?/);

  if (matches) {
    var from = matches[1];
    var to = matches[2];
    var message = matches[3];
    var link = matches[4] || '';

    var formattedText = 'من: "' + from + '"\nالى: "' + to + '"\nالرسالة: "' + message + '"\nالرابط: ' + link;

    var div = document.createElement("div");
    var lines = formattedText.split('\n');

    for (var j = 0; j < lines.length; j++) {
      var line = document.createElement("div");

      if (j === lines.length - 1 && link) {
        var lineText = document.createTextNode(lines[j] + " ");
        line.appendChild(lineText);

        var lineBreak = document.createElement("br");
        line.appendChild(lineBreak);

        var anchor = document.createElement("a");
        anchor.href = link;
        anchor.target = "_blank"; // Open link in a new tab

        var image = document.createElement("img");
        image.src = link; // assuming the link itself is the URL of the image
        image.style.width = "100%";
        image.style.height = "100%";
        image.style.paddingTop = "13px";

        anchor.appendChild(image);

        line.appendChild(anchor);
      } else {
        line.textContent = lines[j];
      }

      div.appendChild(line);
    }

    span.parentNode.replaceChild(div, span);
  }
}


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





      if (window.location.href.startsWith("https://s.salla.sa/orders/print/")) {


            var style = document.createElement('style');
  style.textContent = '@media print { .hello { color: red !important; } }';
  document.head.appendChild(style);

  var spans1 = document.getElementsByTagName('span');
  for (var m = 0; m < spans1.length; m++) {
    var span2 = spans1[m];
    var spanText1 = span2.textContent.trim();
    if (spanText1.includes('سريع')) {
      span2.classList.add('hello');
    }
  }


}



})();
