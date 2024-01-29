<template>
  <p class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">
      © {{ new Date().getFullYear() }}
      <b-link class="ml-25" href="https://it4d.com.br" target="_blank"
        >IT4D - Tecnologia para Decisão</b-link
      >
      <span class="d-none d-sm-inline-block"
        >, todos os direitos reservados</span
      >
    </span>
  </p>
</template>

<script>
import { BLink } from "bootstrap-vue";

export default {
  components: {
    BLink,
  },
};
</script>
