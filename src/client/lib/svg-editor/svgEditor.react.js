import React from 'react';
import './svgEditor.styl';

export default class SvgEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      path: '',
      viewBoxMinX: -20,
      viewBoxMinY: -20,
      viewBoxWidth: 40,
      viewBoxHeight: 40,
      zoom: 5,
    };
  }

  setSvgPath(path) {
    this.setState({path});
  }

  getSvgPath() {
    return this.state.path.replace(/\/\/.*\n/g, '');
  }

  getViewBox() {
    const {viewBoxMinX, viewBoxMinY, viewBoxWidth, viewBoxHeight} = this.state;
    return `${viewBoxMinX || 0} ${viewBoxMinY || 0} ${viewBoxWidth || 0} ${viewBoxHeight || 0}`;
  }

  getDownloadBaseName() {
    return (this.state.name || 'untitled');
  }

  render() {
    const {path, backgroundImage} = this.state || {};
    const viewBox = this.getViewBox();
    const svgStyle = {
    };

    return (
      <div className="svg-editor">
        <div className="name-value">
          <label>
            <span>zoom:</span>
            <input
              type="number"
              defaultValue={this.state.zoom}
              onChange={({target: {value}}) => {
                const val = parseFloat(value);
                if (isNaN(val)) return;
                this.setState({zoom: val})
              }}
            />
          </label>
        </div>

        <div className="background-file">
          <label>
            <span>background:</span>
            <input type="file" accept="image/*" onChange={(e) => this.loadBackground(e)} />
          </label>
        </div>
        <div className="viewBox-editor">
          {`viewBox="${this.getViewBox()}" `}
          <div className="name-value">
            <label>
              <span>min-x:</span>
              <input
                type="number"
                defaultValue={this.state.viewBoxMinX}
                onChange={({target: {value}}) => {
                  const val = parseFloat(value);
                  if (isNaN(val)) return;
                  this.setState({viewBoxMinX: val})
                }}
              />
            </label>
          </div>
          <div className="name-value">
            <label>
              <span>min-y:</span>
              <input
                type="number"
                defaultValue={this.state.viewBoxMinY}
                onChange={({target: {value}}) => {
                  const val = parseFloat(value);
                  if (isNaN(val)) return;
                  this.setState({viewBoxMinY: val})
                }}
              />
            </label>
          </div>
          <div className="name-value">
            <label>
              <span>width:</span>
              <input
                type="number"
                defaultValue={this.state.viewBoxWidth}
                onChange={({target: {value}}) => {
                  const val = parseFloat(value);
                  if (isNaN(val)) return;
                  this.setState({viewBoxWidth: val})
                }}
              />
            </label>
          </div>
          <div className="name-value">
            <label>
              <span>height:</span>
              <input
                type="number"
                defaultValue={this.state.viewBoxHeight}
                onChange={({target: {value}}) => {
                  const val = parseFloat(value);
                  if (isNaN(val)) return;
                  this.setState({viewBoxHeight: val})
                }}
              />
            </label>
          </div>
        </div>
        <textarea
          name="svgPath"
          cols="30"
          rows="10"
          defaultValue={path}
          onChange={({target: {value}}) => this.setSvgPath(value)}
        />
        <div className="work-area">
          {backgroundImage && <img
            ref="background"
            className="background"
            src={backgroundImage}
            width={this.state.viewBoxWidth * this.state.zoom}
            height={this.state.viewBoxHeight * this.state.zoom}
          />}
          <svg
            className="surface"
            width={this.state.viewBoxWidth * this.state.zoom}
            height={this.state.viewBoxHeight * this.state.zoom}
            viewBox={viewBox}
            style={svgStyle}
          >
            <path d={this.getSvgPath()} />
          </svg>

          <a href={this.createSaveURL()} download={this.getDownloadBaseName() + '.svg'}>
            <svg
              className="preview"
              width={this.state.viewBoxWidth}
              height={this.state.viewBoxHeight}
              viewBox={viewBox}
              style={svgStyle}
            >
              <path d={this.getSvgPath()} />
            </svg>
          </a>

        </div>
      </div>
    );
  }

  loadBackground(e) {
    const {target} = e;
    const file = target.files && target.files[0];

    if (file && FileReader) {
        var fr = new FileReader();
        fr.onload = () => {
            this.setState({
              backgroundImage: fr.result,
              name: file.name && file.name.replace(/\.[^.]+$/, ''),
            }, () => this.onBackgroundImageSet());
        }
        fr.readAsDataURL(file);
    }

  }

  onBackgroundImageSet() {
    const img = React.findDOMNode(this.refs.background);
    const {naturalWidth, naturalHeight} = img;
    this.setState({
      viewBoxWidth: naturalWidth,
      viewBoxHeight: naturalHeight,
    });
  }

  createSaveURL() {
    if (!process.env.IS_BROWSER)
      return;

    const svgContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
      <svg
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:cc="http://creativecommons.org/ns#"
        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
        xmlns:svg="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        width="${this.state.viewBoxWidth}"
        height="${this.state.viewBoxHeight}"
        viewBox="${this.getViewBox()}"
        style="fill:#777777;fill-rule:evenodd;stroke:#000000;stroke-width:1px"
      >
        <metadata>
          <source><![CDATA[\n${this.state.path}\n]]></source>
          <rdf:RDF>
            <cc:Work rdf:about="">
              <dc:format>image/svg+xml</dc:format>
              <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
              <dc:title>${this.getDownloadBaseName()}</dc:title>
              <dc:description></dc:description>
            </cc:Work>
          </rdf:RDF>
        </metadata>
        <defs />
        <path d="${this.getSvgPath().replace(/\s+/g,' ')}" />
      </svg>
    `;
    const file = new Blob([svgContent], {type: 'image/svg+xml'});
    return URL.createObjectURL(file);
  }

}
