<template>
  <div class="md-layout md-gutter md-alignment-top-center">
    <div v-if="loading" v-cloak class="loading">
      <Loader/>
    </div>
    <div v-else class="md-layout-item" v-for="person of peopleWithImage">
      <md-card>
        <!-- <md-card-media :style="getBackground(getPic(person.img))"> -->
        <md-card-media :style="getBackground(person.img)">
          <!-- <img :src="getPic(person.img)" alt="People"> -->
        </md-card-media>
        <md-card-header>
          <div class="md-title">Nascimento: {{person.birth_year}}</div>
          <div class="md-subhead">Sexo: {{person.gender}}</div>
          <div class="md-subhead">Nome: {{person.name}}</div>
          <md-field>
            <label>Escreva o nome aqui!</label>
            <md-input v-model="type"></md-input>
          </md-field>
        </md-card-header>
        <md-card-expand>
          <md-card-actions>
            <md-card-expand-trigger>
              <md-button class="md-fab md-mini md-primary">
                <md-icon>add</md-icon>
              </md-button>
            </md-card-expand-trigger>
          </md-card-actions>
          <md-card-expand-content>
            <md-card-content>
              O personagem possui altura de {{person.height}}, massa de {{person.mass}}, seu cabelo é {{person.hair_color}}, tem olhos {{person.eye_color}}. Nasceu em {{person.homeworld}} e tem a pele {{person.skin_color}}
            </md-card-content>
          </md-card-expand-content>
        </md-card-expand>
      </md-card>
    </div>
  </div>
</template>

<script>
  import 'setimmediate';
  import axios from 'axios';
  import searchImage from '../search-img.js';
  import Loader from './shared/loader'
  export default {
    name: 'Home',
    data() {
      return {
        type: null,
        bottom: false,
        loading: false,
        people: [],
        nextPage: [],
        previousPage: [],
        newPage: [],
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
          },
          {
            id: 11,
            img: "1.jpg"
          },
          {
            id: 12,
            img: "2.jpg"
          },
          {
            id: 13,
            img: "3.jpg"
          },
          {
            id: 14,
            img: "4.jpg"
          },
          {
            id: 15,
            img: "5.jpg"
          },
          {
            id: 16,
            img: "6.jpg"
          },
          {
            id: 17,
            img: "7.jpg"
          },
          {
            id: 18,
            img: "8.jpg"
          },
          {
            id: 19,
            img: "8.jpg"
          },
          {
            id: 20,
            img: "10.jpg"
          }
        ]
      }
    },
    components: {
      Loader
    },
    methods: {
      bottomVisible() {
        const scrollY = window.scrollY
        const visible = document.documentElement.clientHeight
        const pageHeight = document.documentElement.scrollHeight
        const bottomOfPage = visible + scrollY >= pageHeight
        return bottomOfPage || pageHeight < visible
      },
      addPage() {
        // alert("CHAMOU")
        // alert(this.nextPage)
        let len = this.people.lenght;
        let addr;
        if (this.nextPage == '') {
          // alert("FALSO")
          addr = "https://cors-anywhere.herokuapp.com/https://swapi.co/api/people";
        } else if (((this.nextPage).match(/\/([^\/]+)\/?$/)[0]).split('=')[1] == 2) {
          // alert("VERDADEIRO")
          // alert(this.nextPage)
          addr = 'https://cors-anywhere.herokuapp.com/' + this.nextPage;
        } else {
          return
          addr = 'https://cors-anywhere.herokuapp.com/';
        }
        axios.get(addr)
          .then(response => {
            this.newPage = response.data.results;
            this.nextPage = response.data.next;
            this.previousPage = response.data.previous;
            this.people = this.people.concat(this.newPage);
            if (this.bottomVisible()) {
              this.addPage();
              console.log(this.people);
            }
          })
      },
      getPic(person) {
        return require('@/assets/img/people/' + person)
      },
      getBackground: function(getPicPerson) {
        let addrs = getPicPerson;
        return [{
            'background': 'url(' + addrs + ') no-repeat top center'
          },
          {
            'background-size': 'cover'
          }
        ]
      }
    },
    watch: {
      bottom(bottom) {
        if (bottom) {
          this.addPage();
        }
      }
    },
    asyncComputed: {
      async peopleWithImage() {
        this.loading = true;
        let people = this.people;
        let peopleFinal = [];
        for (let i = 0; i < people.length; i++) {
          let imgSelected = {};
          let index = people[i];
          let name = index.name;
          // console.log("NOME: " + name);
          // console.log('index.img: ', index.img);
          if (index.img === '' || index.img === null || index.img === undefined) {
            // console.log('imgSelected: ', imgSelected);
            // console.log('imgSelectedNAME: ', name);
            let imgMatch = await searchImage(name);
            // console.log('imgMatch: ', imgMatch);
            imgSelected = imgMatch;
            // console.log('imgSelected: ', imgSelected);
          } else {
            imgSelected = index.img;
          }
          let combined = { ...index,
            img: imgSelected
          };
          // console.log('combined: ', combined);
          peopleFinal.push(combined);
        }
        console.log('peopleFinal: ', peopleFinal);

        this.loading = false;

        return peopleFinal;
      }

    },
    created() {
      this.loading = true;
      // axios.get(`https://cors-anywhere.herokuapp.com/https://swapi.co/api/people`)
      //   .then(response => {
      //     this.people = response.data.results;
      //     this.nextPage = response.data.next;
      //     this.previousPage = response.data.previous;
      //   })
      //   .catch(e => {
      //     this.errors.push(e)
      //   })
      window.addEventListener('scroll', () => {
        this.bottom = this.bottomVisible()
      })
      this.addPage()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .loading {
    position: absolute;
    top: 0px;
    width: 100vw;
  }
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    >.md-card-media {
      height: 180px!important;
      overflow: hidden;
    }
  }
</style>
