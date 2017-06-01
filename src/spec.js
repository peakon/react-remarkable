import unexpected from 'unexpected';
import unexpectedReact from 'unexpected-react';

import sanitizer from 'sanitize-html';

import React from 'react';
import Remarkable from '.';

const expect = unexpected.clone().use(unexpectedReact);

describe('Remarkable', () => {
  describe('when passing a source text', () => {
    it('renders a markdown text', () => {
      expect(
        <Remarkable source="**Markdown is awesome!**" />,
        'to deeply render as',
        <div>
          <span
            dangerouslySetInnerHTML={{
              __html: '<p><strong>Markdown is awesome!</strong></p>\n'
            }}
          />
        </div>
      );
    });
  });

  describe('when passing as children', () => {
    it('renders a markdown text', () => {
      expect(
        <Remarkable>**Markdown is awesome!**</Remarkable>,
        'to deeply render as',
        <div>
          <span
            dangerouslySetInnerHTML={{
              __html: '<p><strong>Markdown is awesome!</strong></p>\n'
            }}
          />
        </div>
      );
    });
  });

  describe('when providing a sanitizer', () => {
    it('transforms it', () => {
      expect(
        <Remarkable sanitizer={rendered => sanitizer(rendered)}>
          ![Do not render](http://example.tld)

          **Awesome**
        </Remarkable>,
        'to deeply render as',
        <div>
          <span
            dangerouslySetInnerHTML={{
              __html: '<p> <strong>Awesome</strong></p>\n'
            }}
          />
        </div>
      );
    });
  });
});
