const l = console.log
const fs = require("fs")
const path = require("path")
const { getCurrentBranch } = require("./utils")

function runAddCommand(args) {
    const stagePath = ".vcs" + path.sep + "stage"

    args = args.slice(1)

    const currentBranch = getCurrentBranch()

    // creating a branch would have added branch to STAGE
    const stageBuffer = fs.readFileSync(stagePath).toString()

    const stageJson = JSON.parse(stageBuffer)
    let currentBranchJson = stageJson[currentBranch]

    stageJson[currentBranch] = [...currentBranchJson, ...args]

    fs.writeFileSync(stagePath, JSON.stringify(stageJson))
}

module.exports = runAddCommand