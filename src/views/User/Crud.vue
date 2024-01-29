<template>
  <div>
    <!-- <div class="row mr-1">
      <div class="col-12" align="right">
        <a
          :href="$store.state.api + 'download/import-model'"
          target="_blank"
          class="btn btn-add"
          >Modelo de Importação</a
        >
        <button class="btn btn-add" @click="openInput">
          Importar Usuários
        </button>
        <input
          name="fileImport"
          id="fileImport"
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          style="display: none"
          value="null"
          @change="importFile"
        />
      </div>
      <div class="col-md-12 mt-4" v-if="showMessageImport">
        <div class="alert alert-success" role="alert">
          <strong>Planilha importada com sucesso!</strong>
          <br />
          Definimos uma senha padrão para todos os usuários, a senha definida é:
          <strong>Alterar123</strong>, sugerimos que os usuários alterem-a logo
          no primeiro acesso.
        </div>
      </div>
    </div> -->

    <div class="row">
      <div class="col-md-12">
        <base-crud
          :ref="'usersCrud'"
          crudName="Usuários"
          newText="Novo Usuário"
          :table="table"
          :columns="columns"
          :options="options"
          :endPoint="endPoint"
          :enableAdd="true"
          :enableEdit="true"
          :enableDelete="true"
          :enableView="false"
          :enableReset="false"
          :dataForm="dataForm"
        >
        </base-crud>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCrud from "../../layouts/Base/BaseCrud";

export default {
  data: function () {
    return {
      table: "usersTable",
      showMessageImport: false,
      usersCrud: {},
      pages: [],
      url: "",
      columns: ["id", "photo", "name", "access_nivel", "email", "actions"],
      tableData: ["id", "photo", "name", "access_nivel", "email"],
      options: {
        filterByColumn: true,
        debounce: 1000,
        filterable: ["name", "access_nivel", "email"],
        pagination: { chunk: 10, dropdown: false, nav: "scroll" },
        perPage: 10,
        perPageValues: [10, 25, 50, 100],
        headings: {
          id: "ID",
          photo: "Foto",
          name: "Nome",
          access_nivel: "Nível de Acesso",
          email: "E-mail",
          actions: "Ações",
        },

        texts: {
          filterBy: "Filtrar",
          defaultOption: "Selecione",
        },
        listColumns: {
          access_nivel: [
            {
              id: 1,
              text: "Usuario Padrão",
            },
            {
              id: 2,
              text: "Gestor Empresa",
            },
            {
              id: 6,
              text: "Administrador",
            },
          ],
        },
        templates: {
          access_nivel: function (h, row, index) {
            return row.access_nivel == 1
              ? "Usuário Padrão"
              : row.access_nivel == 2
              ? "Gestor Empresa"
              : "Administrador";
          },
        },
        requestFunction: function (data) {
          let requestData = {};

          console.log(this.$parent.$parent);

          let query = this.$parent.$parent.$parent.query(data.query);
          requestData.params = data;
          requestData.params.query = "";
          requestData.params.with = [];

          return this.$http.get(this.url + "?" + query, requestData).catch(
            function (e) {
              this.dispatch("error", e);
            }.bind(this)
          );
        },
      },
      endPoint: "users/",
      dataForm: {},
    };
  },
  components: {
    BaseCrud,
  },
  methods: {
    makeFormData: function () {
      const self = this;
      let fd = new FormData();

      let fileImport = document.getElementById("fileImport");

      fd.append("fileImport", fileImport.files[0] ? fileImport.files[0] : "");

      return fd;
    },
    importFile() {
      const self = this;
      let api = self.$store.state.api + "import-users";

      let fd = self.makeFormData();

      self.$http
        .post(api, fd)
        .then((response) => {
          self.$message(
            "Sucesso",
            `Informações guardadas com sucesso`,
            "success"
          );
          self.showMessageImport = true;
          self.$refs.usersCrud.$refs.table.refresh();
        })
        .catch((error) => {
          self.$message(
            "Ops",
            "Houve um erro durante a importação da planilha, verifique a planilha e tente novamente.",
            "error"
          );
        });
    },
    query: function (query) {
      let columns = {
        id: "id",
        photo: "photo",
        name: "name",
        access_nivel: "access_nivel",
        email: "email",
      };
      let filters = "";
      $.each(query, function (index, value) {
        filters += columns[index] + "=" + value + "&";
      });
      return filters;
    },
    openInput() {
      document.getElementById("fileImport").click();
    },
  },
};
</script>

<style scoped>
.VuePagination {
  text-align: center;
}
.uploading-image {
  display: flex;
  border-radius: 10px;
  width: 100px;
  height: 100px;
}
</style>