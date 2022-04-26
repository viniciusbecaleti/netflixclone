import { getHomeList, getMovieInfo } from "./Tmdb";

// CSS
import "./App.css";
import { useEffect, useState } from "react";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // Selecionando categorias e puxando filmes de cada uma
      const list = await getHomeList();
      setMovieList(list);

      // Selecionando aleatóriamente um filme da categoria origiais netflix
      const originals = list.filter((item) => item.slug === "originals");
      const randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1),
      );
      const chosen = originals[0].items.results[randomChosen];
      const chosenInfo = await getMovieInfo(chosen.id, "tv");
      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 0) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {movieList.map((item, index) => (
          <MovieRow key={index} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com React JS <br /> Dados retirados do site Themoviedb.org
      </footer>

      {!movieList.length > 0 && !featuredData && (
        <div className="loading">
          <img
            src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_960,c_limit/Netflix_LoadTime.gif"
            alt="Loading"
          />
        </div>
      )}
    </div>
  );
}

export default App;
