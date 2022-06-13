const fs = require('fs');
const fingerprints = JSON.parse(fs.readFileSync('./fingerprints.json'));

function setFingerprint(fingerprint) {
    fingerprints[fingerprint] = false;
    writeFile();
    return true;
}

function getFingerprint(fingerprint) {
    return fingerprints[fingerprint];
}

function removeFingerprint(fingerprint) {
    if (fingerprints[fingerprint]) delete fingerprints[fingerprint];
    writeFile();
    return true;
}

function changeFingerprint(fingerprint, value) {
    fingerprints[fingerprint] = value;
    writeFile();
    return true;
}

function writeFile(){
    fs.writeFileSync('./fingerprints.json', JSON.stringify(fingerprints));
}



module.exports = {setFingerprint, getFingerprint, removeFingerprint, changeFingerprint}