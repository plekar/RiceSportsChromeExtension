document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
      document.getElementById('surprise').innerHTML=Date();
    }, false);
  }, false);