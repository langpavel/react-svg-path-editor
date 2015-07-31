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
    };
  }

  setSvgPath(path) {
    this.setState({path});
  }

  getViewBox() {
    const {viewBoxMinX, viewBoxMinY, viewBoxWidth, viewBoxHeight} = this.state;
    return `${viewBoxMinX || 0} ${viewBoxMinY || 0} ${viewBoxWidth || 0} ${viewBoxHeight || 0}`;
  }

  render() {
    const {path} = this.state || {};
    const viewBox = this.getViewBox();
    const svgStyle = {
      strokeWidth: 1,
      stroke: 'rgba(0,0,0,0.7)',
      fill: 'rgba(0,0,0,0.1)',
      fillRule: 'evenodd'
    };

    return (
      <div className="svg-editor">
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
          path={path}
          onChange={({target: {value}}) => this.setSvgPath(value)}
        />
        <svg width='800' height='800' viewBox={viewBox} style={svgStyle}>
          <path d={path} />
        </svg>
      </div>
    );
  }

}
