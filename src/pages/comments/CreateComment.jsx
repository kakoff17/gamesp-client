import { useContext, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { addCommService } from "../../services/game.services";

function CreateComment() {
  const params = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const { activeUser } = useContext(AuthContext);

  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleContentChange = (e) => setContent(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const addComment = {
        content,
        author: activeUser._id,
      };
      await addCommService(params.gameId, addComment);      
      navigate("/profile");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div>
      <h3>Tu opinión sobre el juego</h3>
      <form onSubmit={handleSubmit}>
        <br />
        <label htmlFor="content"></label>
        <br />
        <textarea
          className="comment-input"
          type="text"
          name="content"
          onChange={handleContentChange}
          value={content}
        />
        <br />

        <button className="buttons" type="submit">
          Enviar
        </button>
        {errorMessage && (
          <p style={{ fontWeight: "bold", color: "red" }}>{errorMessage}</p>
        )}
      </form>
    </div>
  );
}

export default CreateComment;
