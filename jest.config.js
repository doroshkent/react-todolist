module.exports = {
  transform: {
    '^.+\\.jsx?$': 'esbuild-jest',
    '^.+\\.tsx?$': 'esbuild-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(esbuild-jest|jest-transformer)/)'],
}
