<template>
  <div>
    <div v-if="loading" v-cloak class="loading">
      <Loader/>
    </div>
    <div v-else class="md-layout md-gutter md-alignment-top-center container-app">
      <div style="width:100%;display:block;">
        <md-button class="md-primary md-raised" v-on:click="handlePoints()">Testar</md-button>
      </div>
      <div :id="`person-${person.id}`" ref="card" class="md-layout-item" :key="person.id" v-for="(person, key) of fe">
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
    </div>
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
            <md-input v-model="newRanking.name"></md-input>
          </md-field>
          <md-field>
            <label>Escreva seu email</label>
            <md-input v-model="newRanking.email"></md-input>
          </md-field>
          <md-button class="md-primary md-raised" @click="saveRanking()">Salvar</md-button>
        </md-tab>
        <md-tab md-label="Ranking">
          <md-list class="md-triple-line">
            <md-list-item :key="index" v-for="(rank, index) of ranking">
              <md-avatar>
                <h1>{{rank.points}}</h1>
              </md-avatar>
              <div class="md-list-item-text">
                <span>{{rank.name}}</span>
                <span>{{rank.email}}</span>
                <p>I'll be in your neighborhood doing errands this week. Do you want to meet?</p>
              </div>
              <md-button class="md-icon-button md-list-action">
                <md-icon class="md-primary">star</md-icon>
              </md-button>
            </md-list-item>
            <md-divider class="md-inset"></md-divider>
          </md-list>
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button class="md-primary md-raised" @click="showDialog = false">Fechar</md-button>
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
        ranking: [],
        newRanking: {
          name: '',
          email: '',
          points: this.pointsTotal || 0
        },
        storage: {
          set: function(key, obj) {
            if (!key || !obj) {
              return;
            }
            if (localStorage.getItem(key)) {
              let oldStorage = localStorage.getItem(key);
              let newStorage = JSON.parse(oldStorage);
              let stored = obj;
              newStorage.push(stored);
              localStorage.setItem(key, JSON.stringify(newStorage));
            } else {
              let stored = [];
              stored.push(obj);
              localStorage.setItem(key, JSON.stringify(stored));
            }
          },
          get: function(key) {
            var value = localStorage.getItem(key);
            if (!value) {
              return;
            }
            value = JSON.parse(value);
            return value;
          }
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
        images: []
      }
    },
    components: {
      Loader
    },
    methods: {
      saveRanking() {
        // localStorage.setItem('ranking', JSON.stringify(this.ranking));
        this.storage.set('ranking', this.newRanking);
        this.getRanking();
      },
      getRanking() {
        this.storage.get('ranking');
        this.ranking = this.storage.get('ranking');
        console.log(this.ranking)
        // if (localStorage.getItem('ranking')) this.ranking = JSON.parse(localStorage.getItem('ranking'));
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
      async addPage() {
        console.log('Rodou AddPage');
        console.log('this.nextPage: ', this.nextPage);
        // alert("CHAMOU")
        // alert(this.nextPage)
        let addr;
        if (this.nextPage === undefined || this.nextPage === null) {
          console.log('this.nextPage é null: ', this.nextPage);
          addr = 'https://cors-anywhere.herokuapp.com/';
        } else {
          if ((this.nextPage).length > 0) {
            console.log("if 1")
            if (((this.nextPage).match(/\/([^\/]+)\/?$/)[0]).split('=')[1] > 1 && ((this.nextPage).match(/\/([^\/]+)\/?$/)[0]).split('=')[1] < 5) {
              console.log("if 2")
              // alert("VERDADEIRO")
              // alert(this.nextPage)
              addr = 'https://cors-anywhere.herokuapp.com/' + this.nextPage;
            }
          } else {
            // alert("FALSO")
            addr = "https://cors-anywhere.herokuapp.com/https://swapi.co/api/people";
          }
        }
        // } else {
        //   return
        //   addr = 'https://cors-anywhere.herokuapp.com/';
        // }
        this.loading = true;
        axios.get(addr)
          .then(response => {
            this.newPage = response.data.results;
            this.nextPage = response.data.next;
            this.previousPage = response.data.previous;
            this.people = this.people.concat(this.newPage);
            this.loading = false;
            // if (this.bottomVisible()) {
            //   this.addPage();
            // }
          })
          .catch(err => this.loading = false)
      },
      async peopleWithImage() {
        let next = this.nextPage;
        let people = this.people;
        let peopleFinal = [];
        let cachedPeopleWithImage = JSON.parse(sessionStorage.getItem("peopleWithImage"));
        async function newReq() {
          this.loading = true;
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
              nextPage: next,
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
          sessionStorage.setItem("peopleWithImage", JSON.stringify(peopleFinal));
          return peopleFinal;
        }
        if (cachedPeopleWithImage != null && cachedPeopleWithImage != 'undefined' && cachedPeopleWithImage != '') {
          this.loading = true;
          console.log("EXISTE CACHE");
          let cachedNext = cachedPeopleWithImage[(cachedPeopleWithImage.length) - 1].nextPage;
          let cachedRegex = ((cachedNext).match(/\/([^\/]+)\/?$/)[0]).split('=')[1];
          let nextRegex = ((next).match(/\/([^\/]+)\/?$/)[0]).split('=')[1];
          console.log('Valor cacheado é da pagina: ', cachedRegex);
          console.log('Valor da requisição é: ', nextRegex);
          if (parseInt(cachedRegex) < parseInt(nextRegex)) {
            console.log("EXISTE CACHE >> mas a requisição é nova");
            newReq();
          } else {
            console.log("EXISTE CACHE >> E BATE COM CACHE" + cachedPeopleWithImage);
            this.loading = false;
            return cachedPeopleWithImage
          }
        } else {
          console.log("NÃO EXISTE CACHE")
          newReq();
        }
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
      },
    },
    watch: {
      bottom(bottom) {
        if (bottom) {
          this.addPage();
        }
      }
    },
    asyncComputed: {
      async fe() {
        this.loading = true;
        let final = await this.peopleWithImage();
        this.loading = false;
        return final
      },
    },
    created() {
      // this.loading = true;
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
      this.addPage();
      this.getRanking();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.container-app{
   position: relative;
   z-index:300;
    padding:0% 10%;
    > .md-layout-item{
      margin-bottom:20px;
    }
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
  .md-dialog {
    max-width: 768px;
  }
  .loading {
    position: absolute;
    z-index:999;
    top: 0px;
    width: 100vw;
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
