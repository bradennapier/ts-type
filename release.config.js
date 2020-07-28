module.exports = {
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
      },
    ],
    // creates CHANGELOG.md
    '@semantic-release/changelog',
    [
      '@google/semantic-release-replace-plugin',
      {
        replacements: [
          {
            files: ['README.md'],
            from: '@__VERSION__',
            // eslint-disable-next-line no-template-curly-in-string
            to: '@${nextRelease.gitTag}',

            countMatches: true,
          },
        ],
      },
    ],
    '@semantic-release/npm',
    [
      // commits the changed files to git
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md', 'README.md'],
      },
    ],
    // creates the github release
    '@semantic-release/github',
  ],
};
