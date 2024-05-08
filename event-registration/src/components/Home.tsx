import Events from "./Events";
import "../assets/Home.css";
const Home = () => {
  return (
    <>
      <div className="home-page">
        <div className="container home-page" data-testid="events-component">
          <h1 className="text-center">Home</h1>
          <Events />
        </div>
      </div>
    </>
  );
};

export default Home;
