const inquirer = require('inquirer');
const log = require('npmlog');
const spawn = require('@npmcli/promise-spawn');
const updateChangelogForPackage = require('./updateChangelogForPackage');

const promptForVersionType = async () => {
  // Pause the npm logger while we prompt for the type of release we want to perform
  log.pause();
  const { versionType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'versionType',
      message: 'What type of release do you want to version for?',
      choices: ['major', 'minor', 'patch'],
      pageSize: 3,
    },
  ]);
  log.resume();
  return versionType;
};

module.exports = async () => {
  // Determine the version type
  const versionType = await promptForVersionType();
  // Run npm version to update package.json with respect to the requested version type
  await spawn('npm', ['--no-git-tag-version', 'version', versionType], { stdioString: true });
  // Update the changelog for the current package
  await updateChangelogForPackage(process.cwd());
};
