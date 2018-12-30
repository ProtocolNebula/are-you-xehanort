var norted = null;

/**
 * Check if are already randomed and restore from storage
 */
function init() {
    norted = loadStatus('norted');

    if (norted === null) {
        norted = generateNorted();
        saveStatus('norted', norted);
    }
}

/**buttonCheckIfNorted()
 * Generate if norted or not
 * @returns boolean True if norted
 */
function generateNorted() {
    return Math.floor(Math.random() * Math.floor(2)) === 1;
}

/**
 * Button that reveal if norted or not
 */
function buttonCheckIfNorted() {
    var result;
    if (norted) {
        result = 'Congratulations, <b>you are</b> Xehanort.';
    } else {
        result = 'Sorry, <b>you are not</b> Xehanort.';
    }
    document.getElementById("result").innerHTML = result;

    // Hide the button
    document.getElementById("resultButton").style.display = 'none';
}

/**
 * Read an element from local storage avoiding crash if not available
 * @param {string} name Element of the name
 */
function loadStatus(name) {
    try {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem(name);
        }
    } catch (e) {}

    return null;
}

/**
 * Save in local storage but avoiding crash if not available
 * @param {string} name Name of element in local storage
 * @param {*} data Data to save
 */
function saveStatus(name, data) {
    try {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(name, data);
        }
    } catch (e) {}
}


// Initialize the app
init();
// buttonCheckIfNorted();