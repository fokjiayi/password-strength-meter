// get password everytime the user enters a character
document.getElementById('password').addEventListener('keypress', () => {
    var pw = document.getElementById("password").value    
    console.log(pw)
    }
  );

  function getCumulativeScore(){
    // call all password checking functions here
    var scoreZXCVBN = getZXCVBNScore()
    var scorePwLength = 75 // mock pw length returned value

    // calculate the average score (assuming scores returned are out of 100%)
    var average = Math.round((scoreZXCVBN + scorePwLength) / 2)

    // update score card
    const cumulativeScore = document.getElementById('cumulativeScore');
    const scoreCard = document.getElementById('scoreCard');
    const emoji = document.getElementById('emoji');
    cumulativeScore.textContent = average

    if(average < 40){
      scoreCard.classList.add("text-bg-danger")
      scoreCard.classList.remove("text-bg-warning")
      scoreCard.classList.remove("text-bg-success")
      emoji.textContent = " 🤮"
    }else if(average < 75){
      scoreCard.classList.remove("text-bg-danger")
      scoreCard.classList.add("text-bg-warning")
      scoreCard.classList.remove("text-bg-success")
      emoji.textContent = " 🤔"
    }
    else{
      scoreCard.classList.remove("text-bg-danger")
      scoreCard.classList.remove("text-bg-warning")
      scoreCard.classList.add("text-bg-success")
      emoji.textContent = " 🤩"
    }
  }

  function getZXCVBNScore() {
    const passwordInput = document.getElementById('password');
    const strengthBar = document.getElementById('strength-bar');
    const strengthLabel = document.getElementById('strength-label');
    const suggestions = document.getElementById('suggestions');
  
    const password = passwordInput.value;
    if(password.trim() == ""){
      strengthLabel.textContent = 'Very Weak';
      return 0
    }
    const result = zxcvbn(password);
  
    // Update strength bar
    strengthBar.value = result.score;

    // Update strength label
    switch (result.score) {
      case 0:
        strengthLabel.textContent = 'Very Weak';
        break;
      case 1:
        strengthLabel.textContent = 'Weak';
        break;
      case 2:
        strengthLabel.textContent = 'Moderate';
        break;
      case 3:
        strengthLabel.textContent = 'Strong';
        break;
      case 4:
        strengthLabel.textContent = 'Very Strong';
        break;
      default:
        strengthLabel.textContent = 'Weak';
    }
  
    // Display suggestions
    suggestions.textContent = 'Suggestions: ' + result.feedback.suggestions.join(', ');

    percentageScore = ((result.score+1) / 5) * 100
    return percentageScore
  }