// Copyright 2018 Christian Müller. All rights reserved.
// Use of this source code is governed by the MIT license that can be
// found in the LICENSE file.

'use strict';

function ready(fn) {
  if (document.attachEvent ?
      document.readyState === 'complete' :
      document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function() {
  // Set document title
  document.title = chrome.i18n.getMessage('titleOptions');

  const colorOption = document.getElementById('opt-bg-color');

  const isValidColor = function(color) {
    const regex = new RegExp('#[A-Za-z0-9]{6}', 'i');
    return !!regex.test(color);
  };

  // Check for existing color and restore
  chrome.storage.sync.get('optBgColor', function(items) {
    const bgColor = items.optBgColor;
    if (isValidColor(bgColor)) {
      colorOption.value = bgColor;
    }
  });

  // Store new color
  colorOption.addEventListener('change', function() {
    const newBgColor = colorOption.value;
    if (isValidColor(newBgColor)) {
      chrome.storage.sync.set({'optBgColor': newBgColor});
    }
  });

  const html = document.getElementById('options');

  // Set style for background color
  chrome.storage.sync.get('optBgColor', function(items) {
    html.style.backgroundColor = items.optBgColor;
  });

  // Set new background color on the fly
  chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === 'sync') {
      html.style.backgroundColor = changes.optBgColor.newValue;
    }
  });
});
