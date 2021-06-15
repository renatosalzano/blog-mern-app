const UploadButton = ({ onUpload }) => {
  return (
    <div className="upload_button">
      <span>Modifica</span>
      <input
        type="file"
        onChange={onUpload}
        name="upload_img"
        accept=".png, .jpg"
        className="upload_input"
      />
    </div>
  );
};

export default UploadButton;
