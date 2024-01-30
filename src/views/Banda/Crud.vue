<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <base-crud
          :ref="'BandaCrud'"
          crudName="Bandas"
          newText="Nova Banda"
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
      table: "bandasTable",
      showMessageImport: false,
      usersCrud: {},
      pages: [],
      url: "",
      columns: ["id", "nome", "descricao", "actions"],
      tableData: ["id", "nome", "descricao"],
      options: {
        filterByColumn: true,
        debounce: 1000,
        filterable: ["name", "nome", "descricao"],
        pagination: { chunk: 10, dropdown: false, nav: "scroll" },
        perPage: 10,
        perPageValues: [10, 25, 50, 100],
        headings: {
          id: "ID",
          name: "Nome",
          descricao: "Descrição",
          actions: "Ações",
        },
        texts: {
          filterBy: "Filtrar",
          defaultOption: "Selecione",
        },
        listColumns: {},
        templates: {},
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
      endPoint: "bandas/",
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
        nome: "nome",
        descricao: "descricao",
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