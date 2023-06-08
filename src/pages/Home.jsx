import backgroundImg from "../assets/fondo-inicio.jpg";

function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    ></div>
  );
}

export default Home;
