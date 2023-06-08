import backgroundImage from "../../assets/1014.jpg";

function Error() {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: "1500px",
        width: "auto",
        backgroundSize: "cover",
      }}
    ></div>
  );
}

export default Error;
