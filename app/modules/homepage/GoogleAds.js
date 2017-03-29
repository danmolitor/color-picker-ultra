import React, { Component, PropTypes } from 'react';


export default class GoogleAds extends Component {
  constructor(props) {
    super(props);
  }
  // This code is ran when the component mounts
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  // an outer div for styling purposes
  // changed class to ClassName
  // changed style from string to an object

  render() {
    return (
      <div style={this.props.wrapperDivStyle} >
        <ins className="adsbygoogle"
             style={{display: "block"}}
             data-ad-client="ca-pub-7021234061210394"
             data-ad-slot="2619829468"
             data-ad-format="auto"></ins>
      </div>
    );
  }
}
