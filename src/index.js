'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Markdown from 'remarkable';

export default class Remarkable extends Component {
  componentWillUpdate(nextProps) {
    const { options: prevOptions } = this.props;
    const { options: nextOptions } = nextProps;

    if (prevOptions !== nextOptions) {
      this.md = new Markdown(nextOptions);
    }
  }

  content() {
    const { children, source } = this.props;

    if (source) {
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: this.renderMarkdown(source)
          }}
        />
      );
    } else {
      return React.Children.map(children, child => {
        if (typeof child === 'string') {
          return (
            <span
              dangerouslySetInnerHTML={{ __html: this.renderMarkdown(child) }}
            />
          );
        } else {
          return child;
        }
      });
    }
  }

  renderMarkdown(source) {
    const { options } = this.props;

    if (!this.md) {
      this.md = new Markdown(options);
    }

    return this.md.render(source);
  }

  render() {
    const { container: Container } = this.props;

    return (
      <Container>
        {this.content()}
      </Container>
    );
  }
}

Remarkable.defaultProps = {
  container: 'div',
  options: {}
};

Remarkable.propTypes = {
  container: PropTypes.string,
  options: PropTypes.object,
  source: PropTypes.string
};
