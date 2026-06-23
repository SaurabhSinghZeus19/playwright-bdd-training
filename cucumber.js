module.exports = {
    default: {
        require: ["step-definitions/**/*.ts"],
        requireModule: ["ts-node/register"],
        format: [
            "progress",
            "json:reports/cucumber-report.json"
        ],
        paths: ["features/**/*.feature"]
    }
}