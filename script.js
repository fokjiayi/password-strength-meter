
// get password everytime the user enters a character
document.getElementById('password').addEventListener('keypress', () => {
    var pw = document.getElementById("password").value    
    console.log(pw)
    checkPasswordInDataBreaches(pw);
    }
  );
  

  function getCumulativeScore(){
    // call all password checking functions here
    var scoreZXCVBN = getZXCVBNScore()
    var scorePwLength = getPWLength()

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

  // PW Length

  function getPWLength() {
    const passwordInput = document.getElementById('password');
    const password = passwordInput.value;

    // Define the scoring criteria weights
    const lengthWeight = 0.2;
    const lowercaseWeight = 0.2;
    const uppercaseWeight = 0.2;
    const specialCharWeight = 0.2;
    const numberWeight = 0.2;
    const penaltyWeight = 0.1; // Weight for penalty deduction

    // Define the minimum length requirement
    const minLength = 12; // More than 11 characters

    // Define the maximum score
    const maxScore = 100;

    let score = 0;

    // Checks for the criteria to give a perfect score
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    const hasNumber = /\d/.test(password);

    // Checks for sequential patterns
    const sequentialNumbers = /123|234|345|456|567|678|789|890/;
    const sequentialLowercase = /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/;
    const sequentialUppercase = /ABC|BCD|CDE|DEF|EFG|FGH|GHI|HIJ|IJK|JKL|KLM|LMN|MNO|NOP|OPQ|PQR|QRS|RST|STU|TUV|UVW|VWX|WXY|XYZ/;
    
    if (
        password.length >= minLength &&
        hasLowercase &&
        hasUppercase &&
        hasSpecialChar &&
        hasNumber &&
        !sequentialNumbers.test(password) &&
        !sequentialLowercase.test(password) &&
        !sequentialUppercase.test(password)
    ) {
        score = maxScore;
    } else {
        // Calculate the score based on individual criteria
        // const lengthScore= 0;
        
        // const uppercaseScore = 0
        // const specialCharScore = 0    
        // const numberScore = 0
        

      // appear feedback if the password input is not 0 and everytime the input number changes
      // display the what has not been achieved
      // display what hsa been achieved according to the changes in input
      // if the input has been achieved, change the text
      if(password.length != 0){
        
        if (password.length >= minLength) {
          const lengthScore= 1;
          document.querySelector('#length').innerHTML = '<p id="length" style="color:green;">Password length is achieved.</p>';
      }
      else{
        document.querySelector('#length').innerHTML = '<p id="length" style="color:red;">Password length needs to be a at least 12 characters.</p>';
        const lengthScore= 0;
      }

        if (hasLowercase) {
          document.querySelector('#lowercase').innerHTML = '<p id="length" style="color:green;">Password has lower case characters.</p>';
          const lowercaseScore = 1
        }
        else{
          document.querySelector('#lowercase').innerHTML = '<p id="length" style="color:red;">Password needs to have lower case characters.</p>';
          const lowercaseScore = 0
        }

        if (hasUppercase) {
          document.querySelector('#uppercase').innerHTML = '<p id="length" style="color:green;">Password has upper case characters.</p>';
          const uppercaseScore = 1
        }
        else{
          document.querySelector('#uppercase').innerHTML = '<p id="length" style="color:red;">Password  needs to have upper case characters</p>';
          const uppercaseScore = 0
        }

        if (hasSpecialChar) {
          document.querySelector('#specialchar').innerHTML = '<p id="length" style="color:green;">Password has special characters.</p>';
          const specialCharScore = 1    
        }
        else{
          document.querySelector('#specialchar').innerHTML = '<p id="length" style="color:red;">Password needs to have special characters (e.g. !@#$%^&*()_...) </p>';
          const specialCharScore = 0    
        }

        if (hasNumber) {
          document.querySelector('#number').innerHTML = '<p id="length" style="color:green;">Password has numerical values.</p>';
          const numberScore = 1
        }
        else{
          document.querySelector('#number').innerHTML = '<p id="length" style="color:red;">Password needs to have numerical values.</p>';
          const numberScore = 0  
      }
      

      }
      

      

        // Calculate the penalty based on sequential patterns
        const penalty = 
            (sequentialNumbers.test(password) ? 1 : 0) +
            (sequentialLowercase.test(password) ? 1 : 0) +
            (sequentialUppercase.test(password) ? 1 : 0);

        // Calculate the final score with penalties
        score = (
            lengthScore * lengthWeight +
            lowercaseScore * lowercaseWeight +
            uppercaseScore * uppercaseWeight +
            specialCharScore * specialCharWeight +
            numberScore * numberWeight
        ) * maxScore - penalty * penaltyWeight;
    }

    // Ensure score is within range
    score = Math.max(score, 0);
  
      // Update the overall score label
      const scoreLabel = document.getElementById('pwlength-label');
      scoreLabel.textContent = Math.round(score);
  
      return score;  
  }

  // pwned
  const checkPasswordInDataBreaches = async (pw) => {
    const shaObj = new jsSHA("SHA-1", "TEXT");
    shaObj.update(pw);
    const passhash = shaObj.getHash("HEX");
  
    console.log("pass hash: " + passhash);
  
    const link = `https://api.pwnedpasswords.com/range/` + passhash.slice(0, 5);
  
    try {
      const response = await axios.get(link);
      const hashes = {};
      const rows = response.data.split('\n');
  
      for (const row of rows) {
        const [hash, count] = row.split(':');
        hashes[hash] = count;
      }
  
      const hashsuffix = passhash.slice(5, 40).toUpperCase();
      const found = hashes[hashsuffix];
  
      if (found) {
        pwnedCard.querySelector('.card-title').textContent = 'Password in Data Breaches';
        pwnedCard.querySelector('.card-text').textContent = `Your password has appeared ${found} times in data breaches before!`;
        console.log(`Your password has appeared ${found} times in data breaches before!`);
      } else {
        pwnedCard.querySelector('.card-title').textContent = 'No Data Breach Found';
        pwnedCard.querySelector('.card-text').textContent = 'Your password has not appeared in data breaches before!';
      }
    } catch (error) {
      console.error("Error fetching data from Have I Been Pwned API:", error.message);
    }
  };
  

// ZXCVBN
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


  