const fs = require('fs');
const fingerprints = JSON.parse(fs.readFileSync('./fingerprints.json'));

function setFingerprint(fingerprint) {
    fingerprints[fingerprint] = false;
    fs.writeFileSync('./fingerprints.json', JSON.stringify(fingerprints));

}

function getFingerprint(fingerprint) {
    return fingerprints[fingerprint];
}

function removeFingerprint(fingerprint) {
    if (fingerprints[fingerprint]) delete fingerprints[fingerprint];
    fs.writeFileSync('./fingerprints.json', JSON.stringify(fingerprints));
}



module.exports = {setFingerprint, getFingerprint, removeFingerprint}