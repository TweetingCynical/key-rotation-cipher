// Object of arrays of all characters to be included in cryptographic sequencing
const charList = {
  a: [
    'a','b','c','d','e','f','g','h','i','j','k','l','m',
    'n','o','p','q','r','s','t','u','v','w','x','y','z',
    '0','1','2','3','4','5','6','7','8','9','±','§',
    'A','B','C','D','E','F','G','H','I','J','K','L','M',
    'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    '@','%','+','/',"'",'!','#','$','^','?',':','£','€',
    ',',')','(','}','{',']','[','~','-','_','.',' '],
  b: [
    '-','+','q','H','D','a','[','e','T','J','7','Y','0',
    'v','o','u','~','1','l','N','k','@','B','n',"'",'€',
    '(','^','8','m','g','6','4','_','s','R','5','P','Z',
    'W','.','/','r','V','c','%','G','S','O','y','{','d',
    ',','w','j',')','b','!','?','X',']','3',' ','t','9',
    'Q','M','L','F','}','i','h','U','#','z','A',':','x',
    'f','E','p','§','K','C','2','$','I','£','±'],
  c: [
    'a',',','Z','y','/','I','6','v','(','J',']','R','A',
    'C','g','u','t','z','L','O',' ','.',')','N','o','D',
    'r','b','%','V','f','1','@','i','[','8','k','S','F',
    'x','e','q','P','Y','!',"'",'s','U','H','j','p','n',
    'B','0','M','}','-','7','h','^','T','3','_','Q','E',
    '#','?','m','c','$','{','2','l','W','+','d',':','K',
    'w','£','§','€','X','4','9','G','±','5','~'],
  d: [
    'C','4',']','}','t','1','s',',','l','!','a','6','T',
    '[','y','q','j','O','P','_',"'",'h','5','8',' ','±',
    'x','S','Q','o','r','J','.','z','V','H','d','X','I',
    '@','g','M','L','2','-','W','N','c','A','i','/','n',
    'b','G','f','F','D','B','u','0','Y','~','^','v','3',
    '$','K','+','R','#','w','k','E','7',')','%','?',':',
    '{','e','Z','£','€','p','9','(','U','m','§'],
  e: [
    'O','/','M','E','Q',' ','}','U',')','[','q','h','£',
    'P','X','m','9','F','^','_','L','B','0','k','6','z',
    'g',']','i','2','5','.','-','!','~','{',',','J','r',
    'y','t','o','K','7','V','W',"'",'T','R','(','%','s',
    'n','c','p','@','+','H','l','D','v','N','A','x','4',
    'j','1','f','I','u',':','8','d','a','3','Y','w','C',
    '§','e','?','G','€','#','$','Z','±','b','S']
}

const indexOfInput = [];
const indexOfKey = [];
let indexCoded = [];
let modedIndexCoded = [];
let codedArray = [];
let userOutput = '';

// Get's user options from html elements
function getOptions(selector) {
  return document.querySelector(selector).value;
}

// Check for errors in the userInput or userKey
function errMsg(inputType, selector, charListChoice) {
  // Check length is at least 10 characters
  chkLen = inputType.length;
  if (chkLen < 10) {
    charLenErr = "Must be at least 10 characters."
  } else {
    charLenErr = '';
  }

  // Create array of all characters that are used but not allowed
  let charErrArr = [];
  for(char = 0; char < chkLen; char++) {
    if (!charList[charListChoice].includes(inputType[char])) {
      charErrArr.push(inputType[char])
      console.log(charErrArr)
    }
  }
  
  // Check if array created above has any content
  let charErrStr = '';
  if (charErrArr.length > 0) {
    charErrStr = "The following characters are not allowed: " + charErrArr.join(' ');
    console.log(charErrStr)
  }
  else {
    charErrStr = '';
  }

  // Link to HTML element for displaying message
  let inputErrTxt = document.querySelector(selector)
  let errorMessageContent = charLenErr + " " + charErrStr;
  inputErrTxt.innerText = errorMessageContent;

  // Return true if errorMessageContent has content
  if (errorMessageContent.length > 2) {
    return true;
  }
  else {
    return false;
  }
}

// For each character in the string (from userInput or userKey)
// get the index of that same character, from the character set chosen
function getIndexOf(indexOpt, input, charListChoice) {
  for(i = 0; i < input.length; i++) {
    indexOpt.push(charList[charListChoice].indexOf(input[i]));
  }
  return;
}

// Caesar cipher on each userInput character, shifting by each userKey character
// resulting in a rotating shift cipher
function toCoded(indexOfInput,indexOfKey,encrypt) {
  const operator = (encrypt === "encrypt") ? 1:-1;
  indexCoded = indexOfInput.map((value, index) =>
    value + (operator * (indexOfKey[index % indexOfKey.length])));
  return;
}

// Modify the result of toCoded to account for any negative numbers which should restart at the beginning of the charList check 
function modIndexCoded(indexCoded,charListChoice) {
  modedIndexCoded = indexCoded.map((value) =>
    value < 0 ? (value + charList[charListChoice].length) % charList[charListChoice].length : value % charList[charListChoice].length);
    return;
}

// Use the value of each element in modedIndexCoded as the index reference in charList
// return the corresponding character value
function convertCoded(modedIndexCoded, charListChoice) {
  codedArray = modedIndexCoded.map(index => charList[charListChoice][index]);
  return;
}

// Convert the array into a string to output to the document
function convertArray(codedArray) {
  userOutput = codedArray.join('');
  return userOutput;
}

// Reset created arrays to a length of zero to allow for re running the cipher
function reset() {
  indexOfInput.length = 0;
  indexOfKey.length = 0;
  indexCoded.length = 0;
  modedIndexCoded.length = 0;
  codedArray.length = 0;
}

// THIS IS WHERE THE CODE BEGINS TO RUN
// Get references to the #cipher element
const cipherBtn = document.querySelector('#cipher');

// Pass userOutput to the cipher-output in the document
function updateUser() {
  let messageText = document.querySelector('#cipher-output');
  messageText.value = finalResult;
}

// Iterate through encryption process using the same key, feeding the userOutput after each pass back into function
function iteration(charListChoice, encrypt, userInput, userKey, iterationIndex) {
  for (iterate = 0; iterate < iterationIndex; iterate++) {
    getIndexOf(indexOfInput,userInput,charListChoice);
    getIndexOf(indexOfKey,userKey,charListChoice);
    toCoded(indexOfInput,indexOfKey,encrypt);
    modIndexCoded(indexCoded,charListChoice);
    convertCoded(modedIndexCoded,charListChoice);
    convertArray(codedArray);
    userInput = userOutput;
    reset();
    finalResult = userOutput;
    userOutput = '';
  }
  return finalResult;
}

// Full run sequence
function run() {
  const charListChoice = getOptions('#charListChoice');
  const encrypt = getOptions('#encryption');
  const iterationIndex = getOptions('#iterationIndex');
  let userInput = getOptions('#userInput');
  const userKey = getOptions('#userKey');
  let inputError = errMsg(userInput, '#userInputError', charListChoice);
  let keyError = errMsg(userKey, '#userKeyError', charListChoice);
  if (!inputError && !keyError) {
    iteration(charListChoice, encrypt, userInput, userKey, iterationIndex)
    updateUser(finalResult);
  }
  else {
    return;
  }
}

// Add event listener to generate button
cipherBtn.addEventListener('click', run);