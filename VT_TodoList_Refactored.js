/* global VT */Add commentMore actions
window.VT = window.VT || {};

/**
 * Initializes a todo list component.
 * @param {HTMLElement} el - The root container for the todo list.
 */
VT.TodoList = function (el) {
  var state = {
  const state = {
    items: [],
  };

  el.innerHTML = [
    '<div class="items"></div>',
    '<div class="todo-item-input"></div>',
  ].join('\n');
  // Initial HTML template
  el.innerHTML = `
    <div class="items"></div>
    <div class="todo-item-input"></div>
  `;

  VT.AppSortable(el.querySelector('.items'), {});
  VT.TodoItemInput(el.querySelector('.todo-item-input'));
  const container = el.querySelector('.items');
  const inputContainer = el.querySelector('.todo-item-input');

  el.addEventListener('sortableDrop', function (e) {
  VT.AppSortable(container, {});
  VT.TodoItemInput(inputContainer);

  el.addEventListener('sortableDrop', (e) => {
    el.dispatchEvent(
      new CustomEvent('moveItem', {
        detail: {
@@ -26,46 +34,48 @@ VT.TodoList = function (el) {
    );
  });

  /**
   * Updates the list UI based on new state.
   * @param {{ items: Array }} next - The new state with task items.
   */
  function update(next) {
    Object.assign(state, next);

    var container = el.querySelector('.items');
    var obsolete = new Set(container.children);
    var childrenByKey = new Map();
    const existingItems = Array.from(container.children);
    const existingByKey = new Map();

    obsolete.forEach(function (child) {
      childrenByKey.set(child.dataset.key, child);
    existingItems.forEach((child) => {
      existingByKey.set(child.dataset.key, child);
    });

    var children = state.items.map(function (item) {
      var child = childrenByKey.get(item.id);
    const fragment = document.createDocumentFragment();

    state.items.forEach((item) => {
      let child = existingByKey.get(item.id);
      if (child) {
        obsolete.delete(child);
        existingByKey.delete(item.id); // Mark as used
      } else {
        child = document.createElement('div');
        child.classList.add('todo-item');
        child.className = 'todo-item';
        child.dataset.key = item.id;
        VT.TodoItem(child);
      }

      child.todoItem.update({ item: item });

      return child;
      child.todoItem.update({ item });
      fragment.appendChild(child);
    });

    obsolete.forEach(function (child) {
      container.removeChild(child);
    // Remove old nodes
    existingByKey.forEach((unusedChild) => {
      container.removeChild(unusedChild);
    });

    children.forEach(function (child, index) {
      if (child !== container.children[index]) {
        container.insertBefore(child, container.children[index]);
      }Add commentMore actions
    });
    // Clear and batch-insert updated nodes
    container.innerHTML = '';
    container.appendChild(fragment);
  }

  el.todoList = {
    update: update,
    update,
  };
};