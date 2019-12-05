const l = console.log
const fs = require("fs")
const path = require("path")

/**
 * 
 * @param {*} args 
 * Gives the current commit a name
 */

function runTagCommand(args) {
    if (!fs.existsSync(".vcs"))
        return console.error("vcs environment not initialized.\nrun 'vcs init'")
    const { 1: fileName, 2: versionNumber } = args
    const { branchName, branchFolderName } = mkBranch()
    const fileContents = fs.readFileSync(fileName)
    const str = `
    {
        name: "${fileName}",
        version: "${versionNumber}",
        contents: "${fileContents}"
    }
    `
    fs.writeFileSync(branchFolderName, str)
    const buffer = fs.readFileSync(".vcs" + path.sep + "registry.json")
    let bufferJSON = JSON.parse(buffer)
    bufferJSON[branchName] = {
        file: fileName
    }
    fs.writeFileSync(".vcs" + path.sep + "registry.json", JSON.stringify(bufferJSON))
}

function createBranchName() {
    return Date.now()
}

function mkBranch() {
    const name = createBranchName()
    const folderName = ".vcs/" + name
    fs.mkdirSync(folderName)
    fs.writeFileSync(folderName + path.sep + name)
    return { branchName: name, branchFolderName: folderName + path.sep + name }
}

module.exports = runTagCommand