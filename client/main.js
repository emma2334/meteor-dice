import '../imports/ui/dice.js';

Template.dice.rendered = function() {
  var canvas = this.$('canvas')[0];
  var set = { value: 'd6' };

  $t.dice.use_true_random = false;

  var box = new $t.dice.dice_box(canvas, { w: 500, h: 300 });
  box.animate_selector = false;

  box.clear();

  function before_roll(vectors, notation, callback) {
    callback();
  }

  function notation_getter() {
      return $t.dice.parse_notation(set.value);
  }

  function after_roll(notation, result) {
    var res = result.join(' ');
    if (notation.constant) res += ' +' + notation.constant;
    if (result.length > 1) res += ' = ' +
            (result.reduce(function(s, a) { return s + a; }) + notation.constant);
  }

  box.bind_mouse(canvas, notation_getter, before_roll, after_roll);
  box.bind_throw(canvas, notation_getter, before_roll, after_roll);
}
