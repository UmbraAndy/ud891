(function () {
  'use strict';

  // Define values for keycodes
  var VK_ENTER = 13;
  var VK_SPACE = 32;
  var VK_LEFT = 37;
  var VK_UP = 38;
  var VK_RIGHT = 39;
  var VK_DOWN = 40;

  // Helper function to convert NodeLists to Arrays
  function slice(nodes) {
    return Array.prototype.slice.call(nodes);
  }

  function RadioGroup(id) {
    //setup the radio group
    this.el = document.querySelector(id);

    //setup all  the available buttons
    this.buttons = slice(this.el.querySelectorAll('.radio'));

    //the initially selected button index
    this.focusedIdx = 0;

    //the initiall selected button element
    this.focusedButton = this.buttons[this.focusedIdx];

    //add event listener to the radio button group
    this.el.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  //handles the keydown even of the radion button group
  RadioGroup.prototype.handleKeyDown = function (e) {
    console.log("B4: ", this.focusedIdx);
    switch (e.keyCode) {

      case VK_UP:
      case VK_LEFT: {

        e.preventDefault();

        // This seems like a good place to do some stuff :)
        this.focusedIdx = this.focusedIdx - 1;
        if (this.focusedIdx < 0) {// we are cycling above the first element so move to the last
          this.focusedIdx = this.buttons.length - 1;
        }
        break;

      }

      case VK_DOWN:
      case VK_RIGHT: {

        e.preventDefault();

        // This seems like a good place to do some stuff :)
        this.focusedIdx = this.focusedIdx + 1;
        if (this.focusedIdx > this.buttons.length-1) {// we are cycling below the last element so move to the first
          this.focusedIdx = 0
        }
        break;
      }

    }
    console.log("After: ", this.focusedIdx);
    this.changeFocus(this.focusedIdx); // <-- Hmm, interesting...
  };

  RadioGroup.prototype.changeFocus = function (idx) {
    // Set the old button to tabindex -1
    this.focusedButton.tabIndex = -1;
    this.focusedButton.removeAttribute('checked');

    // Set the new button to tabindex 0 and focus it
    this.focusedButton = this.buttons[idx];
    this.focusedButton.tabIndex = 0;
    this.focusedButton.focus();
    this.focusedButton.setAttribute('checked', 'checked');
  };

  var group1 = new RadioGroup('#group1');

}());
