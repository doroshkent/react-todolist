module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*.test.js$',
  setupFilesAfterEnv: ['./setupTests.js']
};

// todolist
// http://localhost:9009/iframe.html?viewMode=story&id=todolists-todolist--todolist-story&args=
// todolists
// http://localhost:9009/iframe.html?viewMode=story&id=todolists-todolists--todolists-story&args=
// app
// http://localhost:9009/iframe.html?viewMode=story&id=app--app-story&args=
//add item
// http://localhost:9009/iframe.html?viewMode=story&id=todolists-additemform--add-item-form-story&args=
// edit item
// http://localhost:9009/iframe.html?viewMode=story&id=todolists-edititemfield--edit-item-field-story&args=
// tasks
// http://localhost:9009/iframe.html?viewMode=story&id=todolists-tasks--tasks-story&args=
// task
// http://localhost:9009/iframe.html?viewMode=story&id=todolists-task--task-story&args=
