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

const charListOpt = ['a','b','c','d','e']
let charListChoiceS = document.querySelector('#charListChoice');
let userInputS = document.querySelector('#userInput');
let userKeyS = document.querySelector('#userKey');
let iterationIndexS = document.querySelector('#iterationIndex');
let charListChoice = charListChoiceS.value;
let userInput = userInputS.value;
let userKey = userKeyS.value;
let iterationIndex = iterationIndexS.value;
const indexOfInput = [];
const indexOfKey = [];
let indexCoded = [];
let modedIndexCoded = [];
let codedArray = [];
let userOutput = '';
let inputOk = true;
let tempInput;

function getCharListChoice() {
  charListChoice = charListChoiceS.value;
  return charListChoice;
}

function getInputs(inputType) {
  do {

  } while(inputType.length < 10 || inputType.length > 1000 || inputOk === false)
  return inputType;
}

// function getInput(inputType) {
//   // Keep asking for a password length until user chooses a number between 10 and 64 inclusive
//   do {
//     inputType = prompt(`Enter the message you would like to pass through the cipher. All keyboard characters are accepted except a backslash \\ and double quotation marks \" .`,tempInput);
//     tempInput = inputType;
//     if (inputType.length < 10 || inputType.length > 1000) {
//       alert('Your message must be at least 10 characters, and less than 1000 characters long.');
//     }
//     for(i = 0; i < inputType.length; i++) {
//       if (!charList[charListChoice].includes(inputType[i])) {
//         alert(`This character ${inputType[i]} is not allowed. Please remove it from your message.`);
//         inputOk = false;
//       }
//       else inputOk = true;
//     }
//   } while(inputType.length < 10 || inputType.length > 1000 || inputOk === false)
//   return inputType;
// }

function getIterationIndex() {
  iterationIndex = iterationIndexS.value;
  return iterationIndex;
}

function getIndexOf(indexOpt, input, charListChoice) {
  for(i = 0; i < input.length; i++) {
    indexOpt.push(charList[charListChoice].indexOf(input[i]));
  }
  return indexOpt;
}

function toCoded(indexOfInput,indexOfKey,encrypt) {
  const operator = (encrypt) ? 1 : -1;
  indexCoded = indexOfInput.map((value, index) => 
    value + operator * (indexOfKey[index % indexOfKey.length]));
  return indexCoded;
}

function modIndexCoded(indexCoded,charListChoice) {
  modedIndexCoded = indexCoded.map((value) =>
    value < 0 ? (value + charList[charListChoice].length) % charList[charListChoice].length : value % charList[charListChoice].length);
    return modedIndexCoded;
}

function convertCoded(modedIndexCoded, charListChoice) {
  codedArray = modedIndexCoded.map(index => charList[charListChoice][index]);
  return codedArray;
}

function convertArray(codedArray) {
  userOutput = codedArray.join('');
  return userOutput;
}

function run() {

}

