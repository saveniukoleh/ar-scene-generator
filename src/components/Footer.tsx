import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="alert alert-dismissible alert-info">
          <h4>Prepare your files</h4>
          <ul>
            <li>
              Pattern Marker - marker, which is generated from an image, to create .patt file use{" "}
              <b>
                <a
                  href="https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html"
                  target="_blank"
                >
                  this link
                </a>
              </b>
              . Make sure to set Pattern Ration to 0.90.
            </li>
            <li>
              Barcode Marker - marker, which is generated in a range of numbers, for example from 0 to 63.
              You can create a barcode use{" "}
              <b>
                <a
                  href="https://au.gmented.com/app/marker/marker.php"
                  target="_blank"
                >
                  this link
                </a>
              </b>
              . Make sure you have chosen right oprions:
              <li> Border size (% of marker width): 0.1 </li>
              <li> Barcode dimensions: 3х3 </li>
              <li> Markers have black borders.</li>
            </li>
            <li>
              .mtl .obj - model files. Both files should be prepared with their textures and correctly added to the project.
            </li>
          </ul>
          <h4>Working with the generator</h4>
          <ol>
            <li>
              Upload your patterns files or choose barcodes which you will use in your project. This will generate a table which you can use to input other files of your content.
              <br></br>
            </li>
            <li>
              You can choose what kind of content will be linked with each pattern. For one pattern you can select either model, video or image with one audio file.
              <br></br>
            </li>
            <li>
              After you click submit button the text for the index.html will appear.
            </li>
          </ol>
        </div>
      </div>
    );
  }
}

export default Footer;
