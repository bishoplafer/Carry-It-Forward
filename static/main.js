"use strict"

// CONFIGURATIONS
const DONATION_EMAIL = 'info@carryitforward.net';

$(function () {
  $(document).scroll(function () {
    var $nav = $(".navbar");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});

// If the QR code generator is available, make a QR code
if (typeof QRCode !== 'undefined') {
  QRCode.toCanvas(document.getElementById('qr-canvas'), document.URL, function (error) {
    if (error) console.error(error)
  });
}

// Try to generate a donation link
try {
  const itemName = document.querySelector("meta[name='x-donation-item-name']").getAttribute('content');
  const donateFundsLinkElement = document.getElementById('donate-funds-link');

  const href = `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${DONATION_EMAIL}&lc=US&item_name=${itemName}&no_note=0&cn=&currency_code=USD&bn=PP-DonationsBF:btn_donateCC_LG.gif:NonHosted`
  donateFundsLinkElement.setAttribute('href', href);
} catch (e) {
  // Don't allow errors to bubble
}
