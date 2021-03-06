var norted = null; // ID associated to choosen character
// 0 = not norted, 1 = norted, 2 = master xehanort

/**
 * Check if are already randomed and restore from storage
 */
function init() {
    generateShareButtons(); // Generate default twitter button
    norted = loadStatus('norted');

    if (norted !== null && norted !== "null") {
        buttonCheckIfNorted(100);
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
function buttonCheckIfNorted(miliseconds) {
    if (miliseconds === undefined) miliseconds = 1300;
    
    if (norted === null || norted === "null") {
        norted = generateNorted();
        saveStatus('norted', norted);
    }

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
                result = 'Congratulations, you are not Xehanort yet.<br />'+
                    'But don\'t worry, darkness will soon overtake you so you can bask in its glory.';
                break;
    
            case '1': // Xehanort
                result = 'Sorry, you already <b>are Xehanort</b>.<br />'+
                'But that was inevitable, wasn\'t it? After all, everybody will sooner or later be taken over by darkness. Why wait?';
                break;
    
            case '2': // Master Xehanort (konami code)
                result = 'Sorry, I didn\'t realize that you were the <b>true Master Xehanort</b>.';
                break;
        }
    
        document.getElementById("result").innerHTML = result;
        generateShareButtons();
    
        // Show the result
        document.getElementById("resultContainer").style.display = 'block';
    }, miliseconds);
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

function generateShareButtons() {
    twitterText = encodeURI(getShareText());

    result = `<a class="twitter-share-button" target="_blank"
        href="https://twitter.com/intent/tweet?text=`+twitterText+`">
            Tweet the darkness
        </a>`;

    document.getElementById('shareTwitterButton').innerHTML = result;
}

function getShareText() {
    var result = '';
    switch (norted) {
        case '0':
            result = 'I\'m not Xehanort. And you? ';
            break;

        case '1': // Xehanort
            result = 'I\'m Xehanort. And you? ';
            break;

        case '2': // Master Xehanort (konami code)
            result = 'I\'m the true Master Xehanort. And you? ';
            break;

        default:
            result = 'Are you Xehanort?';
    }
    
    result += ' Check it in ' + siteUrl() + ' &num;AreYouXehanort &num;KingdomHearts';

    return result;
}

/**
 * Get the main URL to the site
 */
function siteUrl() {
    var getUrl = window.location;
    return getUrl .protocol + "//" + getUrl.host + "/";
}

// Initialize the app
init();
initKonamiCode();
// buttonCheckIfNorted();
