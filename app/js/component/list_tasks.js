define(function (require) {
  "use strict";
  var defineComponent = require('flight/lib/component');
  return defineComponent(listTasks);

  function listTasks() {

    this.defaultAttrs({
      taskListSelector: 'ul.tasks',
      submitSelector: '.js-add-task-submit'
    });

    this.appendTask = function(task) {
      this.select('taskListSelector').append(
        "<li class='task'>" + task.description + "</li>"
      );
    };

    this.handleDataTasks = function(e, data) {
      data.tasks.map(function(task) {
        this.appendTask(task);
      }, this);
    };

    this.handleDataTaskAdded = function(e, data) {
      this.appendTask(data.task);
    };

    this.after('initialize', function () {
      this.on('dataTasks', this.handleDataTasks);
      this.on('dataTaskAdded', this.handleDataTaskAdded);
      this.trigger('uiNeedsTasks');
    });
  }
});
