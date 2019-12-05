#!/usr/bin/env node

const l = console.log
const args = processArgs(process.argv)

const { 0: command } = args

const {
    runTagCommand,
    runInitCommand,
    runDiffCommand,
    runStatusCommand,
    runCommitCommand,
    runBranchCommand,
    runCheckoutCommand,
    runMergeCommand,
    runPullCommand,
    runPushCommand,
    runAddCommand
} = require("./vcs-public-api")

function run(command) {
    switch (command) {
        case "init":
            return runInitCommand()
        case "add":
            return runAddCommand(args)
        case "tag":
            return runTagCommand(args)
        case "diff":
            return runDiffCommand(args)
        case "status":
            return runStatusCommand()
        case "commit":
            return runCommitCommand(args)
        case "branch":
            return runBranchCommand()
        case "checkout":
            return runCheckoutCommand()
        case "push":
            return runPushCommand()
        case "pull":
            return runPullCommand()
        case "merge":
            return runMergeCommand()
    }
}

function processArgs(args) {
    return args.slice(2, args.length)
}

run(command)