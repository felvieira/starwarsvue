<template>
  <div class="md-layout md-gutter md-alignment-top-center">
    <div class="md-layout-item" v-for="person of peopleWithImage">
      <md-card>
        <!-- <md-card-media :style="getBackground(getPic(person.img))"> -->
        <md-card-media :style="getBackground(person.img)">
          <!-- <img :src="getPic(person.img)" alt="People"> -->
        </md-card-media>
        <md-card-header>
          <div class="md-title">Nascimento: {{person.birth_year}}</div>
          <div class="md-subhead">Sexo: {{person.gender}}</div>
          <div class="md-subhead">Sexo: {{person.name}}</div>
          <div class="md-subhead">IMG: {{person.img}}</div>
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
              O personagem possui altura de {{person.height}}, massa de {{person.mass}}, seu cabelo é {{person.hair_color}}, tem olhos {{person.eye_color}}. Nasceu em {{person.bith_year}} e tem a pele {{person.skin_color}}
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
  export default {
    name: 'Home',
    data() {
      return {
        type: null,
        bottom: false,
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
          // alert(this.nextPage)
          addr = "https://cors-anywhere.herokuapp.com/https://swapi.co/api/people";
        } else if (this.nextPage == 2) {
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
            console.log("PEople" + this.people)
            if (this.bottomVisible()) {
              this.addPage()
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
    computed: {
      peopleWithImage() {
        let peopleFinal = [];
        console.log('this.people: ', this.people);
        let imgSelected = {};
        for (let i = 0; i < this.people.length; i++) {
          let index = this.people[i];
          let name = index.name;
          console.log("NOME: " + this.people[i].name);
          console.log('index.img: ', index.img);
          if (index.img === '' || index.img === null || index.img === undefined) {
            console.log('imgSelected: ', imgSelected);
            console.log('imgSelectedNAME: ', name);
            alert(searchImage(name));
            let imgMatch = searchImage(name);
            console.log('imgMatch: ', toString(imgMatch));

            console.log('imgMatch: ', JSON.stringify(imgMatch[0]));
            imgSelected = imgMatch[0];
            console.log('imgSelected: ', imgSelected);
          } else {
            console.log("JA TEM")
            imgSelected = index.img;
          }
          let combined = { ...index,
            img: imgSelected
          };
          console.log('combined: ', combined);
          peopleFinal.push(combined);
        }
        // for (let i = 0; i < this.images.length; i++) {
        //   let imagesId = this.images[i].id;
        //   console.log(imagesId)
        //   for (let i = 0; i < this.people.length; i++) {
        //     let idStarWarsApi = this.people[i].url.match(/\/([^\/]+)\/?$/)[1];
        //     if (imagesId === parseInt(idStarWarsApi)) {
        //       let combined = { ...this.people[i],
        //         ...this.images[i]
        //       }
        //       peopleFinal.push(combined)
        //     }
        //   }
        // }
        return peopleFinal;
      },
    },
    created() {
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
