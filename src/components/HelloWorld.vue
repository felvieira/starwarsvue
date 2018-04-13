<template>
  <div class="md-layout md-gutter md-alignment-top-center">
    <div v-if="loading" v-cloak class="loading">
      <Loader/>
    </div>
    <div :id="`person-${person.id}`" v-else ref="card" class="md-layout-item" :key="person.id" v-for="(person, key) of peopleWithImage">
      <md-card>
        <!-- <md-card-media :style="getBackground(getPic(person.img))"> -->
        <md-card-media :style="getBackground(person.img)" ref="image">
          <!-- <img :src="getPic(person.img)" alt="People"> -->
        </md-card-media>
        <md-card-header>
          <div class="md-title">Quem sou eu?</div>
          <div class="md-subhead">NomeDigitado: {{person.nameTyped}}</div>
          <div class="md-subhead">Pontos: {{person.points}}</div>
          <md-field>
            <label>Escreva o nome aqui!</label>
            <md-input v-model="person.nameTyped" ref="input"></md-input>
          </md-field>
        </md-card-header>
        <md-card-expand>
          <md-card-actions>
            <md-button class="md-fab md-mini md-primary" ref="button_add" v-on:click="handleViewMore(key)">
              <md-icon>add</md-icon>
            </md-button>
            <md-card-expand-trigger style="display:none;">
              <md-button class="md-fab md-mini md-primary" ref="button_details">
                <md-icon>add</md-icon>
              </md-button>
            </md-card-expand-trigger>
            <md-button class="md-icon-button md-raised md-accent" ref="button_ok" v-on:click="anwserName(key)">
              <md-icon>thumb_up</md-icon>
            </md-button>
          </md-card-actions>
          <md-card-expand-content>
            <md-card-content>
              O personagem possui altura de {{person.height}}, massa de {{person.mass}}, seu cabelo é {{person.hair_color}}, tem olhos {{person.eye_color}}. Nasceu em {{person.homeworld}} e tem a pele {{person.skin_color}}
            </md-card-content>
          </md-card-expand-content>
        </md-card-expand>
      </md-card>
    </div>
    <md-button class="md-primary md-raised" v-on:click="handlePoints()">Testar</md-button>
        <md-dialog :md-active.sync="showDialog" v-model=pointsTotal>
          <md-dialog-title>Confira abaixo sua pontuação!</md-dialog-title>
          <md-tabs md-dynamic-height>
            <md-tab md-label="Pontuação">
              <h1>Sua pontuação total foi de: {{pointsTotal}}</h1>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
            </md-tab>
            <md-tab md-label="Se inscreva no Ranking">
              <md-field>
                <label>Escreva seu nome</label>
                <md-input v-model="ranking.name"></md-input>
                <p>{{ranking.name}}</p>
                <div>{{pointsTotal}}</div>
              </md-field>
              <md-field>
                <label>Escreva seu email</label>
                <md-input v-model="ranking.email"></md-input>
              </md-field>
               <md-button class="md-primary md-raised" @click="saveRanking()">Salvar</md-button>
               <md-button class="md-primary md-raised" @click="getRanking()">Carregar</md-button>
            </md-tab>
          </md-tabs>
          <md-dialog-actions>
            <md-button class="md-primary md-raised" @click="showDialog = false">Close</md-button>
            <md-button class="md-primary md-raised" @click="showDialog = false">Save</md-button>
          </md-dialog-actions>
        </md-dialog>
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
        ranking: {
          name: '',
          email: '',
          points: this.pointsTotal
        },
        showDialog: false,
        personComputed: [],
        nameType: '',
        bottom: false,
        loading: false,
        points: '',
        pointsTotal: '',
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
      saveRanking(){
        localStorage.setItem('ranking', JSON.stringify(this.ranking));
      },
      getRanking(){
        if (localStorage.getItem('ranking')) this.ranking = JSON.parse(localStorage.getItem('ranking'));
      },
      handlePoints() {
        let point = 0;
        for (let i = 0; i < this.peopleWithImage.length; i++) {
          let person = this.peopleWithImage[i];
          this.pointsFinal(person);
          point += person.points;
        }
        this.pointsTotal = point;
        this.showDialog = true;
      },
      handleViewMore(key) {
        this.$refs.button_details[key].$el.click();
        this.peopleWithImage[key].viewMore = true;
      },
      anwserName(key) {
        this.$refs.input[key].disabled = true;
        this.$refs.button_add[key].disabled = true;
        this.$refs.button_ok[key].disabled = true;
        this.$refs.card[key].classList.add("answered");
      },
      pointsFinal(person) {
        console.log('person: ', person);
        if (person.name == person.nameTyped) {
          if (person.viewMore == true) {
            person.points = 5
          } else {
            person.points = 10
          }
        } else {
          person.points = 0
        }
      },
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
          let ids = index.url.match(/\/([^\/]+)\/?$/)[1];
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
          let combined = {
            id: ids,
            nameTyped: '',
            points: 0,
            viewMore: false,
            ...index,
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
  .md-dialog {
    max-width: 768px;
  }
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
  .answered {
    .md-field:after {
      height: 0px;
    }
    >.md-card {
      .md-card-media {
        opacity: 0.3;
      }
      .md-card-header {
        .md-field {
          input.md-input {
            color: #1d1d1d!important;
            -webkit-text-fill-color: #1d1d1d!important;
          }
        }
        >div {
          color: #1d1d1d;
        }
      }
      .md-card-expand {
        button {
          background-color: #424242!important;
        }
      }
    }
    label {
      color: #1d1d1d!important;
    }
  }
</style>
