<template>
  <div>
    <div class="main-content">
      <div class="row">
        <div class="col-md-12">
          <div class="card p-1">
            <div class="row">
              <div class="col-12">
                <label>Nome</label>
                <input type="text" class="form-control" v-model="partitura.nome" placeholder="Nome">
              </div>
              <div class="col-12 mt-1">
                <label>Descrição</label>
                <textarea rows="4" class="form-control" v-model="partitura.descricao" placeholder="Descrição"></textarea>
              </div>
            </div>
            <div class="block text-right mt-1">
              <router-link to="/partituras" class="btn btn-back">
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
import vSelect from "vue-select";

export default {
  name: "imageUpload",
  data() {
    return {
      companies: [],
      departments: [],
      change_password: true,
      partitura: {
        
      },
      companies: {},
      departments: {},

      errors: undefined,

      previewImage: null,
    };
  },
  computed: {},
  methods: {
    save: function () {
      const self = this;
      let api = self.$store.state.api + "partituras";

      if (self.partitura.id) {
        api += "/" + self.partitura.id;
        self.partitura._method='PUT';
      }

      self.$http
        .post(api, self.partitura)
        .then(() => {
          self.$message(
            "Sucesso",
            `Informações guardadas com sucesso`,
            "success"
          );
          this.$router.push("/partituras");
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    getPartituras: function (id) {
      const self = this;
      const api = self.$store.state.api + "partituras/" + id;

      self.$http
        .get(api)
        .then((response) => {
          self.partitura = response.data.data[0];
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
  },
  mounted: function () {
    const self = this;
    let id = self.$route.params.id;

    if(id) {
      self.getPartituras(id);
    }
  },
  components: {
    BaseCrud,
    vSelect,
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