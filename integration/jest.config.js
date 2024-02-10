module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*.test.js$',
  setupFilesAfterEnv: ['./setupTests.js']
};

// todolists
// http://localhost:9009/iframe.html?viewMode=story&id=todolists-todolists--todolists-story&args=
// app
// http://localhost:9009/iframe.html?viewMode=story&id=app--app-story&args=
// edit item
// http://localhost:9009/iframe.html?viewMode=story&id=todolists-edititemfield--edit-item-field-story&args=
// tasks
// http://localhost:9009/iframe.html?viewMode=story&id=todolists-tasks--tasks-story&args=
// task
// http://localhost:9009/iframe.html?viewMode=story&id=todolists-task--task-story&args=
