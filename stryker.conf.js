// This config was generated using a preset.
// Please see the handbook for more information: https://github.com/stryker-mutator/stryker-handbook/blob/master/stryker/guides/angular.md#angular
module.exports = function(config) {
  config.set({
    mutate: [
      "src/app/repository.list/*.ts",
      "!src/app/repository.list/*.spec.ts"
    ],
    mutator: {
      name: "typescript",
      excludedMutations: []
      //excludedMutations: ["Block"], // You can exclude some mutations if you wish to
    },
    testRunner: "karma",
    karma: {
      configFile: "src/karma.conf.js",
      projectType: "angular-cli",
      config: {
        browsers: ["ChromeHeadless"]
      }
    },
    reporters: ["progress", "clear-text", "html"],
    maxConcurrentTestRunners: 1, // Recommended to use about half of your available cores when running stryker with angular.
    coverageAnalysis: "off"
  });
};