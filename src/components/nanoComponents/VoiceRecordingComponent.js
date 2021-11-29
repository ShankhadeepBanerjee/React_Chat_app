import React, { useEffect, useRef, useState } from "react";

// MUI
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { IconButton } from "@mui/material";

// css
import "./VoiceRecordingComponent.css";
import { audioRecorder, makeChatContent } from "../../tools/AppSpecificTools";
import { uploadAnonymousFileAndGetURL } from "../../tools/FirebaseStorageTools";
import { addChat } from "../../features/conversationSlice";
import { useDispatch } from "react-redux";
import { addChatToSenderAndReceiverDb } from "../../tools/FirestoreTools";

export default function VoiceRecordingComponent({ sender, receiver }) {
	const [recording, setRecording] = useState(false);
	const [audioChunks, setAudioChunks] = useState([]);
	const [upload, setUpload] = useState(false);
	const dispatch = useDispatch();

	const recorderRef = useRef();

	useEffect(() => {
		recorderRef.current = new audioRecorder({
			audioChunks,
			setAudioChunks,
		});
	}, []);

	useEffect(async () => {
		if (!upload) return;

		// here we upload the file and get URL
		let dt = new Date();

		if (audioChunks.length == 0) return;

		let audioBlob = new Blob(audioChunks, {
			type: "audio/mp3",
		});

		let fileURL = await uploadAnonymousFileAndGetURL(
			audioBlob,
			sender,
			receiver
		);

		let chatContent = makeChatContent("", fileURL, "mp3");

		const chatObj = {
			content: chatContent,
			time: dt.toLocaleTimeString(),
			timeStamp: dt.getTime(),
			from: sender.email,
			to: receiver.email,
		};

		await addChatToSenderAndReceiverDb(
			sender.email,
			receiver.email,
			chatObj
		);
		dispatch(addChat(chatObj));
		setAudioChunks([]);
		setUpload(false);
	}, [audioChunks]);

	return (
		<div className="voice-recording-div">
			{recording ? (
				<div className="recording">
					<IconButton
						onClick={(e) => {
							e.preventDefault();
							setUpload(false);
							recorderRef.current.stopAudioRecording();
							setRecording(false);
						}}
					>
						<CancelOutlinedIcon />
					</IconButton>
					<RecordingTimer />
					<IconButton
						onClick={async (e) => {
							e.preventDefault();
							setUpload(true);
							recorderRef.current.stopAudioRecording();
							setRecording(false);
						}}
					>
						<CheckCircleOutlineRoundedIcon />
					</IconButton>
				</div>
			) : (
				<div className="not-recording">
					<IconButton
						onClick={() => {
							setRecording(true);
							recorderRef.current.startAudioRecording();
						}}
					>
						<MicOutlinedIcon />
					</IconButton>
				</div>
			)}
		</div>
	);
}

const RecordingTimer = () => {
	const [time, setTime] = useState({ mm: 0, ss: 0 });

	useEffect(() => {
		// This for timer
		const timer = setInterval(() => {
			setTime((prev) => {
				let { mm, ss } = prev;
				ss++;
				mm += Math.floor(ss / 60);
				ss = ss % 60;
				return { mm: mm, ss: ss };
			});
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className="recording-timer">
			<div className="timer-blinker"></div>
			<div>
				{`${time.mm < 10 ? "0" : ""}${time.mm}:${
					time.ss < 10 ? "0" : ""
				}${time.ss}`}
			</div>
		</div>
	);
};
