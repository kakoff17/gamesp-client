# GAMESP

## [Visita la página](https://gamesp.netlify.app/)

![GAMESP LOGO](https://imgur.com/gAwIOI5)

## Descripción

**NOTE -** Proyecto personal para poner a pruebas mis conocimientos de javascript y react. Es un proyecto sobre un catalogo de juegos donde puedes interactuar añadiendo comentarios y añadiendo los juegos a favoritos.
#### [Repositorio de cliente](https://github.com/kakoff17/gamesp-client)
#### [Repositorio de servidor](https://github.com/kakoff17/gamesp-server)

## Funcionalidades futuras

**NOTE -** 
-Implementar que en lugar de extraer la información de un JSON provenga de una API.
-Añadir un chat para comentar curiosidades sobre juegos.
-Añadir amigos entre usuarios para conocer sus juegos favoritos y poder curiosear.

## Tecnologías usadas

**NOTE -** List here all technologies used in the project like HTML, CSS, Javascript, React, axios, React Context etc.
- HTML
- CSS
- Javascript
- React
- Axios
- Bootstrap
- MongoDB
- Netlify
- Github


# Estructura de cliente

## Acciones de usuario

**NOTE -**  Todas las acciones que puede realizar el usuario:

- **404** - La página no existe. 
- **500** - Hay un error de nuestra parte. 
- **homepage** - Página principal básica
- **sign up** - Crea una cuenta para disfrutar de mas funcionalidades.
- **login** - Una vez que has creado la cuenta puedes hacer login y disfrutar de esas funcionalidades.
- **logout** - Una vez hayas acabado de interactuar por el momento, cierra tu sesión.
- **games list** - Puedes ver toda una lista de videojuegos con información sobre ellos
- **games details** - Puedes ver información mas especifica de cada juego así como interactuar con el.
- **events create** - Solo los administradores pueden crear juegos pero existe esa posibilidad.
- **games fav** - El usuario puede guardar los juegos como favoritos.
- **game comments** - El usuario puede dejar un comentario sobre el juego.
- **game comments** - 

## Rutas de

**NOTE -** Use below table to list your frontend routes

## React Router Routes (React App)
| Path                      | Page            | Components        | Permissions              | Behavior                                                             |
| ------------------------- | ----------------| ----------------  | ------------------------ | ------------------------------------------------------------         |
| `/`                       | Home            |                   | public                   | Home page                                                            |
| `/signup`                 | Signup          |                   | anon only `<IsAnon>`     | Formulario de registro, link a login, enviado a login al registrar   |
| `/login`                  | Login           |                   | anon only `<IsAnon>`     | Formulario de login, reenviado al perfil despues de acceder          |
| `/profile`                | Profile         | EditProfile       | user only `<IsPrivate>`  | Enviado a la pagina principal después de cerrar sesión               |
| `/profile/edit            | Profile         | EditProfile       | user only `<IsPrivate>`  | Edita los datos de acceso a tu cuenta                                |
| `/games/gameList`         | GameList        | GameCard          | public                   | Muestra toda la lista de juegos                                      |
| `/games/edit`             | GamesEdit       |                   | admin only `<IsAdmin>`   | Edita un juego y lo actualiza en la base de datos                    |
| `/games/create            | GamesCreate     | Form              | admin only `<IsAdmin>`   | Crea un juego y lo añade a la base de datos                          |


## Otros componentes

- Navbar
- Footer
- Search
- IsPrivate
- IsAdmin

## Servicios

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.verify()

- Backlog Service
  - gamesService()
  - createGameService(newGame)
  - gamesDetailsService(gameId)
  - deleteGameService(gameId)
  - editGameService(gameId, updatedGame)
  
- Profile Service
  - getProfileService
  - editProfileService(updatedProfile)
  - getFavGamesService

- Favorite Service
  - addFavGameService(gameId)
  - removeFavService(gameId)
  
- Comment Service
  - getCommentService(gameId)
  - createCommentService(gameId, newComment)
  - deleteCommentService(gameId, commId)

## Contexto

- auth.context

  
## Links

### Collaborators

[Carlos Ponce Diez](https://github.com/kakoff17)



### Project

[Repository Link Client](https://github.com/kakoff17/gamesp-client)

[Repository Link Server](https://github.com/kakoff17/gamesp-server/)

[Deploy Link](https://gamesp.netlify.app/)