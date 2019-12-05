const l = console.log
const fs = require("fs")
const path = require("path")
const {
    getAllBranches,
    getCurrentBranch,
    getPathToVcsFolder,
    getStagedFilesInBranch,
    getBranch,
    updateCommitOnBranch
} = require("./utils")

function runCommitCommand(args) {
    const vcsFolder = ".vcs" + path.sep
        // check if there is something to commit i.e the files have changed
    args = args.slice(1)
    l(args)

    // get commit name
    const commitName = createCommitName()

    // create commit folder and file
    fs.mkdirSync(vcsFolder + commitName)
    fs.writeFileSync(vcsFolder + commitName + path.sep + commitName)

    // get file contents of staged files
    const currBranch = getCurrentBranch()
    const stagedFiles = getStagedFilesInBranch(currBranch)
    const currBranchContents = getBranch(currBranch)
    const fileContents = []

    for (const stagedFile of stagedFiles) {
        const cnt = fs.readFileSync(stagedFile)
        fileContents.push({
            file: stagedFile,
            content: cnt
        })
    }

    const commit = {
        commit: fileContents,
        next: null,
        prev: currBranchContents.commit,
        message: '',
        tag: null
    }
    updateCommitOnBranch(currBranch, commitName)
    fs.writeFileSync(vcsFolder + commitName + path.sep + commitName, JSON.stringify(commit))
}

function createCommitName() {
    return Date.now()
}

module.exports = runCommitCommand