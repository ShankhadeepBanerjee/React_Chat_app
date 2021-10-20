import React from "react";

// tools
import { getFileExtension } from "../../tools/AppSpecificTools";

// css
import "./FileUploadPreview.css";

export default function FileUploadPreview(props) {
	const file = props.file;
	const extension = getFileExtension(file);
	const fileUrl = URL.createObjectURL(file);

	console.log("Extension is ", extension);

	let Preview;
	switch (extension) {
		case "mp4":
			console.log("This is video");
			Preview = <video src={fileUrl} controls></video>;
			break;
		case "jpg":
			console.log("This is image JPG");
			Preview = <img src={fileUrl} />;
			break;
		case "png":
			console.log("This is image PNG");
			Preview = <img src={fileUrl} />;
			break;
		default:
			console.log("This is Document");
			Preview = <embed src={fileUrl} />;
	}

	return <div className="file-upload-preview">{Preview}</div>;
}
