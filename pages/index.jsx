import { Content } from "../components/home/content";
import { PrivateRoute } from "../components/privateroute";

const Home = () => {
  return (
    <PrivateRoute>
      <Content />
    </PrivateRoute>
  );
};

export default Home;
