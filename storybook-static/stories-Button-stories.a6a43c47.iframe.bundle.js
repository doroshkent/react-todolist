'use strict'
;(self.webpackChunkreact_todolist = self.webpackChunkreact_todolist || []).push([
  [416],
  {
    './src/stories/Button.stories.ts': (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Large: () => Large,
          Primary: () => Primary,
          Secondary: () => Secondary,
          Small: () => Small,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        })
      let __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Example/Button',
          component: __webpack_require__('./src/stories/Button.tsx').q,
          parameters: { layout: 'centered' },
          tags: ['autodocs'],
          argTypes: { backgroundColor: { control: 'color' } },
        },
        Primary = { args: { primary: !0, label: 'Button' } },
        Secondary = { args: { label: 'Button' } },
        Large = { args: { size: 'large', label: 'Button' } },
        Small = { args: { size: 'small', label: 'Button' } }
      ;(Primary.parameters = {
        ...Primary.parameters,
        docs: {
          ...Primary.parameters?.docs,
          source: {
            originalSource: "{\n  args: {\n    primary: true,\n    label: 'Button'\n  }\n}",
            ...Primary.parameters?.docs?.source,
          },
        },
      }),
        (Secondary.parameters = {
          ...Secondary.parameters,
          docs: {
            ...Secondary.parameters?.docs,
            source: {
              originalSource: "{\n  args: {\n    label: 'Button'\n  }\n}",
              ...Secondary.parameters?.docs?.source,
            },
          },
        }),
        (Large.parameters = {
          ...Large.parameters,
          docs: {
            ...Large.parameters?.docs,
            source: {
              originalSource: "{\n  args: {\n    size: 'large',\n    label: 'Button'\n  }\n}",
              ...Large.parameters?.docs?.source,
            },
          },
        }),
        (Small.parameters = {
          ...Small.parameters,
          docs: {
            ...Small.parameters?.docs,
            source: {
              originalSource: "{\n  args: {\n    size: 'small',\n    label: 'Button'\n  }\n}",
              ...Small.parameters?.docs?.source,
            },
          },
        })
      let __namedExportsOrder = ['Primary', 'Secondary', 'Large', 'Small']
    },
    './src/stories/Button.tsx': (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.d(__webpack_exports__, { q: () => Button }),
        __webpack_require__('./node_modules/react/index.js')
      var jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js')
      let Button = (_ref) => {
        let { primary = !1, size = 'medium', backgroundColor, label, ...props } = _ref
        return (0, jsx_runtime.jsx)('button', {
          type: 'button',
          className: [
            'storybook-button',
            'storybook-button--'.concat(size),
            primary ? 'storybook-button--primary' : 'storybook-button--secondary',
          ].join(' '),
          style: { backgroundColor },
          ...props,
          children: label,
        })
      }
      try {
        ;(Button.displayName = 'Button'),
          (Button.__docgenInfo = {
            description: 'Primary UI component for user interaction',
            displayName: 'Button',
            props: {
              primary: {
                defaultValue: { value: 'false' },
                description: 'Is this the principal call to action on the page?',
                name: 'primary',
                required: !1,
                type: { name: 'boolean' },
              },
              backgroundColor: {
                defaultValue: null,
                description: 'What background color to use',
                name: 'backgroundColor',
                required: !1,
                type: { name: 'string' },
              },
              size: {
                defaultValue: { value: 'medium' },
                description: 'How large should the button be?',
                name: 'size',
                required: !1,
                type: { name: 'enum', value: [{ value: '"small"' }, { value: '"medium"' }, { value: '"large"' }] },
              },
              label: {
                defaultValue: null,
                description: 'Button contents',
                name: 'label',
                required: !0,
                type: { name: 'string' },
              },
              onClick: {
                defaultValue: null,
                description: 'Optional click handler',
                name: 'onClick',
                required: !1,
                type: { name: '(() => void)' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/stories/Button.tsx#Button'] = {
              docgenInfo: Button.__docgenInfo,
              name: 'Button',
              path: 'src/stories/Button.tsx#Button',
            })
      } catch (__react_docgen_typescript_loader_error) {}
    },
    './node_modules/react/cjs/react-jsx-runtime.production.min.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      /**
       * @license React
       * react-jsx-runtime.production.min.js
       *
       * Copyright (c) Facebook, Inc. and its affiliates.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */ var f = __webpack_require__('./node_modules/react/index.js'),
        k = Symbol.for('react.element'),
        l = Symbol.for('react.fragment'),
        m = Object.prototype.hasOwnProperty,
        n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
        p = { key: !0, ref: !0, __self: !0, __source: !0 }
      function q(c, a, g) {
        var b,
          d = {},
          e = null,
          h = null
        for (b in (void 0 !== g && (e = '' + g),
        void 0 !== a.key && (e = '' + a.key),
        void 0 !== a.ref && (h = a.ref),
        a))
          m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b])
        if (c && c.defaultProps) for (b in (a = c.defaultProps)) void 0 === d[b] && (d[b] = a[b])
        return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current }
      }
      ;(exports.Fragment = l), (exports.jsx = q), (exports.jsxs = q)
    },
    './node_modules/react/jsx-runtime.js': (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = __webpack_require__('./node_modules/react/cjs/react-jsx-runtime.production.min.js')
    },
  },
])
//# sourceMappingURL=stories-Button-stories.a6a43c47.iframe.bundle.js.map
