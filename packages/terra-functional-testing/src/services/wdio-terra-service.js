/* eslint-disable class-methods-use-this */
const expect = require('expect');
const { accessibility } = require('../commands/validates');
const { toBeAccessible } = require('../commands/expect');
const { getViewports, describeViewports, setViewport } = require('../commands/viewport-helpers');

const hideInputCaret = require('../commands/hide-input-caret');
const { element } = require('../commands/validates');

class TerraService {
  constructor(options = {}) {
    const theme = { theme: 'terra-default-theme' };
    this.serviceOptions = { ...theme, ...options };
  }

  /**
   * Service hook executed prior to test execution.
   * Initializes the Terra Service's custom commands.
   */
  before(capabilities) {
    this.serviceOptions = { ...this.serviceOptions, ...global.browser.config.serviceOptions };

    // Set Jest's expect module as the global assertion framework.
    global.expect = expect;
    global.expect.extend({ toBeAccessible });

    // Add a Terra global with access to Mocha-Chai test helpers.
    global.Terra = {
      // validates provides access to the jest assertions to use in an it blocks.
      validates: {
        accessibility,
        element,
      },

      // Provides access to Terra's list of supported testing viewports.
      viewports: getViewports,

      // Provides a custom describe block for looping test viewports.
      describeViewports,

      // Hides the blinking input caret that appears in inputs or editable text areas.
      hideInputCaret,

      serviceOptions: this.serviceOptions,

      axe: {
        /**
         * Global rule overrides.
         * Rules modified here will be applied globally for all tests.
         */
        rules: {
          /**
           * This rule was introduced in axe-core v3.3 and causes failures in many Terra components.
           * The solution to address this failure vary by component. It is being disabled until a solution is identified in the future.
           *
           * Reference: https://github.com/cerner/terra-framework/issues/991
           */
          'scrollable-region-focusable': { enabled: false },
          /**
           * The lowlight theme adheres to a non-default color contrast ratio and fails the default ratio check.
           * The color-contrast ratio check is disabled for lowlight theme testing.
           */
          'color-contrast': { enabled: this.serviceOptions.theme !== 'clinical-lowlight-theme' },
        },
      },
    };

    // IE driver takes longer to be ready for browser interactions.
    if (capabilities.browserName === 'internet explorer') {
      global.browser.$('body').waitForExist({
        timeout: global.browser.config.waitforTimeout,
        interval: 100,
      });
    }

    // Set the viewport size before the spec begins.
    setViewport(this.serviceOptions.formFactor);
  }

  afterCommand(commandName, _args, _result, error) {
    if ((commandName === 'refresh' || commandName === 'url') && !error) {
      try {
        // This is only meant as a convenience so failure is not particularly concerning.
        global.Terra.hideInputCaret('body');

        if (global.browser.$('[data-terra-test-loading]').isExisting()) {
          global.browser.$('[data-terra-test-content]').waitForExist({
            timeout: global.browser.config.waitforTimeout + 2000,
            interval: 100,
          });
        }
      } catch (err) {
        // Intentionally blank. If this fails we don't want to warn because the user can't fix the issue.
      }
    }
  }
}

module.exports = TerraService;
