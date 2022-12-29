export const onCheckspecialCharacters = (pass) => {
  try {
    const specialcharactercheck = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    // console.log("pass.match(specialcharactercheck", pass.match(specialcharactercheck))

    if (pass.match(specialcharactercheck) == null) {
      return false;
    } else {
      return true;
    }
  } catch (exc) {
    return false;
  }
};

export const notonCheckspecialCharacters = (pass) => {
  let result = false;

  try {
    const specialcharactercheck = "'\"<>&% ";
    // console.log("pass.match(specialcharactercheck", pass.match(specialcharactercheck))

    let i = 0;

    while (i < pass.length) {
      let character = pass.charAt(i);
      //    console.log("specialcharactercheck.indexOf(character)>=0  ",specialcharactercheck.indexOf(character))
      if (specialcharactercheck.indexOf(character) >= 0) {
        result = true;
      }
      // console.log(" not contain");

      i++;
    }

    // if ((pass.match(specialcharactercheck) == null)) {
    //     return false
    // } else {
    //     return true
    // }
  } catch (exc) {
    return false;
  }
  return result;
};

export const notSameEmailId = (email, pass) => {
  let result = false;

  try {
    if (email != pass) {
      result = true;
    } else {
      return false;
    }

    // if ((pass.match(specialcharactercheck) == null)) {
    //     return false
    // } else {
    //     return true
    // }
  } catch (exc) {
    return false;
  }
  return result;
};

const isLower = (char) => /[a-z]/.test(char);
const isUpperCase = (char) => /[A-Z]/.test(char);

export const isNumeric = (strings) => {
  let result = false;

  try {
    var hasNumber = /\d/;
    result = hasNumber.test(strings); //true
  } catch (exc) {
    return false;
  }
  return result;
};

export const onCheckcapitalandSmall = (strings) => {
  let isCapital = false;
  let isSmall = false;
  try {
    // var strings = 'this iS a TeSt 523 Now!';
    let i = 0;
    let character = "";
    while (i <= strings.length) {
      character = strings.charAt(i);
      // if (!isNaN(character * 1)) {
      //     alert('character is numeric');
      // } else

      if (isUpperCase(character) == true) {
        // alert('upper case true');
        isCapital = true;
      }

      if (isLower(character) == true) {
        // alert('lower case true');
        isSmall = true;
      }

      i++;
    }

    // console.log("isLower(isSmall)", isSmall)
    // console.log("isLower(isCapital)", isCapital)
    if (isCapital == true && isSmall == true) {
      return true;
    } else {
      return false;
    }
  } catch (exc) {
    // console.log("onCheckcapitalandSmall ", exc)
    return false;
  }
};

