import "./ProfilePic.css";

export default function ProfilePic(props) {
  return (
    <div>
      <img src={props.pic} className="profile-pic-1" />
    </div>
  );
}
