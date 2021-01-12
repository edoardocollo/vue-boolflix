let app = new Vue({
  el: '#app',
  data: {
    searchText:'',
    searchResults:[],
  },
  methods: {
    getSearch: function(search) {
      var config = {
        method: 'get',
        url: `https://api.themoviedb.org/3/search/movie?api_key=c3425076f0ff558c6137588bf0383e0c&language=it&query=${search}&page=1&include_adult=false`,
        headers: {}
      };

      axios(config)
        .then(function(response) {
          const data = response.data.results;
          console.log(data);
          data.forEach(e=>{
            let votoTemp = Math.round(e.vote_average/2);
            let votoStarsActive = [];
            let votoStarsRest = [];
            for (var i = 0; i < votoTemp; i++) {
              votoStarsActive.push('#');
            }
            for (var i = 0; i < (5 - votoTemp); i++) {
              votoStarsRest.push('#')
            }
            app.searchResults.push({
              titolo: e.title,
              titoloOriginale: e.original_title,
              linguaOriginale: e.original_language,
              voto: Math.round(e.vote_average/2),
              stelle: votoStarsActive,
              stelleRest: votoStarsRest,
              poster: e.poster_path,
              flag: e.backdrop_path
            });
          });



        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getURL: function(path){
      const fullPath = 'https://image.tmdb.org/t/p/w500'+path;
      return fullPath;
    },
  },
  mounted() {

  }
});
