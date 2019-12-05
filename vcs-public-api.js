const runTagCommand = require("./vcs-tag")
const runInitCommand = require("./vcs-init")
const runStatusCommand = require("./vcs-status")
const runDiffCommand = require("./vcs-diff")
const runCommitCommand = require("./vcs-commit")
const runBranchCommand = require("./vcs-branch")
const runCheckoutCommand = require("./vcs-checkout")
const runMergeCommand = require("./vcs-merge")
const runPullCommand = require("./vcs-pull")
const runPushCommand = require("./vcs-push")
const runAddCommand = require("./vcs-add")


exports.runTagCommand = runTagCommand
exports.runInitCommand = runInitCommand
exports.runDiffCommand = runDiffCommand
exports.runStatusCommand = runStatusCommand
exports.runCommitCommand = runCommitCommand
exports.runBranchCommand = runBranchCommand
exports.runCheckoutCommand = runCheckoutCommand
exports.runMergeCommand = runMergeCommand
exports.runPullCommand = runPullCommand
exports.runPushCommand = runPushCommand
exports.runAddCommand = runAddCommand