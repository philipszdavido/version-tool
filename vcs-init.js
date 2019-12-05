const fs = require("fs")
const path = require("path")
const std = process.stdout
const { HEAD, BRANCHES, VCS, STAGE } = require("./constants")

function runInitCommand() {
    if (fs.existsSync(VCS))
        return console.error("vcs already initialized.")

    std.write("initializing vcs")
    fs.mkdirSync(VCS)
    const vcsPath = VCS + path.sep

    // write HEAD
    fs.writeFileSync(vcsPath + HEAD,
        `{
            "current":"master"
        }`)

    // write stage
    fs.writeFileSync(vcsPath + STAGE,
        `
        {
            "master": []
        }
        `)

    // write master branch
    fs.mkdirSync(vcsPath + "master")
    fs.writeFileSync(vcsPath + "master" + path.sep + "master",
        `
        {
            "commit": [],
            "next": "",
            "prev": "",
            "message": "",
            "tag": ""
        }
        `)

    // write BRANCHES
    fs.writeFileSync(vcsPath + BRANCHES,
        `{
            "master": {
                "commit": ""
            }
        }`)
    std.write("vcs initialized.")
}

module.exports = runInitCommand