import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import React from 'react';
import SvgEditor from '../lib/svg-editor/svgEditor.react';
import './home.styl';

export default class Index extends React.Component {

  static propTypes = {
    msg: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <DocumentTitle title="SVG Path Editor">
        <div className="home-page">
          <SvgEditor />
        </div>
      </DocumentTitle>
    );
  }

}
