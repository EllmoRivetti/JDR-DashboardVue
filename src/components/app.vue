<template>
  <f7-app v-bind="f7params" >
  <!-- Views/Tabs container -->
  <f7-views tabs :animate= "true" :browser-history="true" :ios-dynamic-navbar="true" class="safe-areas">
    <!-- Tabbar for switching views-tabs -->
    <f7-toolbar tabbar labels bottom>
      <f7-link tab-link="#view-home" tab-link-active icon-ios="f7:house_fill" icon-aurora="f7:house_fill" icon-md="material:home" text="Home"></f7-link>
      <f7-link tab-link="#view-character" icon-ios="f7:person" icon-aurora="f7:person" icon-md="f7:person" text="Character"></f7-link>
      <f7-link v-if="this.charData.gameStates.talentUp" tab-link="#view-talent" icon-ios="f7:sparkles" icon-aurora="f7:sparkles" icon-md="f7:sparkles" text="Talents" color="black" style="background-color:yellow"></f7-link>
      <f7-link v-else tab-link="#view-talent" icon-ios="f7:sparkles" icon-aurora="f7:sparkles" icon-md="f7:sparkles" text="Talents"></f7-link>
      <f7-link tab-link="#view-map" icon-ios="f7:map" icon-aurora="f7:map" icon-md="f7:map" text="Map"></f7-link>
      <f7-link tab-link="#view-settings" icon-ios="f7:gear" icon-aurora="f7:gear" icon-md="material:settings" text="Settings"></f7-link>
    </f7-toolbar>

    <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
    <f7-view id="view-home" main tab tab-active url="/"></f7-view>

    <!-- Settings View -->
    <f7-view id="view-settings" name="settings" tab url="/settings/"></f7-view>

    <f7-view id="view-character" name="character" tab url="/character/"></f7-view>

    <f7-view id="view-talent" name="talent" tab url="/talent/"></f7-view>

    <f7-view id="view-map" name="map" tab url="/map/"></f7-view>

  </f7-views>
    
  </f7-app>
</template>
<script>
  import { ref, onMounted } from 'vue';
  import { f7, f7ready } from 'framework7-vue';


  import routes from '../js/routes.js';

  export default {
    data() {
      return {
        charData: this.$CharacterData
      }
    },
    setup() {

      // Framework7 Parameters
      const f7params = {
        name: 'JDR-Dashboard', // App name
        theme: 'auto', // Automatic theme detection

        // App routes
        routes: routes,
      };
      onMounted(() => {
        f7ready(() => {


          // Call F7 APIs here
        });
      });

      return {
        f7params,
      }
    }
  }
</script>