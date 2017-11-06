(function() {
  function getCookie(name) {
    var allCookies = document.cookie.split('; ');
    var myCookie = allCookies.find(function(cookie) {
      return cookie.includes('theme=');
    });
    return myCookie.split('=')[1] || '';
  }
  var theme = getCookie('theme');
  document.body.classList = '';
  document.body.classList.add(theme);
})();
