<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="card p-1">
          <FullCalendar :options="calendarOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BCardText, BLink } from "bootstrap-vue";

import { BCard, BCardBody, BAvatar } from "bootstrap-vue";

import moment from "moment";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import ptLocale from "@fullcalendar/core/locales/pt-br";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  data() {
    return {
      loadedComponent: false,
      actualDate: moment().format("LL"),
      actualMonth: moment().format("MMMM [de] YYYY"),

      calendarOptions: {
        allDaySlot: false,
        locale: ptLocale,
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        initialView: "timeGridWeek",
        height: "55vh",
        // editable: false,
        // selectable: true,
        // selectMirror: true,
        // dayMaxEvents: true,
        weekends: true,
        eventClick: this.handleEventClick,
        // eventsSet: this.handleEvents,
        // select: this.handleDateSelect,
        events: [],
        slotMinTime: "09:00:00",
        slotMaxTime: "22:00:00",
      },
    };
  },
  components: {
    BCard,
    BCardText,
    BLink,
    BCard,
    BCardBody,
    BAvatar,
    FullCalendar,
  },
  methods: {
    handleEventClick(clickInfo) {
      const self = this;

      console.log(clickInfo);
      // const api = self.$store.state.api + "home_offices/" + clickInfo.event.id;

      // self.stopover = [];

      // self.$http
      //   .get(api)
      //   .then((response) => {
        
      //   })
      //   .catch((error) => {
      //     self.$message(null, error.response.data, "error");
      //   });
      
      // $("#stopover").modal("show");
    },
    bringData: function () {
      const self = this;
      const api = self.$store.state.api + "calendario";

      self.$http
        .get(api)
        .then((response) => {
          self.calendarOptions.events = response.data;
        })
        .catch((error) => {
          self.$message("Erro", error.response.data, "error");
        });
      self.calendarOptions.events = [];
    },
  },
  mounted() {
    const self = this;

    self.bringData();

  },
  created() {},
};
</script>

<style>
</style>
