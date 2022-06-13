require('tools-for-instagram');
const fs = require('fs');

var ig = '';

async function loadData(username) {
    if (fs.existsSync('./output/' + username + '-' + getCurrentDate() + '_followers.json')) {
        return
    }

    if (fs.existsSync('./output/' + username + '-' + getCurrentDate() + '_following.json')) {
        return
    }

    if (ig == '') {
        ig = await login();
    }

    try {
        await getUserInfo(ig, username);
    } catch (error) {
        return { status: 'error', name: 'UserNotFound' }
    }

    try {
        await getFollowers(ig, username);
    } catch (error) {
        return { status: 'error', name: 'CantGetFollows' }
    }

    try {
        await getFollowing(ig, username);
    } catch (error) {
        return { status: 'error', name: 'CantGetFollowing' }
    }

    setFileName('followers', username);
    setFileName('following', username);

};

function getCurrentDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDay();
    var hours = date.getHours();

    return `${year}-${month}-${day}-${hours}`
}

function setFileName(type, username) {
    var file = `./output/${username}_${type}.json`;
    var name = `./output/${username}-${getCurrentDate()}_${type}.json`;
    fs.renameSync(file, name);
}

module.exports = { loadData, getCurrentDate }
