(function() {
  // Add theme to current page and store in cookie
  function applyTheme(themeName) {
    document.body.classList = '';
    document.body.classList.add(themeName);
    document.cookie = 'theme=' + themeName;
  }

  // Get value of cookie 'name'
  function getCookie(name) {
    var allCookies = document.cookie ? document.cookie.split('; ') : [];
    var myCookie = allCookies.find(function(cookie) {
      return cookie.includes('theme=');
    });
    return myCookie ? myCookie.split('=')[1] : '';
  }

  // Check if theme has been set
  var theme = getCookie('theme');
  if (theme) {
    document.body.classList = '';
    document.body.classList.add(theme);
  }

  var themes = [
    'yellow-red',
    'blue-green',
    'green-purple',
    'orange-yellow',
    'pink-blue',
  ];


  themes.forEach(function(themeName) {
    var tickedCircle = '/img/ticked-circle.png';
    var untickedCircle = '/img/unticked-circle.png';
    var button = document.getElementsByClassName('js-' + themeName)[0];
    // only proceed if on the colour theme selection page
    if (button) {
      var allButtons = document.getElementsByClassName('color-themes--selector');
      // tick correct theme if one is already set
      if (getCookie('theme') === themeName) {
        button.getElementsByTagName('img')[0].src = tickedCircle;
      }
      button.addEventListener('click', function() {
        for (var i = 0; i < allButtons.length; i++) {
          allButtons[i].getElementsByTagName('img')[0].src = untickedCircle;
        };
        applyTheme(themeName);
        button.getElementsByTagName('img')[0].src = tickedCircle;
      });
    }
  });
})();
