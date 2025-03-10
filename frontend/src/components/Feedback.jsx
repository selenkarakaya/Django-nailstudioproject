import { ImCancelCircle } from "react-icons/im";

function Feedback({ feedback, onDelete }) {
  return (
    <div>
      <div className="p-4 bg-lightBg rounded-lg">
        <button onClick={() => onDelete(feedback.id)}>
          <ImCancelCircle
            style={{
              color: "#d3d3d3",
              fontSize: "1.5rem",
            }}
          />
        </button>
        <div className="p-4">
          <p>{feedback?.comment || "No comment provided"}</p>
          {/* {feedback?.image && (
                        <div className="w-1/2 h-1/2">
                          <img
                            src={
                              feedback.image.startsWith("http")
                                ? feedback.image
                                : `${"https://f0cd3c7e-6ff3-490c-b642-a2b916772aa2.e1-eu-north-azure.choreoapps.dev"}${
                                    feedback.image
                                  }`
                            }
                            alt="Feedback"
                            className="w-full h-full rounded-md"
                          />
                        </div>
                      )} */}
          <p className="text-end italic">
            {feedback?.user?.username || "Anonymous"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
