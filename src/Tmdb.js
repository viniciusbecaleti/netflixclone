const API_KEY = "0cc24e896ab5cc6e7c2271162b4a170a";
const API_BASE = "https://api.themoviedb.org/3";

const basicFetch = async (endpoint) => {
  const response = await fetch(`${API_BASE}${endpoint}`);
  const json = await response.json();
  return json;
};

const getHomeList = async () => {
  return [
    {
      slug: "originals",
      title: "Originais do Netflix",
      items: await basicFetch(
        `/discover/tv?with_networks=213&language=pt-BR&api_key=${API_KEY}`,
      ),
    },
    {
      slug: "trending",
      title: "Recomendados para Você",
      items: await basicFetch(
        `/trending/all/week?language=pt-BR&api_key=${API_KEY}`,
      ),
    },
    {
      slug: "toprated",
      title: "Em Alta",
      items: await basicFetch(
        `/movie/top_rated?language=pt-BR&api_key=${API_KEY}`,
      ),
    },
    {
      slug: "action",
      title: "Ação",
      items: await basicFetch(
        `/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`,
      ),
    },
    {
      slug: "comedy",
      title: "Comédia",
      items: await basicFetch(
        `/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`,
      ),
    },
    {
      slug: "horror",
      title: "Terror",
      items: await basicFetch(
        `/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`,
      ),
    },
    {
      slug: "romance",
      title: "Romance",
      items: await basicFetch(
        `/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`,
      ),
    },
    {
      slug: "documentary",
      title: "Documentários",
      items: await basicFetch(
        `/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`,
      ),
    },
  ];
};

const getMovieInfo = async (movieId, type) => {
  let info = {};

  if (movieId) {
    switch (type) {
      case "tv":
        info = await basicFetch(
          `/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`,
        );
        break;
      default:
        info = await basicFetch(
          `/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`,
        );
        break;
    }
  }

  return info;
};

export { getHomeList, getMovieInfo };
