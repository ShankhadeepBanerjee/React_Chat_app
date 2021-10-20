import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

async function uploadFileAndGetURL(file, sender, receiver) {
	console.log("Uploading Media Started");

	const storageRef = ref(
		storage,
		`Media/${receiver.email}/${sender.email}/${file.name}`
	);

	const snapshot = await uploadBytes(storageRef, file);
	let URL = await getDownloadURL(snapshot.ref);
	console.log("Uploading Media Done");

	return URL;
}

export { uploadFileAndGetURL };
