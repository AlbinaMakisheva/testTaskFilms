class LocalStorageSearchAPI {
  constructor(config) {
    const { key } = config;
    this.key = key;
  }

  search = async (stateQuery) => {
    const payload = JSON.parse(localStorage.getItem(this.key)) || [];
    const { queryString, filters, sortBy, sortOrder, page, size } = stateQuery;

    const filterArrayToObject = (filters) => {
      const cleanFilters = {};

      filters.forEach((filter) => {
        const [type, value] = filter;
        if (!cleanFilters[type]) {
          cleanFilters[type] = [];
        }
        cleanFilters[type].push(value);
      });

      return cleanFilters;
    };

    const cleanFilter = filterArrayToObject(filters);

    const filteredHits = payload.filter((film) => {
      const titleMatches =
        film.title.toLowerCase().includes(queryString.toLowerCase()) ||
        queryString === "";

      const genreMatches = cleanFilter.genre
        ? (cleanFilter.genre.length === 1 &&
            film.genre.includes(cleanFilter.genre[0])) ||
          (cleanFilter.genre.length > 1 &&
            cleanFilter.genre.every((filter) => film.genre.includes(filter)))
        : true;

      const yearMatches = cleanFilter.year
        ? (cleanFilter.year.length === 1 &&
            film.year.toString().split(",").includes(cleanFilter.year[0])) ||
          (cleanFilter.year.length > 1 &&
            cleanFilter.year.some((filter) =>
              film.year.toString().split(",").includes(filter)
            ))
        : true;

      return titleMatches && genreMatches && yearMatches;
    });

    const genreAggregation = this.getGenreAggregation(filteredHits);
    const yearAggregation = this.getYearAggregation(filteredHits);

    const sortedHits = filteredHits.sort((filmA, filmB) => {
      if (sortBy === "title") {
        return sortOrder === "asc"
          ? filmA.title.localeCompare(filmB.title)
          : filmB.title.localeCompare(filmA.title);
      } else if (sortBy === "year") {
        return sortOrder === "asc"
          ? filmA.year - filmB.year
          : filmB.year - filmA.year;
      } else {
        return filmA.title.localeCompare(filmB.title);
      }
    });

    const startIndex = (page - 1) * size;
    const endIndex = Math.min(startIndex + size, sortedHits.length);
    const paginatedHits = sortedHits.slice(startIndex, endIndex);

    let results = {
      hits: paginatedHits,
      total: sortedHits.length,
      aggregations: {
        genre: {
          buckets: genreAggregation,
        },
        year: {
          buckets: yearAggregation,
        },
      },
    };
    return results;
  };

  getGenreAggregation = (films) => {
    const genres = films.flatMap((film) => film.genre);
    const uniqueGenres = [...new Set(genres)];

    return uniqueGenres.map((genre) => ({
      key: genre,
      label: genre,
      doc_count: genres.filter((g) => g === genre).length,
    }));
  };

  getYearAggregation = (films) => {
    const years = films.flatMap((film) => film.year.toString().split(", "));
    const uniqueYears = [...new Set(years)];

    return uniqueYears.map((year) => ({
      key: year,
      label: year,
      doc_count: years.filter((y) => y === year).length,
    }));
  };
}

const searchApi = new LocalStorageSearchAPI({ key: "filmsdb" });

export default searchApi;
