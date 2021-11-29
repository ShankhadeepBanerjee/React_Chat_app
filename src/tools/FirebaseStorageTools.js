import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

async function uploadFileAndGetURL(file, sender, receiver) {
	console.log("File for upload", file);
	console.log(
		`Uploading Media Started, file name is "${file}" sender is "${sender.email}" receiver is "${receiver.email}"`
	);

	const storageRef = ref(
		storage,
		`Media/${sender.email}/${receiver.email}/${file.name}.mp3`
	);

	const snapshot = await uploadBytes(storageRef, file);
	let URL = await getDownloadURL(snapshot.ref);
	console.log("Uploading Media Done, this is URL", URL);

	return URL;
}

async function uploadAnonymousFileAndGetURL(file, sender, receiver) {
	const fileName = Date.now();
	const extension = file.type.split("/").pop();

	const storageRef = ref(
		storage,
		`Media/${sender.email}/${receiver.email}/${fileName}.${extension}`
	);

	const snapshot = await uploadBytes(storageRef, file);
	let URL = await getDownloadURL(snapshot.ref);
	console.log("Uploading Media Done, this is URL", URL);

	return URL;
}

export { uploadFileAndGetURL, uploadAnonymousFileAndGetURL };
