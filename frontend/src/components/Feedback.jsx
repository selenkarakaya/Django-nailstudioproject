import { MdCancelPresentation } from "react-icons/md";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";
import api from "../api";

function Feedback({ feedback, onDelete }) {
  const { user } = useContext(UserContext);

  const onDeleteHandler = (id) => {
    api
      .delete(`/appointment/feedback/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          toast.success(`Uh-oh! Your feedback was deleted 😔`);
          onDelete(id);
        }
      })
      .catch((err) => toast.error(`Oops! Something went wrong.`));
  };

  return (
    <div>
      <div className="p-4 bg-lightBg rounded-lg">
        {user && feedback.user.username == user.username && (
          <button onClick={() => onDeleteHandler(feedback.id)}>
            <MdCancelPresentation />
          </button>
        )}
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
