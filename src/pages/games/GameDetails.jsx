import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Vortex } from "react-loader-spinner";
import ReactPlayer from "react-player";
import {
  deleteGameService,
  gamesDetailsService,
} from "../../services/game.services";
//import IsPrivate from "../../components/auth/IsPrivate";
import { AuthContext } from "../../context/auth.context";
import {
  createCommentService,
  deleteCommentService,
  getCommentService,
} from "../../services/comments.services";
import {
  addFavGameService,
  removeFavService,
} from "../../services/favorites.services";

function GameDetails() {
  const [singleGame, setSingleGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [createComment, setCreateComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const { isLoggedIn, isAdmin } = useContext(AuthContext);

  const { gameId } = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await gamesDetailsService(gameId);
      //console.log(gameDetail);
      //console.log(response);
      const commentsResponse = await getCommentService(gameId);
      setSingleGame(response.data.game);
      setAllComments(commentsResponse.data);
      //console.log(activeUser);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteGameService(gameId);
      navigate("/games");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleCreateComment = async (event) => {
    event.preventDefault();
    const newComment = {
      content: createComment,
    };
    try {
      const responseCreateComment = await createCommentService(
        gameId,
        newComment
      );
      const response = await getCommentService(gameId);
      //console.log(responseCreateComment)
      console.log(response.data);
      const comments = response.data;
      setAllComments(comments);
      setCreateComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commId) => {
    try {
      await deleteCommentService(gameId, commId);
      const searchComment = allComments.filter((eachComment) => {
        return eachComment._id !== commId;
      });
      setAllComments(searchComment);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleAddFavourite = async () => {
    try {
      await addFavGameService(gameId);
      await getData();
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  const handleDeleteFavourite = async () => {
    try {
      await removeFavService(gameId);
      await getData();
    } catch (error) {
      //console.log(error);
      navigate("/error");
    }
  };

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
    <Container className="mt-4">      
      {isAdmin && (
        <Link to={`/games/${gameId}/edit`}>
          <Button variant="primary">Editar Juego</Button>
        </Link>
      )}
      {isAdmin && (
        <Button variant="danger" onClick={handleDelete}>
          Eliminar Juego
        </Button>
      )}
      <h1>Detalles de {singleGame.name}</h1>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="mb-4">
            <Card.Img
              src={singleGame.image}
              alt={singleGame.name}
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Text
                className="text-center"
                style={{ maxWidth: "500px", margin: "0 auto" }}
              >
                {singleGame.description}
              </Card.Text>
              <Card.Text>
                <strong>Género:</strong> {singleGame.genre.join(", ")}
              </Card.Text>
              <Card.Text>
                <strong>Plataformas disponibles:</strong>{" "}
                {singleGame.platform.join(", ")}
              </Card.Text>
              <section>
                {isLoggedIn && (
                  <button onClick={handleAddFavourite}>
                    Añadir juego a favoritos
                  </button>
                )}
                {isLoggedIn && (
                  <button onClick={handleDeleteFavourite}>
                    Eliminar de favoritos
                  </button>
                )}
              </section>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                <strong>Video demostración</strong>
              </Card.Title>
              <div className="d-flex justify-content-center">
                <ReactPlayer
                  url={singleGame.gameplay}
                  controls={true}
                  volume={0.05}
                />
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                {isLoggedIn && <strong>Opina sobre el juego</strong>}
              </Card.Title>
              {isLoggedIn && (
                <div>
                  <form onSubmit={handleCreateComment}>
                    <input
                      type="text"
                      name="comment"
                      onChange={(e) => setCreateComment(e.target.value)}
                      value={createComment}
                    />
                    <button type="submit">Enviar</button>
                  </form>
                </div>
              )}
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div>
                <h1>Comentarios</h1>
                {allComments.map(({ content, author, _id }) => {
                  return (
                    <div key={_id}>
                      <strong>Autor: {author && author.username}</strong>
                      <p>{content}</p>
                      {isLoggedIn && (
                        <button onClick={() => handleDeleteComment(_id)}>
                          Borrar comentario
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default GameDetails;
