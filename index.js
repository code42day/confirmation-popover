
/**
 * Module dependencies.
 */

const Popover = require('@pirxpilot/popover');

/**
 * Initialize a `ConfirmationPopover` with the given `msg`
 * and optional `title`.
 *
 * @param {Mixed} msg
 * @param {Mixed} title
 * @api public
 */

const template = `
<div class="confirmation-popover-content">
  <div class="confirmation-popover-message"></div>
  <div class="confirmation-popover-actions">
    <button class="cancel">Cancel</button>
    <button class="ok main">Ok</button>
  </div>
</div>
`;

class ConfirmationPopover extends Popover {
  constructor(msg, title) {
    super(template, title);
    this.classname = 'popover confirmation-popover';
    this.events.bind('click');
    this.confirmation(msg);
  }

  /**
   * Handle click.
   *
   */

  click(e) {
    const cl = e.target.classList;
    if (cl.contains('ok')) {
      this.onok(e);
    } else if (cl.contains('cancel')) {
      this.oncancel(e);
    }
  }

  /**
   * Handle cancel click.
   *
   * Emits "cancel".
   *
   * @param {Event} e
   * @api private
   */

  oncancel(e) {
    e.preventDefault();
    this.emit('cancel');
    this.callback(false);
    this.hide();
  }

  /**
   * Handle ok click.
   *
   * Emits "ok".
   *
   * @param {Event} e
   * @api private
   */

  onok(e) {
    e.preventDefault();
    this.emit('ok');
    this.callback(true);
    this.hide();
  }

  /**
   * Set confirmation `msg`.
   *
   * @param {String} msg
   * @return {ConfirmationPopover}
   * @api public
   */

  confirmation(msg) {
    const el = this.el.querySelector('.confirmation-popover-message');
    if (typeof msg === 'string') el.innerHTML = msg;
    else el.appendChild(msg);
    return this;
  }

  /**
   * Focus `type`, either "ok" or "cancel".
   *
   * @param {String} type
   * @return {ConfirmationPopover}
   * @api public
   */

  focus(type) {
    this._focus = type;
    return this;
  }

  /**
   * Change "cancel" button `text`.
   *
   * @param {String} text
   * @return {ConfirmationPopover}
   * @api public
   */

  cancel(text) {
    this.el.querySelector('.cancel').innerHTML = text;
    return this;
  }

  /**
   * Change "ok" button `text`.
   *
   * @param {String} text
   * @return {ConfirmationPopover}
   * @api public
   */

  ok(text) {
    this.el.querySelector('.ok').innerHTML = text;
    return this;
  }

  /**
   * Show the tip attached to `el` and invoke `fn(ok)`.
   *
   * @param {jQuery|Element} el
   * @param {Function} fn
   * @return {ConfirmationPopover}
   * @api public
   */

  show(el, fn = () => {}) {
    super.show(el);
    if (this._focus) this.el.querySelector(`.${this._focus}`).focus();
    this.callback = fn;
    return this;
  }
}

/**
 * Expose `ConfirmationPopover`.
 */

module.exports = ConfirmationPopover;
