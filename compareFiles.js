const fs = require('fs');
const { getCurrentDate } = require('./process');


function notFollowingMe(username) {
    var followers = JSON.parse(fs.readFileSync('./output/' + username + '-' + getCurrentDate() + '_followers.json'));
    var following = JSON.parse(fs.readFileSync('./output/' + username + '-' + getCurrentDate() + '_following.json'));
    
    if(followers.length === 1 && following.length === 1 ){
        return {status: 'error', name: 'PrivateProfileUser'}
    }

    return following.filter(el => {
        return !followers.find(follower => el.pk == follower.pk);
    });
}

function notFollowing(username) {
    var followers = JSON.parse(fs.readFileSync('./output/' + username + '-' + getCurrentDate() + '_followers.json'));
    var following = JSON.parse(fs.readFileSync('./output/' + username + '-' + getCurrentDate() + '_following.json'));
    
    if(followers.length === 1 && following.length === 1 ){
        return {status: 'error', name: 'PrivateProfileUser'}
    }

    return followers.filter(el => {
        return !following.find(follower => el.pk == follower.pk);
    });
}

module.exports = { notFollowing, notFollowingMe }