# Key Rotation Cipher

## A rotating Vigenere cipher, interacting with the html elements, and collecting user inputs from a series of validated prompts

### Deployment / Code Repository

[Live deployment](https://tweetingcynical.github.io/key-rotation-cipher/)

[Repository](https://github.com/TweetingCynical/key-rotation-cipher)

### Scope and Purpose

Build an encryption tool that allows a user to input a message and a private key, and then run it through a rotating Caeser cipher / Vigenere cipher, and repeat the process n times, resulting in an output that cannot be as easily brute force decoded as a standard Caesar cipher. The Vigenere complexity will be further increased by using a choice of sets of randomised sequences of the initial character list.

### Usage

This site and its codeset are for educational purposes only.

### Installation

N/A

### Pseudocode

Steps to achieving the working generator:

* Declare variables;
* Alerts, prompts, confirms to capture:
  - charList choice (charListChoice);
  - user message (userInput);
  - user key (userKey);
  - iteration index (iterationIndex);
* Validate capture options;
* Get indexOf each character from charList. in user message;
* Get indexOf each character from charList in user key;
* Create loop to iterate through user message using Vigenere shift for each character using the following algorithm:

  ```
  To encrypt:
  - Y = new character
  - X = original character
  - Z = key character
  - indexOf(Y) = (indexOf(X) + indexOf(Z)) % charList.choice.length
  - Convert indexOf Y to charList.choice value
  - Add new character Y to string;

  To decrypt:
  - Y = new character
  - X = original character
  - Z = key character
  - indexOf(Y) = (indexOf(X) - indexOf(Z)) % charList.choice.length
  - Convert indexOf Y to charList.choice value
  - Add new character to string;
  ```

* Feed newly created string into the same forloop, using the same key, and repeat n times (iterationIndex);
* Display result (userOutput) in html.


### Overview of Build

Some of the key JavaScript skills being utilised:

* Use of an object of arrays, each with a randomised order for the charList;
* Use of a generic structure for functions which can be reused for other like purposes:
  
  ```javascript
  function getOptions(selector) {
    return document.querySelector(selector).value;
  }
  ```

* More advanced mathematical logic using modulo and using multiply by 1 and -1 to switch the operator:

  ```javascript
  function toCoded(indexOfInput, indexOfKey, encrypt) {
    const operator = encrypt === "encrypt" ? 1 : -1;
    indexCoded = indexOfInput.map(
      (value, index) => value + operator * indexOfKey[index % indexOfKey.length]
    );
    return;
  }
  ```

* Use of querySelector to link HTML elements to JS functions, and actions on both style and attributes:

  ```javascript
  function displayShowPass() {
    showPass.style.visibility = "hidden";
    hidePass.style.visibility = "visible";
    document.querySelector("#userKey").type = "text";
  }
  ```

* Exit function if error conditions exist:

  ```javascript
  const inputError = displayErrMsg(userInput, "#userInputError", charListChoice);
  const keyError = displayErrMsg(userKey, "#userKeyError", charListChoice);
  // If there are no errors, complete cipher
  if (!inputError && !keyError) {
    iteration(charListChoice, encrypt, userInput, userKey, iterationIndex);
    updateUser(finalResult);
  } else {
    return;
  }
  ```

* Calling functions with passed arguments inside for loops for iterationIndex:

  ```javascript
  for (let iterationCount = 0; iterationCount < iterationIndex; iterationCount++) {
    getIndexOf(indexOfInput, userInput, charListChoice);
    getIndexOf(indexOfKey, userKey, charListChoice);
    toCoded(indexOfInput, indexOfKey, encrypt);
    modIndexCoded(indexCoded, charListChoice);
    convertCoded(modedIndexCoded, charListChoice);
    convertArray(codedArray);
    userInput = userOutput;
    reset();
    finalResult = userOutput;
    userOutput = "";
  }
  ```

## Suggested future changes

- ✅ ~~Use on page html elements instead of alerts, prompts and confirms for user choices and validation;~~
- ✅ ~~Add show/hide private key option button;~~
- Add function to automatically copy the contents of the cipher-output to the clipboard, and remove the default options on the page as soon as a valid cipher output has been created.

## Screenshot

Working version of site should look like this at standard screen size:
![Site Screenshot](./assets/screenshot.png)

## License

Copyright (c) 2023. All rights reserved.