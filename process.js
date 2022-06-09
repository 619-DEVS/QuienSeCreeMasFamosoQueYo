require('tools-for-instagram');
const fs = require('fs');

var ig = '';

async function loadData(username) {
    if (fs.existsSync('./output/' + username + '-' + getCurrentDate() + '_followers.json')) {
        console.log('existe', username);
        return
    }

    if (fs.existsSync('./output/' + username + '-' + getCurrentDate() + '_following.json')) {

        console.log('existe', username);
        return
    }

    if(ig == ''){
        ig = await login();
    }

    let info = await getUserInfo(ig, username);


    await getFollowers(ig, username);
    setFileName('./output/' + username + '_followers.json', 'followers', username);

    await getFollowing(ig, username);
    setFileName('./output/' + username + '_following.json', 'following', username);

    console.log("\nProcess done!\n".green);
};

function getCurrentDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDay();
    var hours = date.getHours();

    return `${year}-${month}-${day}-${hours}`
}

function setFileName(file, type, username) {
    var name = `./output/${username}-${getCurrentDate()}_${type}.json`;
    fs.renameSync(file, name);
}

module.exports = { loadData, getCurrentDate }
