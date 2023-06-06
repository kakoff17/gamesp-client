import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { deleteCommService, getCommService } from "../../services/game.services";
import { Vortex } from "react-loader-spinner";
import { Navigate } from "react-router-dom";

function Comments() {
  const [comments, setComments] = useState([]);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { activeUser } = useContext(AuthContext);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    try {
      const allComments = await getCommService(params.gameId);
      setComments(allComments.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (gameId, eachComment) =>{

    try {
      await deleteCommService(gameId, eachComment._id)
      Navigate(`/games/${gameId}/`)
    } catch (error) {
      Navigate("/error")
    }
}  

  if (isLoading) {
    return (
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={["red", "green", "blue", "yellow", "orange", "purple"]}
      />
    );
  }
  return (
    <div>
      <h3>Comentarios del juego</h3>
      {activeUser && (
        <Link to={`/games/${params.gameId}/comments/add`}>
          <button className="buttons">Haz tu comentario sobre el juego</button>
        </Link>
      )}
      <hr />
      <section className="comment-list">
        {comments.map((eachComment) => {
          return (
            <div key={eachComment._id} className="user-gamer">
              <p>Comentario: {eachComment.content}</p>
              <p>Autor: {eachComment.author}</p>
              {activeUser.role === "admin" && (<button onClick={handleDelete}>Eliminar comentario</button>)}
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default Comments;
