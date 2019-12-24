import React from "react";
import DropzoneComponent from "react-dropzone-component";
import "react-dropzone-component/styles/filepicker.css";
import "dropzone/dist/min/dropzone.min.css";
import './ProfilePhotoUpload.scss'

class ProfilePhotoUpload extends React.Component {
  constructor(props) {
    super(props);
    const { maxFile } = this.props;
    var ReactDOMServer = require("react-dom/server");

    this.djsConfig = {
      dictDefaultMessage: `Click here & Select or Drag file! ${maxFile?'(업로드 가능 파일 수: ' + maxFile + ')' : ''}`,
      acceptedFiles: "image/jpg, image/jpeg, image/png, image/gif",
      autoProcessQueue: false,
      maxFiles: maxFile,
      previewTemplate: ReactDOMServer.renderToStaticMarkup(
        <div className="dz-preview dz-file-preview" style={{display: "inline-block"}}>
          <div className="dz-details">
            <div className="dz-filename">
              <span data-dz-name="true"></span>
            </div>
            <img data-dz-thumbnail="true" alt="default-thumbnail" />
            <span className="dz-remove" data-dz-remove>&times;</span>
          </div>
          <div className="dz-progress">
            <span className="dz-upload" data-dz-uploadprogress="true"></span>
          </div>
        </div>
      )
    };
    this.componentConfig = {
      //Upload 가능한 File Icon들 보여주기 
      iconFiletypes: [".jpg", ".jpeg", ".png", ".gif"],
      showFiletypeIcon: true,
      postUrl: "none"
      // -> set the URL to which uploads should be posted

    };

    this.dropzone = null;
  }
  shouldComponentUpdate(nextProps, prevState) {
    if (this.props.post === false && nextProps.post === true) {
      this.dropzone.removeAllFiles();
      return true;
    }
    return false;
  }

  onAdd = (file) => {
    this.props.onAdd(file, this.props.stateKey);
  };

  // onRemove = (file) => {
  //   this.props.onRemove(file, this.props.stateKey);
  // };

  render() {
    const { name } = this.props;
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;
    const eventHandlers = {
      init: (dz) => {
        this.dropzone = dz;
        this.dropzone.on("maxfilesexceeded", function(file) {
          this.removeAllFiles();
          this.addFile(file);
        });
      },
      addedfile: this.onAdd,
      removedfile: this.onRemove
    };

    return (
      <div >
        <p className="intro">{name}</p>
        <DropzoneComponent
          config={config}
          eventHandlers={eventHandlers}
          djsConfig={djsConfig}
        />
      </div>
    );
  }
}

export default ProfilePhotoUpload;
