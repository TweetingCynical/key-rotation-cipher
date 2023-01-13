# Key Rotation Cipher

# Pseudocode for how generate encrypted or decrypted messages

Steps to achieving the working generator:

* Declare variables;
* Alerts, prompts and confirms to capture user choices:
  - charList choice (charListChoice);
  - user message (userInput);
  - user key (userKey);
  - iteration index (iterationIndex);
* Validate capture options;
* Get indexOf each character from charList. in user message;
* Get indexOf each character from charList in user key;
* Create loop to iterate through user message using caeser shift for each character using the following algorithm:

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