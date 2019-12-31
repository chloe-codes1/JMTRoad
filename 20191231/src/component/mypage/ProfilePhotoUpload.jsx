import React from "react";
import DropzoneComponent from "react-dropzone-component";
import "./filepicker.css";

class ProfilePhotoUpload extends React.Component {
  constructor(props) {
    super(props);
    const { maxFile } = this.props;
    var ReactDOMServer = require("react-dom/server");

    this.djsConfig = {
      dictInvalidFileType: "지원하는 파일 형식이 아닙니다",
      // dictDefaultMessage: `Click here & Select or Drag file! ${maxFile?'(업로드 가능 파일 수: ' + maxFile + ')' : ''}`,
      acceptedFiles: "image/jpg, image/jpeg, image/png, image/gif",
      autoProcessQueue: false,
      maxFiles: maxFile,
      previewTemplate: ReactDOMServer.renderToStaticMarkup(
        <div
          className="dz-preview dz-file-preview"
          style={{ display: "inline-block" }}
        >
          <div className="dz-image">
            <img
              data-dz-thumbnail="true"
              alt="default-thumbnail"
              style={{ display: "block" }}
            />
         

          <span className="dz-remove" data-dz-remove>
            &times;
          </span>
          </div>
          <div className="dz-error-message">
            <span data-dz-errormessage></span>{" "}
          </div>
        </div>
      )
    };
    this.componentConfig = {
      //Upload 가능한 File Icon들 보여주기
      // iconFiletypes: [".jpg", ".jpeg", ".png", ".gif"],
      // showFiletypeIcon: true,
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

  onAdd = file => {
    this.props.onAdd(file, this.props.stateKey);
  };

  render() {
    const { name } = this.props;
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;
    const eventHandlers = {
      init: dz => {
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
      <div>
        <div className="productImageForm">
          <DropzoneComponent
            config={config}
            eventHandlers={eventHandlers}
            djsConfig={djsConfig}
          >
            <div className="dz-message">
              <div style={{display: "block", fontSize: "10pt"}}>
                여기로 파일을 드래그하거나 클릭하세요! 업로드 가능 파일 개수: 1
              </div>
              <div style={{display: "block", fontSize: "10pt"}}>지원하는 파일 형식: .jpg, .jpeg, .png, .gif</div>
            </div>
          </DropzoneComponent>
        </div>
      </div>
    );
  }
}

export default ProfilePhotoUpload;
