import React, { useMemo, useRef, useState } from "react";

import Picker from "emoji-picker-react";

// redux
import { useSelector, useDispatch } from "react-redux";

// Tools
import { auth } from "../../firebaseConfig";
import { addChatToSenderAndReceiverDb } from "../../tools/FirestoreTools";
import Compressor from "compressorjs";
import {
	audioRecorder,
	getFileExtension,
	getFileSizeInMB,
	makeChatContent,
} from "../../tools/AppSpecificTools";
import { uploadFileAndGetURL } from "../../tools/FirebaseStorageTools";
import { addChat, selectConversation } from "../../features/conversationSlice";

// Assets
import imageAttachment from "../../Assets/image-attachment.svg";
import docAttachment from "../../Assets/doc-attachment.svg";
import cameraAttachment from "../../Assets/camera-attachment.svg";

// Material ui
import Box from "@mui/material/Box";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// components
import FileUploadPreview from "./FileUploadPreview";
import VoiceRecordingComponent from "../nanoComponents/VoiceRecordingComponent";
import TextInputComponent from "../nanoComponents/TextInputComponent";

// css
import "./ChatInput.css";

export default function ChatInput() {
	const user = auth.currentUser;
	const conversation = useSelector(selectConversation);
	const dispatch = useDispatch();
	const partner = conversation.partner;

	// states
	const [chatInput, setChatInput] = useState("");
	const [attachmentIconVisible, setAttachmentIconVisible] = useState(false);
	const [showUploadPage, setShowUploadPage] = useState(false);
	const [uploadFile, setUploadFile] = useState(null);

	// This is for emoji picker
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);

	const onEmojiClick = (event, emojiObject) => {
		// setChosenEmoji(emojiObject);
		console.log(emojiObject);
		setChatInput((prev) => prev + emojiObject.emoji);
	};

	// This is for image attachment
	const imageAttachmentRef = useRef(null);
	const chatInputFormSubmitButtonRef = useRef(null);

	// This compresses images
	const compressImage = (imageFile, qualityIndex) => {
		new Compressor(imageFile, {
			quality: qualityIndex, // 0.8 can also be used, but its not recommended to go below.
			success: (compressedImage) => {
				// compressedResult has the compressed file.
				// Use the compressed file to upload the images to your server.
				console.log("Yes Image is compressed");
				setUploadFile(compressedImage, 0.6);
			},
		});
	};

	function handleUploadFilePreview(e) {
		const file = e.target.files[0];
		if (getFileSizeInMB(file) > 16) {
			alert("File Size must be under 16MB");
			return;
		}
		const fileExtension = getFileExtension(file);

		setShowUploadPage(true);
		if (fileExtension == "jpg" || fileExtension == "png") {
			compressImage(file);
		} else {
			setUploadFile(file);
		}
	}

	function handleChange(e) {
		setChatInput(e.target.value);
	}

	function handleSubmit() {
		let dt = new Date();

		if (uploadFile) {
			(async () => {
				let fileURL = await uploadFileAndGetURL(
					uploadFile,
					user,
					partner
				);
				let chatContent = makeChatContent(
					chatInput,
					fileURL,
					getFileExtension(uploadFile)
				);

				const chatObj = {
					content: chatContent,
					time: dt.toLocaleTimeString(),
					timeStamp: dt.getTime(),
					from: user.email,
					to: partner.email,
				};

				await addChatToSenderAndReceiverDb(
					user.email,
					partner.email,
					chatObj
				);
				dispatch(addChat(chatObj));
				setChatInput("");
				setUploadFile(null);
			})();
		} else {
			const chatObj = {
				content: {
					mediaContent: "",
					mediaContentType: "",
					chatContent: chatInput,
				},
				time: dt.toLocaleTimeString(),
				timeStamp: dt.getTime(),
				from: user.email,
				to: partner.email,
			};

			addChatToSenderAndReceiverDb(user.email, partner.email, chatObj);
			dispatch(addChat(chatObj));
			setChatInput("");
		}
	}

	// This stops "FileUploadPreview" component
	// from re-rendering every time "chatInput" gets Changed
	const MemoizedFileUploadPreview = useMemo(() => {
		return <FileUploadPreview file={uploadFile} />;
	}, [uploadFile]);

	return (
		<div className="chat-input">
			<form
				action=""
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				{/* This button is responsible for submit event  */}
				<button
					ref={chatInputFormSubmitButtonRef}
					style={{ display: "none" }}
				></button>

				<Box className="chat-input-box">
					<div>
						<IconButton
							className="emoji"
							onClick={() => setShowEmojiPicker((p) => !p)}
						>
							<InsertEmoticonIcon />
						</IconButton>
					</div>

					<div className="attachment-icon-container">
						<IconButton
							className="attchment-icons icon0"
							onClick={() =>
								setAttachmentIconVisible((prev) => !prev)
							}
						>
							<AttachmentIcon />
						</IconButton>

						<span
							className={
								"attchment-icons " +
								(attachmentIconVisible && "show-icon icon-one")
							}
						>
							<img
								src={imageAttachment}
								alt="image"
								onClick={() => {
									imageAttachmentRef.current.click();
								}}
							/>
							<input
								className="file-input-elements"
								type="file"
								accept="image/*"
								ref={imageAttachmentRef}
								onChange={handleUploadFilePreview}
							/>
						</span>

						<span
							className={
								"attchment-icons " +
								(attachmentIconVisible && "show-icon icon-two")
							}
						>
							<img src={cameraAttachment} alt="camera" />
						</span>

						<span
							className={
								"attchment-icons " +
								(attachmentIconVisible &&
									"show-icon icon-three")
							}
						>
							<img src={docAttachment} alt="document" />
						</span>
					</div>

					<TextInputComponent
						chatInput={chatInput}
						handleChange={handleChange}
						classes={"chat-input-field"}
					/>

					<div>
						<VoiceRecordingComponent
							sender={user}
							receiver={partner}
						/>
					</div>
				</Box>
			</form>

			<Picker
				onEmojiClick={onEmojiClick}
				pickerStyle={{
					width: "100%",
					height: showEmojiPicker ? "50vh" : "0",
					opacity: showEmojiPicker ? "1" : "0",
					transition: "height linear 100ms, opacity linear 500ms",
				}}
			/>

			{showUploadPage && (
				<div className="upload-page ">
					{uploadFile && MemoizedFileUploadPreview}

					<TextInputComponent
						chatInput={chatInput}
						handleChange={handleChange}
						classes=""
					/>

					<div>
						<button
							onClick={() => {
								chatInputFormSubmitButtonRef.current.click();
								setShowUploadPage(false);
								imageAttachmentRef.current.value = "";
							}}
						>
							Submit
						</button>
					</div>

					<span className="cross">
						<IconButton
							onClick={() => {
								setShowUploadPage(false);
								imageAttachmentRef.current.value = "";
								setChatInput("");
							}}
						>
							<ArrowBackIcon />
						</IconButton>
					</span>
				</div>
			)}
		</div>
	);
}
