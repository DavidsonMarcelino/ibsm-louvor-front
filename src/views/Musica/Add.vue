<template>
  <div>
    <div class="main-content">
      <div class="row">
        <div class="col-md-12">
          <div class="card p-1">
            <div class="row">
              <div class="col-12">
                <label>Nome</label>
                <input type="text" class="form-control" v-model="musica.nome" placeholder="Nome">
              </div>
              <div class="col-12 mt-1">
                <label>Banda</label>
                <v-select v-model="musica.banda_id" :options="bandas"
                  :reduce="(bandas) => bandas.id" :label="'nome'"></v-select>
              </div>
              <div class="col-12 mt-1">
                <label>Descrição</label>
                <textarea rows="2" class="form-control" v-model="musica.descricao" placeholder="Descrição"></textarea>
              </div>
              <div class="col-12 mt-1">
                <div class="row">
                  <div class="col-12">  
                    <label for="partituras" class="btn btn-primary p-1">
                      Insira as partituras (.mscz ou .pdf)
                      <input type="file" id="partituras" class="d-none" multiple @input="previewPartitura()">
                    </label>
                    <div class="col-12" v-if="preview.partitura.length">
                      <div class="row">
                        <div class="col-md-3" v-for="imagem in preview.partitura ">
                          <span
                            class="d-flex badge badge-secondary p-1"
                            style="width: 9vh !important; height: 9vh !important;"
                          >
                            <i class="fas fa-file-excel" style="font-size: 5vh!important;"></i>
                          </span><br>
                          {{ imagem }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 mt-1">
                <div class="row">
                  <div class="col-12">  
                    <label for="musica" class="btn btn-primary p-1">
                      Insira o arquivo da música (.mp3)
                      <input type="file" id="musica" class="d-none" @input="previewMusica()">
                    </label>
                    <div class="col-12" v-if="preview.musica">
                      <span class="d-flex badge badge-secondary p-1" style="width: 9vh !important; height: 9vh !important;"><i class="fas fa-file-excel" style="font-size: 5vh!important;"></i></span><br>
                      {{ preview.musica }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 mt-1">
                <div class="row">
                  <div class="col-12">
                    <label for="letra" class="btn btn-primary p-1">
                      Insira a letra (.docx ou .pdf)
                      <input type="file" id="letra" class="d-none" @input="previewLetra()">
                    </label>
                  </div>
                  <div class="col-12" v-if="preview.letra">
                    <span class="d-flex badge badge-secondary p-1" style="width: 9vh !important; height: 9vh !important;"><i class="fas fa-file-excel" style="font-size: 5vh!important;"></i></span><br>
                    {{ preview.letra }}
                  </div>
                </div>
              </div>
            </div>
            <div class="block text-right mt-1">
              <router-link to="/musicas" class="btn btn-back">
                <i class="fa fa-arrow-left"></i> Voltar
              </router-link>
              <a class="btn btn-add ml-1" @click="save">
                Salvar
                <i class="fa fa-save"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseCrud from "../../layouts/Base/BaseCrud";
import vSelect, { VueSelect } from "vue-select";

export default {
  name: "imageUpload",
  data() {
    return {
      bandas: [],
      musica: {
        banda_id:  "",
        nome:      "",
        descricao: "",
        Arquivos:  "",
      },

      preview: {
        partitura: [],
        musica: "",
        letra: "",
      }
    };
  },
  computed: {},
  methods: {
    save: function () {
      const self = this;
      let api = self.$store.state.api + "musicas";
      
      
      if (self.musica.id) {
        api += "/" + self.musica.id;
        self.musica._method='PUT';
      }

      let fd = self.makeFormData();

      self.$http
        .post(api, self.musica)
        .then(() => {
          self.$message(
            "Sucesso",
            `Informações guardadas com sucesso`,
            "success"
          );
          this.$router.push("/musicas");
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    makeFormData: function () {
      const self = this;
      let fd = new FormData();

      let photo = document.getElementById("images"); // Pega todas as fotos

      for(let i = 0 ; i < photo.files.length ; i++)
      {
        fd.append("photo_" + i, photo.files[i] ? photo.files[i] : ""); // Processa cada foto pra um append novo
      }

      fd.append("photo_length", photo.files.length); // Quantidade de fotos que estão sendo carregadas
      fd.append("user_id", self.$store.state.user.id); 
      fd.append("text", self.text);

      fd.append("_method", "POST");
      
      return fd;
    },
    getMusicas: function (id) {
      const self = this;
      const api = self.$store.state.api + "musicas/" + id;

      self.$http
        .get(api)
        .then((response) => {
          self.musica = response.data.data[0];
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    getBandas: function () {
      const self = this;
      const api = self.$store.state.api + "bandas/";

      self.$http
        .get(api)
        .then((response) => {
          self.bandas = response.data.data;
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    previewPartitura: function() {
      let partitura = document.getElementById("partituras");

      for(let i = 0 ; i < partitura.files.length ; i++)
      {
        this.preview.partitura[i] = partitura.files[i].name ? partitura.files[i].name : "";
      }
      this.preview.partitura.push()
    },
    previewMusica: function() {
      let musica = document.getElementById("musica");
      
      this.preview.musica = musica.files[0] ? musica.files[0].name : "";
    },
    previewLetra: function() {
      let letra = document.getElementById("letra");
      
      this.preview.letra = letra.files[0] ? letra.files[0].name : "";
    },
  },
  mounted: function () {
    const self = this;
    let id = self.$route.params.id;

    self.getBandas();

    if(id) {
      self.getMusicas(id);
    }
  },
  components: {
    BaseCrud,
    vSelect,
    VueSelect
},
};
</script>
<style scoped>
.profile_user {
  text-align: center;
}
.photo {
  display: block;
  margin-left: 5px;
  width: 18%;
  border-radius: 10px;
  max-width: 400px;
  max-height: 400px;
  object-fit: cover;
}
.btn-user:hover,
.btn-user[aria-expanded="true"] {
  background: linear-gradient(to right, #000, #666);
  color: #fff !important ;
}
.photo-title {
  color: #000;
  font-size: 18px;
  display: block;
  margin-left: 5px;
  width: 18%;
}
</style>