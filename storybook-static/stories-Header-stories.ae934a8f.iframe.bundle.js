'use strict'
;(self.webpackChunkreact_todolist = self.webpackChunkreact_todolist || []).push([
  [55],
  {
    './src/stories/Header.stories.ts': (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          LoggedIn: () => LoggedIn,
          LoggedOut: () => LoggedOut,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        })
      let __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Example/Header',
          component: __webpack_require__('./src/stories/Header.tsx').e,
          tags: ['autodocs'],
          parameters: { layout: 'fullscreen' },
        },
        LoggedIn = { args: { user: { name: 'Jane Doe' } } },
        LoggedOut = {}
      ;(LoggedIn.parameters = {
        ...LoggedIn.parameters,
        docs: {
          ...LoggedIn.parameters?.docs,
          source: {
            originalSource: "{\n  args: {\n    user: {\n      name: 'Jane Doe'\n    }\n  }\n}",
            ...LoggedIn.parameters?.docs?.source,
          },
        },
      }),
        (LoggedOut.parameters = {
          ...LoggedOut.parameters,
          docs: {
            ...LoggedOut.parameters?.docs,
            source: { originalSource: '{}', ...LoggedOut.parameters?.docs?.source },
          },
        })
      let __namedExportsOrder = ['LoggedIn', 'LoggedOut']
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
    './src/stories/Header.tsx': (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.d(__webpack_exports__, { e: () => Header }),
        __webpack_require__('./node_modules/react/index.js')
      var Button = __webpack_require__('./src/stories/Button.tsx'),
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js')
      let Header = (_ref) => {
        let { user, onLogin, onLogout, onCreateAccount } = _ref
        return (0, jsx_runtime.jsx)('header', {
          children: (0, jsx_runtime.jsxs)('div', {
            className: 'storybook-header',
            children: [
              (0, jsx_runtime.jsxs)('div', {
                children: [
                  (0, jsx_runtime.jsx)('svg', {
                    width: '32',
                    height: '32',
                    viewBox: '0 0 32 32',
                    xmlns: 'http://www.w3.org/2000/svg',
                    children: (0, jsx_runtime.jsxs)('g', {
                      fill: 'none',
                      fillRule: 'evenodd',
                      children: [
                        (0, jsx_runtime.jsx)('path', {
                          d: 'M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z',
                          fill: '#FFF',
                        }),
                        (0, jsx_runtime.jsx)('path', {
                          d: 'M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z',
                          fill: '#555AB9',
                        }),
                        (0, jsx_runtime.jsx)('path', {
                          d: 'M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z',
                          fill: '#91BAF8',
                        }),
                      ],
                    }),
                  }),
                  (0, jsx_runtime.jsx)('h1', { children: 'Acme' }),
                ],
              }),
              (0, jsx_runtime.jsx)('div', {
                children: user
                  ? (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                      children: [
                        (0, jsx_runtime.jsxs)('span', {
                          className: 'welcome',
                          children: ['Welcome, ', (0, jsx_runtime.jsx)('b', { children: user.name }), '!'],
                        }),
                        (0, jsx_runtime.jsx)(Button.q, { size: 'small', onClick: onLogout, label: 'Log out' }),
                      ],
                    })
                  : (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                      children: [
                        (0, jsx_runtime.jsx)(Button.q, { size: 'small', onClick: onLogin, label: 'Log in' }),
                        (0, jsx_runtime.jsx)(Button.q, {
                          primary: !0,
                          size: 'small',
                          onClick: onCreateAccount,
                          label: 'Sign up',
                        }),
                      ],
                    }),
              }),
            ],
          }),
        })
      }
      try {
        ;(Header.displayName = 'Header'),
          (Header.__docgenInfo = {
            description: '',
            displayName: 'Header',
            props: {
              user: { defaultValue: null, description: '', name: 'user', required: !1, type: { name: 'User' } },
              onLogin: {
                defaultValue: null,
                description: '',
                name: 'onLogin',
                required: !0,
                type: { name: '() => void' },
              },
              onLogout: {
                defaultValue: null,
                description: '',
                name: 'onLogout',
                required: !0,
                type: { name: '() => void' },
              },
              onCreateAccount: {
                defaultValue: null,
                description: '',
                name: 'onCreateAccount',
                required: !0,
                type: { name: '() => void' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/stories/Header.tsx#Header'] = {
              docgenInfo: Header.__docgenInfo,
              name: 'Header',
              path: 'src/stories/Header.tsx#Header',
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
//# sourceMappingURL=stories-Header-stories.ae934a8f.iframe.bundle.js.map
