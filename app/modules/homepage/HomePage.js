import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const pic = require('./gradient.png');

class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      colors: [],
      format: 'rgb',
      language: 'css',
      picker: 'upload',
      prefix: ''
    }

    this.readURL = this.readURL.bind(this);
    this.rgbToHex = this.rgbToHex.bind(this);
    this.toHex = this.toHex.bind(this);
    this.onFormatChange = this.onFormatChange.bind(this);
    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.onPickerChange = this.onPickerChange.bind(this);
    this.renderPickerType = this.renderPickerType.bind(this);
  }
  componentDidMount() {

  }
  readURL(input) {
    this.setState({ colors: [] })
    let canvas = document.getElementById('canvas-picker');
    let ctx = canvas.getContext('2d');
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    if (input.target.files && input.target.files[0]) {
        let reader = new FileReader();
        reader.onload = function(event){
          var img = new Image();
          img.onload = function(){
            canvas.width=400;
            canvas.height=600;
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
          }
          img.src = event.target.result;
        }
      reader.readAsDataURL(input.target.files[0]);
    }
    canvas.onclick = function(e) {
      let r = canvas.getBoundingClientRect();
      let x = e.clientX - r.left;
      let y = e.clientY - r.top;

      let imgData = ctx.getImageData(x, y, 1, 1).data;
      let R = imgData[0];
      let G = imgData[1];
      let B = imgData[2];

      let rgb = `rgb(${R}, ${G}, ${B})`;
      let rgba = `rgba(${R}, ${G}, ${B}, 1)`;
      let color32 = `new Color32 (${R}, ${G}, ${B}, 255)`;
      let hex = this.rgbToHex(R,G,B);

      if (this.state.format === 'rgb') {
        this.setState({ colors: [...this.state.colors, rgb] })
      } else if (this.state.format === 'rgba') {
        this.setState({ colors: [...this.state.colors, rgba] })
      } else if (this.state.format === 'color32') {
        this.setState({ colors: [...this.state.colors, color32] })
      } else {
        this.setState({ colors: [...this.state.colors, hex] })
      }

    }.bind(this)
  }
  rgbToHex(R,G,B) {
    let hex12 = this.toHex(R);
    let hex34 = this.toHex(G);
    let hex56 = this.toHex(B);
    return `#${hex12}${hex34}${hex56}`
  }
  toHex(n) {
    n = parseInt(n,10);
    if (isNaN(n)) return "00";
    n = Math.max(0,Math.min(n,255));
    return "0123456789ABCDEF".charAt((n-n%16)/16)  + "0123456789ABCDEF".charAt(n%16);
  }
  onFormatChange(e) {
    this.setState({
      format: e.currentTarget.value
      });
  }
  onPickerChange(e) {
    this.setState({ picker: e.currentTarget.value })
    this.renderPickerType(e.currentTarget.value);
  }
  onLanguageChange(e) {
    this.setState({
      language: e.currentTarget.value
    });
  }
  handlePrefix(e) {
    this.setState({ prefix: e.target.value })
  }
  removeColor(index) {
    let spliceColors = this.state.colors;
    spliceColors.splice(index, 1);
    this.setState({ colors: spliceColors });
  }
  renderPickerType(picker) {
    let canvas = document.getElementById('canvas-picker');
    document.getElementsByClassName("input-file")[0].value = "";
    let ctx = canvas.getContext('2d');
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    if (picker === "palette") {
      this.setState({ colors: [] })

      var img = new Image();
      img.onload = function(){
        canvas.width=500;
        canvas.height=500;
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
      }
      img.src = pic;

      canvas.onclick = function(e) {
        let r = canvas.getBoundingClientRect();
        let x = e.clientX - r.left;
        let y = e.clientY - r.top;

        let imgData = ctx.getImageData(x, y, 1, 1).data;
        let R = imgData[0];
        let G = imgData[1];
        let B = imgData[2];

        let rgb = `rgb(${R}, ${G}, ${B})`;
        let rgba = `rgba(${R}, ${G}, ${B}, 1)`;
        let color32 = `new Color32 (${R}, ${G}, ${B}, 255)`;
        let hex = this.rgbToHex(R,G,B);

        if (this.state.format === 'rgb') {
          this.setState({ colors: [...this.state.colors, rgb] })
        } else if (this.state.format === 'rgba') {
          this.setState({ colors: [...this.state.colors, rgba] })
        } else if (this.state.format === 'color32') {
          this.setState({ colors: [...this.state.colors, color32] })
        } else {
          this.setState({ colors: [...this.state.colors, hex] })
        }
      }.bind(this)
    } else {
      this.setState({ colors: [] })
      document.getElementsByClassName("input-file")[0].value = "";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  render() {
    return (
      <div className="homepage-container">
        <header>
          <nav>
            <div className="row">
                <h1 className="site-title">COLOR PICKER ULTRA</h1>
            </div>
            <div className="row">
                <h2 className="site-title-2">Because picking one at a time is no fun</h2>
            </div>
            <div className="row">
                <h3 className="site-title-3">Seriously. Pick as many as you want. Then copy and paste the code.</h3>
            </div>

            <div className="format-select row">
              <div className="col span-1-of-4"></div>
                <div className="col span-1-of-4">
                  <input type="radio" name="picker" value="upload" defaultChecked onChange={this.onPickerChange}/>
                  <span>Upload Image</span>
                </div>
                <div className="col span-1-of-4">
                  <input type="radio" name="picker" value="palette" onChange={this.onPickerChange}/>
                  <span>Color Palette</span>
                </div>
              <div className="col span-1-of-4"></div>
            </div>

            <div className="format-select row">
              <div className="col span-1-of-4">
                <input type="radio" name="format" value="rgb" defaultChecked onChange={this.onFormatChange}/>
                <span>RGB</span>
              </div>
              <div className="col span-1-of-4">
                <input type="radio" name="format" value="rgba" onChange={this.onFormatChange}/>
                <span>RGBA</span>
              </div>
              <div className="col span-1-of-4">
                <input type="radio" name="format" value="hex" onChange={this.onFormatChange}/>
                <span>HEX</span>
              </div>
              <div className="col span-1-of-4">
                <input type="radio" name="format" value="color32" onChange={this.onFormatChange}/>
                <span>Color32</span>
              </div>
            </div>
          </nav>
        </header>

        <div className="row">
          <div className="col span-1-of-2">
            <div className="row input-file-container">
              <input className="input-file" type='file' onChange={this.readURL} />
            </div>
            <div className="row">
              <div className="canvas-container">
                <canvas height='400' width='600' id="canvas-picker"></canvas>
              </div>
            </div>
          </div>
          <div className="col span-1-of-2">
            <h3 className="color-list-title">Color List:</h3>
            <div className="color-list-container">
              <ol className="color-list">
                <ReactCSSTransitionGroup
                  transitionName="example"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}>
                    {this.state.colors.map((color, index) => {
                      let non32;
                      if (color.substr(0, 3) === 'rgb(') {
                        non32 = 'rgb' + color.substr(color.indexOf('('))
                      } else if (color.substr(0, 3) === 'rgba') {
                        non32 = 'rgba' + color.substr(color.indexOf('('))
                      } else if (color.split('')[0] === 'n') {
                        non32 = 'rgba' + color.substr(color.indexOf('('))
                      } else {
                        non32 = color
                      }
                      return (
                        <li key={`${index}`} style={{backgroundColor: `${non32}`, color: `#888`}}>{color}</li>
                      )
                    })}
                </ReactCSSTransitionGroup>
              </ol>
            </div>
          </div>
        </div>

        <footer>
          Created by Dan Molitor &copy;
        </footer>
      </div>
    )
  }
}

export default HomePage
