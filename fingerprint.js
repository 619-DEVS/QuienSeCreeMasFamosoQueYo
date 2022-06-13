const fs = require('fs');
const fingerprints = JSON.parse(fs.readFileSync('./fingerprints.json'));

function setFingerprint(fingerprint) {
    fingerprints[fingerprint] = false;
    fs.writeFileSync('./fingerprints.json', JSON.stringify(fingerprints));
    return true;
}

function getFingerprint(fingerprint) {
    return fingerprints[fingerprint];
}

function removeFingerprint(fingerprint) {
    if (fingerprints[fingerprint]) delete fingerprints[fingerprint];
    fs.writeFileSync('./fingerprints.json', JSON.stringify(fingerprints));
    return true;
}

function changeFingerprint(fingerprint, value) {
    fingerprints[fingerprint] = value
    return true;
}



module.exports = {setFingerprint, getFingerprint, removeFingerprint, changeFingerprint}