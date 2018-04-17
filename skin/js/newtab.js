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
  document.title = chrome.i18n.getMessage('titleNewTab');

  const html = document.getElementById('newtab');

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
