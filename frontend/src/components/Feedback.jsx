import { ImCancelCircle } from "react-icons/im";

function Feedback({ feedback }) {
  return (
    <div>
      <div className="p-4 bg-lightBg rounded-lg">
        <div className="p-4">
          <p>{feedback?.comment || "No comment provided"}</p>
          <p className="text-end italic">
            {feedback?.user?.username || "Anonymous"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
