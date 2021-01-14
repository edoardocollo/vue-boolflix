let app = new Vue({
  el: '#app',
  data: {
    searchText: '',
    searchResults: [],
  },
  methods: {
    getSearch: function(search) {
      this.searchResults = [];








      var config = {
        method: 'get',
        url: `https://api.themoviedb.org/3/search/movie?api_key=c3425076f0ff558c6137588bf0383e0c&language=it&query=${search}&page=1&include_adult=false`,
        headers: {}
      };

      axios(config)
        .then(function(response) {
          const data = response.data.results;
          // console.log(data);
          data.forEach(e => {
            let votoTemp = Math.round(e.vote_average / 2);
            let votoStarsActive = [];
            let votoStarsRest = [];
            for (var i = 0; i < votoTemp; i++) {
              votoStarsActive.push('#');
            }
            for (var i = 0; i < (5 - votoTemp); i++) {
              votoStarsRest.push('#')
            }




            // var config = {
            //   method: 'get',
            //   url: 'http://api.themoviedb.org/3/movie/245/casts?api_key=c3425076f0ff558c6137588bf0383e0c',
            //   headers: {}
            // };
            //
            // axios(config)
            //   .then(function(response) {
            //     console.log(JSON.stringify(response.data.cast));
            //     const castTemp = response.data.cast;
            //     const cast = [];
            //     castTemp.forEach(e=>{
            //       cast.push(e.name);
            //     });
            //
            //   })
            //   .catch(function(error) {
            //     console.log(error);
            //   });









            app.searchResults.push({
              titolo: e.title,
              titoloOriginale: e.original_title,
              linguaOriginale: e.original_language,
              voto: Math.round(e.vote_average / 2),
              stelle: votoStarsActive,
              stelleRest: votoStarsRest,
              poster: e.poster_path,
              overview: e.overview,
              id: e.id,
              cast: '',

            });
          });


          // app.searchResults.forEach(e=>{
          //   let cast = app.getCast();
          //   e.cast = cast;
          // });

        })
        .catch(function(error) {
          console.log(error);
        });


      var config2 = {
        method: 'get',
        url: `https://api.themoviedb.org/3/search/tv?api_key=c3425076f0ff558c6137588bf0383e0c&language=it&query=${search}&page=1&include_adult=false`,
        headers: {}
      };

      axios(config2)
        .then(function(response) {
          const data = response.data.results;
          // console.log(data);
          data.forEach(e => {
            let votoTemp = Math.round(e.vote_average / 2);
            let votoStarsActive = [];
            let votoStarsRest = [];
            for (var i = 0; i < votoTemp; i++) {
              votoStarsActive.push('#');
            }
            for (var i = 0; i < (5 - votoTemp); i++) {
              votoStarsRest.push('#')
            }
            app.searchResults.push({
              titolo: e.name,
              titoloOriginale: e.original_name,
              linguaOriginale: e.original_language,
              voto: Math.round(e.vote_average / 2),
              stelle: votoStarsActive,
              stelleRest: votoStarsRest,
              poster: e.poster_path,
              overview: e.overview,

            });
          });



        })
        .catch(function(error) {
          console.log(error);
        });




    },

    getCast: function(id, index) {
      var config = {
        method: 'get',
        url: `http://api.themoviedb.org/3/movie/${id}/casts?api_key=c3425076f0ff558c6137588bf0383e0c`,
        headers: {}
      };

      axios(config)
        .then(function(response) {
          console.log(JSON.stringify(response.data));
          const cast = [];
          response.data.cast.forEach(function(e){
            cast.push(e.name);
          });
          app.searchResults[index].cast = cast;
        })
        .catch(function(error) {
          console.log(error);
        });
    },







    getPosterURL: function(path) {
      const fullPath = 'https://image.tmdb.org/t/p/w342' + path;
      return fullPath;
    },
    getFlag: function(linugua) {
      const flagPath = `img/${linugua}.jpeg`
      return flagPath;
    },
    getBackground: function(path) {
      let style = '';
      if (path != null) {
        style = `background-image: url('https://image.tmdb.org/t/p/w342${path}')`;
      } else {
        style = `background-image: url('img/bgc_notFound.jpeg')`;

      }
      return style;
    },
    slideArrayLeft: function(array) {
      const counter = 4;
      for (var i = 0; i < counter; i++) {
        array.push(array.shift());
      }
    },
    slideArrayRight: function(array) {
      const counter = 4;
      for (var i = 0; i < counter; i++) {
        array.unshift(array.pop());
      }
    },
    getCast: function() {
      var config = {
        method: 'get',
        url: 'http://api.themoviedb.org/3/movie/245/casts?api_key=c3425076f0ff558c6137588bf0383e0c',
        headers: {}
      };

      axios(config)
        .then(function(response) {
          let castTemp = response.data.cast;
          console.log(castTemp);
          let cast = [];
          castTemp.forEach(e => {
            cast.push(e.name);
          });

        })
        .catch(function(error) {
          console.log(error);
        });
      console.log(cast);

    },
  },
  mounted() {

  }
});
