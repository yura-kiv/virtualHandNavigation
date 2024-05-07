import Cards from "../../components/Cards/Cards";
import { useContext, useEffect } from "react";
import { ElementsContext } from "../../components/MainLayout/MainLayout";

const Home = () => {
  const { removeHoverElementsRefs } = useContext(ElementsContext);

  useEffect(() => {
    return () => {
      removeHoverElementsRefs();
    };
  }, []);

  return (
    <>
      <Cards />
    </>
  );
};

export default Home;
