let app = new Vue({
  el: '#app',
  data: {
    searchText:'',
    searchResults:'',
  },
  methods: {
    getSearch: function(search) {
      var config = {
        method: 'get',
        url: `https://api.themoviedb.org/3/search/movie?api_key=c3425076f0ff558c6137588bf0383e0c&language=it&query=${search}&include_adult=false`,
        headers: {}
      };

      axios(config)
        .then(function(response) {
          console.log(JSON.stringify(response.data));
          app.searchResults = response.data.results;
          console.log(app.searchResults);




        })
        .catch(function(error) {
          console.log(error);
        });
    }

  },
  mounted() {

  }
});
