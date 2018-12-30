var norted = null; // ID associated to choosen character
// 0 = not norted, 1 = norted, 2 = master xehanort

/**
 * Check if are already randomed and restore from storage
 */
function init() {
    norted = loadStatus('norted');

    if (norted === null || norted === "null") {
        norted = generateNorted();
        saveStatus('norted', norted);
    }
}

/**buttonCheckIfNorted()
 * Generate if norted or not
 * @returns boolean True if norted
 */
function generateNorted() {
    return Math.floor(Math.random() * Math.floor(2)).toString();
}

/**
 * Button that reveal if norted or not
 */
function buttonCheckIfNorted() {
    // Show loder
    toogleLoader(true);

    // Hide the button
    document.getElementById("resultButton").style.display = 'none';

    // Wait for a time to simulate checking
    setTimeout(function() {
        // Hide the loader
        toogleLoader(false);

        // If resutl still closed, load all
        if (document.getElementById("resultContainer").style.display === 'block') return;
        
        var result;
        switch (norted) {
            case '0':
                result = 'Sorry, <b>you are not</b> Xehanort.';
                break;
    
            case '1': // Xehanort
                result = 'Congratulations, <b>you are</b> Xehanort.';
                break;
    
            case '2': // Master Xehanort (konami code)
                result = 'Oh, sorry, i did not realaize that you are the <b>true Master Xehanort</b>.';
                break;
        }
    
        document.getElementById("result").innerHTML = result;
    
        // Show the result
        document.getElementById("resultContainer").style.display = 'block';
    }, 1500);
}

/**
 * Willl show or hide the loader
 * @param {boolean} newStatus 
 */
function toogleLoader(newStatus) {
    document.getElementById("loading").style.display = (newStatus) ? 'block' : 'none';
}

/**
 * Will hide all result-related
 */
function resetResult() {
    document.getElementById("resultButton").style.display = '';
    document.getElementById("resultContainer").style.display = 'none';
}

/**
 * Restart the app and result
 */
function buttonRestart() {
    norted = null;
    saveStatus('norted', null);
    init();
    resetResult();
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

/**
 * Initialize the konami code
 */
function initKonamiCode() {
    new Konami(function() {
        if (norted === 2) return;
        resetResult();
        norted = '2';
        saveStatus('norted', norted);
        buttonCheckIfNorted();
    });
}

// Initialize the app
init();
initKonamiCode();
// buttonCheckIfNorted();