const posts = require('./posts.json')
const fs = require('fs')
let counts = {};
for (const post of posts) {
    if (post.message && post.message.length > 50) {
        let contributor = post.from.name
        if (post.comments && post.comments.data.length) {
            for (const comment of post.comments.data) {
                if (comment.message.length > 50) {
                    let contributor_commenter_name = comment.from.name
                    if (counts[contributor_commenter_name]) {
                        counts[contributor_commenter_name] = counts[contributor_commenter_name] + 1
                    } else {
                        counts[contributor_commenter_name] = 1
                    }
                }
            }
        } else {
            if (counts[contributor]) {
                counts[contributor] = counts[contributor] + 1
            } else {
                counts[contributor] = 1
            }
        }
    }
}

const res = [];
for (let c in counts) {
    res.push({contibutor: c, contibutions: counts[c]})
}

const print = res.sort((a, b) => b.contibutions - a.contibutions)

fs.writeFile('top-contributors.json', JSON.stringify(print, null, 4), 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('done');
})
