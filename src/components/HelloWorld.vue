<template>
  <div class="md-layout md-gutter md-alignment-top-center">
    <div class="md-layout-item" v-for="person of peopleWithImage">
      <md-card>
        <md-card-media>
          <img :src="getPic(person.img)" alt="People">
        </md-card-media>
        <md-card-header>
          <div class="md-title">Nascimento: {{person.birth_year}}</div>
          <div class="md-subhead">Sexo: {{person.gender}}</div>
        </md-card-header>
        <md-card-expand>
          <md-card-actions md-alignment="space-between">
            <div>
              <md-button>Action</md-button>
            </div>
            <md-card-expand-trigger>
              <md-button>Learn more</md-button>
            </md-card-expand-trigger>
          </md-card-actions>
          <md-card-expand-content>
            <md-card-content>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
            </md-card-content>
          </md-card-expand-content>
        </md-card-expand>
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
        images: [{
            id: 1,
            img: "1.jpg"
          },
          {
            id: 2,
            img: "2.jpg"
          },
          {
            id: 3,
            img: "3.jpg"
          },
          {
            id: 4,
            img: "4.jpg"
          },
          {
            id: 5,
            img: "5.jpg"
          },
          {
            id: 6,
            img: "6.jpg"
          },
          {
            id: 7,
            img: "7.jpg"
          },
          {
            id: 8,
            img: "8.jpg"
          },
          {
            id: 9,
            img: "9.jpg"
          },
          {
            id: 10,
            img: "10.jpg"
          }
        ]
      }
    },
    methods: {
      // mountImagePath: function(img){
      //         return require('@/assets/people/'+ img + '.jpg')
      //       },
      //   getImgUrl(pic) {
      //     return require('../assets/'+pic)
      // }
      getPic(person) {
        return require('@/assets/img/people/' + person)
      }
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
        for (let i = 0; i < this.images.length; i++) {
          let imagesId = this.images[i].id;
          console.log(imagesId)
          for (let i = 0; i < this.people.length; i++) {
            let idStarWarsApi = this.people[i].url.match(/\/([^\/]+)\/?$/)[1];
            if (imagesId === parseInt(idStarWarsApi)) {
              let combined = { ...this.people[i],
                ...this.images[i]
              }
              peopleFinal.push(combined)
              // console.log(combined);
              // let x = this.people[i].push(images[i]);
              // return this.people[i] = x;
            }
          }
        }
        console.log("CONSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSOLE" + peopleFinal);
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
    >.md-card-media{
 height: 180px!important;
    overflow: hidden;
    }
  }



</style>
