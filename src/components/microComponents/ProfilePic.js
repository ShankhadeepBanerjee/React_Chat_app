import "./ProfilePic.css";

export default function ProfilePic(props) {
	return (
		<div className="profile-pic-1">
			<img src={props.pic} />
		</div>
	);
}
