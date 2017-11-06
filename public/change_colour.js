(function() {
  var themes = [
    'yellow-red',
    'blue-green',
    'green-purple',
    'orange-yellow',
    'pink-blue',
  ];

  function changeTheme(themeName) {
    document.body.classList = '';
    document.body.classList.add(themeName);
    document.cookie = 'theme=' + themeName;
  }

  themes.forEach(function(themeName) {
    var button = document.getElementsByClassName('js-' + themeName)[0];
    button.addEventListener('click', function() {
      changeTheme(themeName);
    });
  });
})();
