<template>
  <div class="md-layout md-gutter md-alignment-top-center">
     <div class="md-layout-item"  v-for="person of peopleWithImage">
      <md-card>
        <md-card-media-cover md-text-scrim>
          <md-card-media md-ratio="16:9">
            <img src="@/assets/people/1.jpg" alt="Skyscraper">
          </md-card-media>

          <md-card-area>
            <md-card-header>
              <span class="md-title">Ano de nascimento : {{person.birth_year}}</span>
              <span class="md-subhead">Sexo: {{person.gender}}</span>
              <span class="md-subhead">Nome: {{person.name}}</span>
            </md-card-header>

            <md-card-actions>
              <md-button>Action</md-button>
              <md-button>Action</md-button>
            </md-card-actions>
          </md-card-area>
        </md-card-media-cover>
      </md-card>

    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {

      people: [],
      nextPage: [],
      previousPage: [],
      images: [
          {
            id: 1,
            img: "./assets/people/1.jpg"
          },
          {
            id: 2,
            img:"~/assets/people/2.jpg"
          },
          {
            id: 3,
            img:"@/assets/people/3.jpg"
          },
          {
            id: 4,
            img:"../img/people/4.jpg"
          },
          {
            id: 5,
            img: "../img/people/5.jpg"
          },
          {
            id: 6,
            img:"../assets/people/6.jpg"
          },
          {
            id: 7,
            img:"../assets/people/7.jpg"
          },
          {
            id: 8,
            img:"../assets/people/8.jpg"
          },
          {
            id: 9,
            img:"../assets/people/9.jpg"
          },
          {
            id: 10,
            img:"../assets/people/10.jpg"
          }
        ]
    }
  },
  methods: {
  // mountImagePath: function(img){
  //         return require('@/assets/people/'+ img + '.jpg')
  //       },
  },
    computed: {



      peopleWithImage() {


        // for (let i= 0; i < this.people.length; i++) {
        // let idStarWarsApi = this.people[i].url.match(/\/([^\/]+)\/?$/)[1];
        //  for (let i= 0; i < images.length; i++) {
        //     let imagesId = images[i].id;
        //     console.log(`${imagesId} - ${typeof(imagesId)} é igual a ${idStarWarsApi} - ${typeof(idStarWarsApi)}`);
        //      if(imagesId === parseInt(idStarWarsApi)){
        //       this.people[i].push(images[i])
        //     }
        //   }
        // }


        let peopleFinal = [];
        for (let i= 0; i < this.images.length; i++) {
          let imagesId = this.images[i].id;
          console.log(imagesId)
          for (let i= 0; i < this.people.length; i++) {
            let idStarWarsApi = this.people[i].url.match(/\/([^\/]+)\/?$/)[1];

            if(imagesId === parseInt(idStarWarsApi)){
              let combined = { ...this.people[i], ...this.images[i] }
              peopleFinal.push(combined)
              // console.log(combined);
              // let x = this.people[i].push(images[i]);
              // return this.people[i] = x;
            }
          }
        }

      console.log("CONSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSOLE"+peopleFinal);
      return peopleFinal;
      }
    },
   created() {
    axios.get(`https://cors-anywhere.herokuapp.com/https://swapi.co/api/people`, {
      headers: {


                baseURL: 'http://localhost:8080',
                timeout: 10000,
                withCredentials: false
      }
        })
    .then(response => {
      this.people = response.data.results;
    })
    .catch(e => {
      this.errors.push(e)
    })
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>
