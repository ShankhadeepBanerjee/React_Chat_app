import { getChats } from "./FirestoreTools";
import {
	addToAlreadyFetched,
	setChatsFor,
	setPartner,
} from "../features/conversationSlice";

import { auth } from "../firebaseConfig";

function showScreen2() {
	const elem = document.querySelector(".screen2");
	elem.style["z-index"] = "2";
}

function getChatsForAPersoneAndShowOnChatsScreen(
	contact,
	conversationSelector,
	dispatchFunc
) {
	showScreen2();
	dispatchFunc(setPartner(contact));
	if (contact.email in conversationSelector.alreadyFetchedChats) return;
	(async () => {
		const chatsArray = await getChats(
			auth.currentUser.email,
			contact.email
		);
		dispatchFunc(setChatsFor({ to: contact.email, chats: chatsArray }));
		dispatchFunc(addToAlreadyFetched(contact.email));
	})();
}

function getFileSizeInMB(file) {
	const sizeInMB = file.size / (1024 * 1024);
	return sizeInMB;
}

function getFileExtension(file) {
	const filename = file.name;
	const ext = filename.split(".").pop();
	return ext;
}

function makeChatContent(chatInput, mediaURL, mediaFileExtension) {
	let contentObject = {
		mediaContent: "",
		mediaContentType: "",
		chatContent: chatInput,
	};

	if (mediaURL) {
		switch (mediaFileExtension) {
			case "mp4":
				contentObject[
					"mediaContent"
				] = `<video src="${mediaURL}" controls></video>`;
				contentObject["mediaContentType"] = "video";
				break;
			case "jpg":
				contentObject[
					"mediaContent"
				] = `<img src="${mediaURL}" loading="lazy" />`;
				contentObject["mediaContentType"] = "image";
				break;
			case "png":
				contentObject["mediaContent"] = `<img src="${mediaURL}" />`;
				contentObject["mediaContentType"] = "image";
				break;
			case "mp3":
				contentObject["mediaContent"] = `<audio controls>
				<source src="${mediaURL}" type="audio/mp3">
				</audio>`;
				contentObject["mediaContentType"] = "audio";
				break;
			default:
				contentObject["mediaContent"] = `<embed src="${mediaURL}" />`;
				contentObject["mediaContentType"] = "doc";
		}
	}

	return contentObject;
}

function audioRecorder({ audioChunks, setAudioChunks }) {
	this.mediaRecorder;
	this.stream_;
	let mediaRecorder;
	let LastRecorded = [];

	this.init = (strm) => {
		this.stream_ = strm;

		mediaRecorder = new MediaRecorder(this.stream_);

		mediaRecorder.start();

		mediaRecorder.ondataavailable = async (e) => {
			await setAudioChunks([e.data]);
			// audioChunks.push(e.data);
		};

		mediaRecorder.onstop = (e) => {};
	};

	this.startAudioRecording = () => {
		navigator.mediaDevices
			.getUserMedia({ audio: "true" })
			.then((stream) => {
				this.stream_ = stream;
				this.init(stream);
			});
	};

	this.stopAudioWithStream = (stream) => {
		stream.getTracks().forEach(function (track) {
			if (track.readyState == "live" && track.kind === "audio") {
				track.stop();
			}
		});
	};

	this.stopAudioRecording = () => {
		mediaRecorder.stop();
		this.stopAudioWithStream(this.stream_);
	};

	this.getLastRecorded = () => {
		mediaRecorder.requestData();
		return LastRecorded;
	};
}

export {
	getChatsForAPersoneAndShowOnChatsScreen,
	getFileExtension,
	getFileSizeInMB,
	makeChatContent,
	audioRecorder,
};
