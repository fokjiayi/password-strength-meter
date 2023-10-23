// get password everytime the user enters a character
document.getElementById('password').addEventListener('keypress', () => {
    var pw = document.getElementById("password").value    
    console.log(pw)
    }
  );