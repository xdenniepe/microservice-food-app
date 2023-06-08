import moment from "moment-timezone";

/////////////////////////////
// setLocalStorageItem()
/////////////////////////////
export const setLocalStorageItem = (storageKey, state) => {
    localStorage.setItem(storageKey, JSON.stringify(state));
}

/////////////////////////////
// getLocalStorageItem()
/////////////////////////////
export const getLocalStorageItem = (storageKey) => {
    const savedState = localStorage.getItem(storageKey);
    try {
        if (!savedState) {
            return undefined;
        }
        return JSON.parse(savedState ?? '{}');
    } catch (e) {
        return undefined;
    }
}

/////////////////////////////
// getInputClasses()
/////////////////////////////
export const getInputClasses = (formik, fieldname) => {

    if (formik.touched[fieldname] && formik.errors[fieldname]) {
        return "focus:outline-none focus-within:border-red-500 border-red-500 is-invalid"
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
        return "focus:outline-none focus-within:border-gray-500 border-gray-500 is-valid"
    }

    return ""
};

/////////////////////////////
// getMaskedInputClasses()
/////////////////////////////
export const getMaskedInputClasses = (formik, fieldname) => {

    if (formik.touched[fieldname] && formik.errors[fieldname]) {
        return "focus:outline-none border-red-500 border-red-500 is-invalid"
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
        return "focus:outline-none border-gray-500 border-gray-500 is-valid"
    }

    return "border-gray-500"
};

/////////////////////////////
// displayError()
/////////////////////////////
export const displayError = (formik, fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
        return (formik.errors[fieldname])
    }

    return null
};

/////////////////////////////
// autoCapitalize()
/////////////////////////////
export const autoCapitalize = (content) => {
    const words = content.split(" ");
    return words.map((word) => {
        return word[0].toUpperCase() + word.substring(1).toLowerCase();
    }).join(" ");
}

/////////////////////////////
// shuffleArray()
/////////////////////////////
export const shuffleArray = (array) => {
    if (!array) {
        return [];
    }

    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

/////////////////////////////
// getSumOfArray()
/////////////////////////////
export const getSumOfArray = (array, decimal) => {
    if (!array) {
        return 0;
    }

    return array.reduce((a, b) => a + b, 0).toFixed(decimal);
}

/////////////////////////////
// format timestamp to PST()
/////////////////////////////
export const formatToPst = (unix) => {
    if(unix instanceof Date) return '';
     
    return moment.unix(unix).tz('America/Los_Angeles').format("DD MMM, hh:mm A");
}

export const formatToPstPDF = (unix) => {
    if(unix instanceof Date) return '';
     
    return moment.unix(unix).tz('America/Los_Angeles').format("MM/DD/YYYY, hh:mm A");
}

/////////////////////////////
// addLeadingZeros
/////////////////////////////
export const addLeadingZeros = (num, size) => {
    var numberString = num+"";
    while (numberString.length < size) numberString = "0" + numberString;
    return numberString;
}

/////////////////////////////
// remove special character in string
/////////////////////////////

export const LetterScharRemover = (wordToChange) => {
    return wordToChange.replace(/[^a-zA-Z ]/g, " ");
}


/////////////////////////////
// convert first letter to upper
/////////////////////////////

export const FirstLetterToUpper = (wordLetter) => {
    return wordLetter.replace(/\b(\w)/g, s => s.toUpperCase());
}

export const getDifferenceInDays = (date1, date2) => {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
}