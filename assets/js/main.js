// c3425076f0ff558c6137588bf0383e0c



let app = new Vue({
  el: '#app',
  data: {
    sectionActive:'all',
    genreActive:'Tutti',
    searchText: '',
    searchResultsMovie: [],
    searchResultsTV: [],
    searchResultsTotal: [],
    totalSearch: '',
    genreMap:'',
    showChevron: false,
    hamburger: false,
  },
  methods: {

    getGenre: function(array){
      // console.log(array);
      let generi = [];
      array.forEach(e=>{
        const id = e;
        this.getGenreName(this.genreMap,generi,id);
        // this.genreMap.forEach(e=>{
        //   if (e.id === id) {
        //     // console.log(e.name);
        //     generi.push(e.name);
        //   }
        // });
      });
      // console.log(generi);
      return generi;
    },
    getGenreName: function(array,target, id){
      array.forEach(e=>{
        // console.log('ciao');
        if (e.id === id) {
          // console.log(e.name);
          target.push(e.name);
        }

      });
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

    initGenreMap: function(){
      axios
        .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=c3425076f0ff558c6137588bf0383e0c&language=it`)
        .then(resp =>{
          this.genreMap = resp.data.genres;
          this.genreMap.unshift({
            id:100000000000,
            name: 'Tutti',
          })
        })
        .catch()

    },
    resizeCard: function(object){
      console.log(true);
      object.resize = !object.resize;
    },
    getSearch:function(search){
      this.showChevron = true;
      if (search ==='') {
        this.showChevron = false;

      }
      this.searchResultsMovie=[];
      this.searchResultsTV= [];
      this.searchResultsTotal= [];

      Promise.all(
        [axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c3425076f0ff558c6137588bf0383e0c&language=it&query=${search}&page=1&include_adult=false`),
        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=c3425076f0ff558c6137588bf0383e0c&language=it&query=${search}&page=1&include_adult=false`)
        ])
        .then(resp => {
          // console.log(resp);
          // this.searchResultsMovie = resp[0].data.results;
          if (this.sectionActive==='movie'|| this.sectionActive==='all') {

            const ResultsMovie = resp[0].data.results;
            ResultsMovie.forEach(e=>{
              // console.log(e.genre_ids);
              const generi = this.getGenre(e.genre_ids);


              if (this.genreActive === 'Tutti') {
                this.searchResultsMovie.push({
                  titolo: e.title,
                  titoloOriginale: e.original_title,
                  linguaOriginale: e.original_language,
                  poster: e.poster_path,
                  voto: Math.ceil(e.vote_average/2),
                  overview: e.overview,
                  id: e.id,
                  genere: generi,
                  resize: false,


                });

              }else{
                if (generi.includes(this.genreActive)) {
                  this.searchResultsMovie.push({
                    titolo: e.title,
                    titoloOriginale: e.original_title,
                    linguaOriginale: e.original_language,
                    poster: e.poster_path,
                    voto: Math.ceil(e.vote_average/2),
                    overview: e.overview,
                    id: e.id,
                    genere: generi,
                    resize: false,


                  });

                }
              }



            });
          }

          if (this.sectionActive==='tv'|| this.sectionActive==='all') {


            const ResultsTV = resp[1].data.results;
            ResultsTV.forEach(e=>{
              const generi = this.getGenre(e.genre_ids);

              if (this.genreActive === 'Tutti') {
                this.searchResultsMovie.push({
                  titolo: e.name,
                  titoloOriginale: e.original_name,
                  linguaOriginale: e.original_language,
                  poster: e.poster_path,
                  voto: Math.ceil(e.vote_average/2),
                  overview: e.overview,
                  id: e.id,
                  genere: generi,
                  resize: false,


                });

              }else{
                if (generi.includes(this.genreActive)) {
                  this.searchResultsMovie.push({
                    titolo: e.name,
                    titoloOriginale: e.original_name,
                    linguaOriginale: e.original_language,
                    poster: e.poster_path,
                    voto: Math.ceil(e.vote_average/2),
                    overview: e.overview,
                    id: e.id,
                    genere: generi,
                    resize: false,


                  });

                }
              }
            });
          }
          // this.searchResultsTV = resp[1].data.results;



          if (this.sectionActive==='movie'|| this.sectionActive==='all') {

            this.searchResultsMovie.forEach(e =>{
              const id = e.id;
              axios.get(`http://api.themoviedb.org/3/movie/${id}/casts?api_key=c3425076f0ff558c6137588bf0383e0c`)
                .then(resp =>{
                  const dataCast = resp.data.cast;
                  let cast = '';




                  if (dataCast.length >0) {

                    for (var i = 0; i < dataCast.length && i < 5; i++) {
                      if (i == 0) {
                        cast += dataCast[i].name
                      }else{

                        cast += `, ${dataCast[i].name}`
                      }
                    }
                  }




                  e.cast = cast;
                })
                .catch();
              });
          }

          if (this.sectionActive==='tv'|| this.sectionActive==='all'){

            this.searchResultsTV.forEach(e =>{
              const id = e.id;
              axios.get(`http://api.themoviedb.org/3/tv/${id}/credits?api_key=c3425076f0ff558c6137588bf0383e0c`)
                .then(resp =>{
                  const dataCast = resp.data.cast;
                  let cast = '';




                  if (dataCast.length >0) {

                    for (var i = 0; i < 5 && i < dataCast.length; i++) {
                      if (i == 0) {
                        cast += dataCast[i].name
                      }else{

                        cast += `, ${dataCast[i].name}`
                      }
                    }
                  }



                  e.cast = cast;

                })
                .catch();



              });
          }


          // QUESTA PARTE NON MI PIACE PROPRIO PER NIENTE

          this.searchResultsTotal = this.searchResultsMovie.concat(this.searchResultsTV);
          // console.log(this.searchResultsTotal);
          // QUESTA PARTE NON MI PIACE PROPRIO PER NIENTE
        })
        .catch(error =>{console.log(error)});
    },
    activemovie: function(){
      this.sectionActive = 'movie';
      this.getSearch(this.searchText);
    },
    activetv: function(){
      this.sectionActive = 'tv';
      this.getSearch(this.searchText);
    },
    activeall: function(){
      this.sectionActive = 'all';
      this.getSearch(this.searchText);

    },
    activegenre: function(val){
      this.genreActive = val;
      this.getSearch(this.searchText);

    },
    hamburgerButton: function(){
      this.hamburger = !this.hamburger;
    },


  },
  mounted() {

    this.initGenreMap();
    // this.getSearch('ritorno');


  }
});
