'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _remarkable = require('remarkable');

var _remarkable2 = _interopRequireDefault(_remarkable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Remarkable = function (_Component) {
  _inherits(Remarkable, _Component);

  function Remarkable() {
    _classCallCheck(this, Remarkable);

    return _possibleConstructorReturn(this, (Remarkable.__proto__ || Object.getPrototypeOf(Remarkable)).apply(this, arguments));
  }

  _createClass(Remarkable, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      var prevOptions = this.props.options;
      var nextOptions = nextProps.options;


      if (prevOptions !== nextOptions) {
        this.md = new _remarkable2.default(nextOptions);
      }
    }
  }, {
    key: 'content',
    value: function content() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          source = _props.source;


      if (source) {
        return _react2.default.createElement('span', {
          dangerouslySetInnerHTML: {
            __html: this.renderMarkdown(source)
          }
        });
      } else {
        return _react2.default.Children.map(children, function (child) {
          if (typeof child === 'string') {
            return _react2.default.createElement('span', {
              dangerouslySetInnerHTML: { __html: _this2.renderMarkdown(child) }
            });
          } else {
            return child;
          }
        });
      }
    }
  }, {
    key: 'renderMarkdown',
    value: function renderMarkdown(source) {
      var _props2 = this.props,
          options = _props2.options,
          sanitize = _props2.sanitize;


      if (!this.md) {
        this.md = new _remarkable2.default(options);
      }

      return sanitize(this.md.render(source));
    }
  }, {
    key: 'render',
    value: function render() {
      var Container = this.props.container;


      return _react2.default.createElement(
        Container,
        null,
        this.content()
      );
    }
  }]);

  return Remarkable;
}(_react.Component);

exports.default = Remarkable;


Remarkable.defaultProps = {
  container: 'div',
  options: {},
  sanitize: function sanitize(id) {
    return id;
  }
};

Remarkable.propTypes = {
  container: _propTypes2.default.string,
  options: _propTypes2.default.object,
  sanitize: _propTypes2.default.func,
  source: _propTypes2.default.string
};