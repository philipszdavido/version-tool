const { HEAD, VCS } = require("./constants")
const fs = require("fs")
const path = require("path")
const l = console.log

function getPathToVcsFolder(file) {
    return ".vcs" + path.sep + file
}

/**
 * gets the current branch
 *
 */
function getCurrentBranch() {
    const HEADBuffer = fs.readFileSync(VCS + path.sep + HEAD).toString()
    const HEADJson = JSON.parse(HEADBuffer)
    return HEADJson.current
}

/**
 * 
 * @param {*} branch 
 * @return {*} Array
 * @desc gets the staged files in a branch
 */
function getStagedFilesInBranch(branch) {
    const pathBranc = ".vcs" + path.sep + "stage"
    const branchesJson = JSON.parse(fs.readFileSync(pathBranc))
    return branchesJson[branch]
}

// get contents in 'branches' files
function getAllBranches() {
    const pathToBranches = getPathToVcsFolder("branches")
    const branchesFile = fs.readFileSync(pathToBranches)
    return JSON.parse(branchesFile)
}

/**
 * get a branch
 */
function getBranch(branch) {
    const pathToBranches = getPathToVcsFolder("branches")
    const branchesJson = JSON.parse(fs.readFileSync(pathToBranches))
    return branchesJson[branch]
}

/**
 * update current commit on branch
 */

function updateCommitOnBranch(branch, commitName) {
    const pathToBranches = getPathToVcsFolder("branches")
    const branchesJson = JSON.parse(fs.readFileSync(pathToBranches))

    const branchCnt = branchesJson[branch]
    branchesJson[branch] = {
        ...branchCnt,
        commit: commitName
    }
    fs.writeFileSync(pathToBranches, JSON.stringify(branchesJson))
}

exports.getCurrentBranch = getCurrentBranch
exports.getAllBranches = getAllBranches
exports.getStagedFilesInBranch = getStagedFilesInBranch
exports.getPathToVcsFolder = getPathToVcsFolder
exports.getBranch = getBranch
exports.updateCommitOnBranch = updateCommitOnBranch