<template>
  <div>
    <div class="main-content">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Adicionar Usuário</div>
            </div>
            <div class="card-body">
              <hr />
              <br />
              <div class="row">
                <div class="col-md-12">
                  <form action>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="Name">
                          <span class="required">*</span> Nome:
                        </label>
                        <input
                          autocomplete="new-password"
                          type="text"
                          id="Name"
                          class="form-control"
                          v-model="users.name"
                          placeholder=""
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="Email">
                          <span class="required">*</span> Email:
                        </label>
                        <input
                          autocomplete="new-password"
                          class="form-control"
                          id="Email"
                          placeholder=""
                          type="text"
                          v-model="users.email"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="Cellphone">Celular:</label>
                        <input
                          autocomplete="new-password"
                          class="form-control"
                          id="Cellphone"
                          type="text"
                          v-mask="'(99) 99999-9999'"
                          v-model="users.cellphone"
                          placeholder=""
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="Phone">Telefone:</label>
                        <input
                          autocomplete="new-password"
                          type="text"
                          class="form-control"
                          id="Phone"
                          v-model="users.cellphone"
                          v-mask="'(99) 99999-9999'"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-2">
                        <label for="inputUser">
                          <span class="required">*</span> Nível de acesso:
                        </label>
                        <select
                          v-model="users.access_nivel"
                          class="form-control"
                        >
                          <option :value="1" :key="1">Usuário Padrão</option>
                          <option :value="2" :key="2">Gestor Empresa</option>
                          <option
                            v-if="$store.state.user.access_nivel == 6"
                            :value="6"
                            :key="6"
                          >
                            Administrador
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="row" v-if="$route.params.id">
                      <div class="col-md-12 mb-2">
                        <button
                          type="button"
                          class="btn btn-add"
                          @click="toggleFormSenha"
                        >
                          <i class="fas fa-key"></i> Alterar Senha
                        </button>
                      </div>
                    </div>
                    <div class="form-row" v-if="change_password">
                      <div class="form-group col-md-6">
                        <label for="password">
                          <span class="required">*</span> Senha:
                        </label>
                        <input
                          autocomplete="new-password"
                          type="password"
                          id="password"
                          class="form-control"
                          v-model="users.password"
                          placeholder=""
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="confirmPassword">
                          <span class="required">*</span> Confirme a senha:
                        </label>
                        <input
                          autocomplete="new-password"
                          class="form-control"
                          id="confirmPassword"
                          placeholder=""
                          type="password"
                          v-model="users.password_confirmation"
                        />
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="userPic"> Foto do Perfil </label>
                      <div class="user-img">
                        <img
                          v-if="previewImage"
                          :src="previewImage"
                          class="photo"
                        />
                        <img v-else class="photo" />
                      </div>
                      <input
                        type="file"
                        class=""
                        id="userPic"
                        accept="image/*"
                        name="userPic"
                        @change="uploadImage"
                        placeholder
                      />
                    </div>
                    <span class="required_fields">
                      <span class="required">*</span>
                      <strong>Campos obrigatórios</strong>
                    </span>
                    <div class="block text-right">
                      <router-link to="/users" class="btn btn-back">
                        <i class="fa fa-arrow-left"></i> Voltar
                      </router-link>
                      <a class="btn btn-add ml-1" @click="save">
                        Salvar
                        <i class="fa fa-save"></i>
                      </a>
                    </div>
                  </form>
                </div>
              </div>
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
      users: {
        name: "",
        email: "",
        cellphone: "",
        telphone: "",
        photo: "",
        access_nivel: "",
        password: "",
        password_confirmation: "",
      },
      companies: {},
      departments: {},

      errors: undefined,

      previewImage: null,
    };
  },
  computed: {},
  methods: {
    toggleFormSenha() {
      const self = this;
      if (self.change_password) {
        self.change_password = false;
      } else {
        self.change_password = true;
      }
    },
    makeFormData: function () {
      const self = this;
      let fd = new FormData();

      let photo = document.getElementById("userPic");

      fd.append("name", self.users.name);
      fd.append("email", self.users.email);
      fd.append("cellphone", self.users.cellphone);
      fd.append("access_nivel", self.users.access_nivel);
      fd.append("password", self.users.password);
      fd.append("password_confirmation", self.users.password_confirmation);
      fd.append("accept_terms", 0);
      fd.append("calendar_color", self.users.calendar_color);

      fd.append("_method", "POST");

      fd.append("photo", photo.files[0] ? photo.files[0] : "");

      if (self.users.id) {
        fd.append("id", self.users.id);
        fd.append("_method", "PUT");
      }

      return fd;
    },
    save: function () {
      const self = this;
      let api = self.$store.state.api + "users";

      let fd = self.makeFormData();

      if (self.users.id) {
        api += "/" + self.users.id;
      }

      self.$http
        .post(api, fd)
        .then((response) => {
          self.$message(
            "Sucesso",
            `Informações guardadas com sucesso`,
            "success"
          );
          this.$router.push("/users");
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    getUsers: function (id) {
      const self = this;
      const api = self.$store.state.api + "users/" + id;

      self.$http
        .get(api)
        .then((response) => {
          self.users = response.data.data[0];
          self.users.password = "";
          self.change_password = false;
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
    },
  },
  mounted: function () {
    const self = this;
    let id = self.$route.params.id;

    if (id) {
      self.change_password = false;
      self.getUsers(id);
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