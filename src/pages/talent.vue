<template>
  <f7-page name="character">
    <!-- Top Navbar -->
    <f7-navbar large :sliding="false">
      <f7-nav-right sliding>
        <f7-button fill popup-open=".demo-popup" :disabled='!this.charData.gameStates.talentUp'>Add Talent</f7-button>
        <f7-popup class="demo-popup" :opened="popupOpened" @popup:closed="popupOpened = false">
          <f7-page>
            <f7-navbar>
              <f7-nav-left>
                <f7-link popup-close><f7-icon f7="chevron_left"></f7-icon>Back</f7-link>
              </f7-nav-left>
              <f7-nav-title>Add a new talent</f7-nav-title>
              <f7-nav-right>
                <f7-link popup-close @click="AddTalent">Validate</f7-link>
              </f7-nav-right>
            </f7-navbar>
            <f7-block>
              <f7-list media-list>
                <f7-list-item v-for="t in this.talents" :key="t.name"
                  radio
                  name="talentToAdd"
                  :value="t.name"
                  :title="t.name"
                  :text="t.effect"
                  @change="talentToAdd = $event.target.value"
                ></f7-list-item>
              </f7-list>
            </f7-block>
          </f7-page>
        </f7-popup>
      </f7-nav-right>
      <f7-nav-title sliding>Talents</f7-nav-title>
      <f7-nav-title-large>Talents</f7-nav-title-large>
    </f7-navbar>
    
    <f7-block-title>Your character's talents</f7-block-title>
    <f7-list accordion-list sortable @sortable:sort="OnSort" media-list>
      <f7-list-item v-for="t in this.charData.characterTalent" :key="t.name" accordion-item :title="t.name" :text="t.effect">
        <f7-accordion-content>
          <f7-block >
            <f7-row>
              <span class="title description">Description:</span>
            </f7-row>
            <f7-row v-if="t.description !== ''" class="description">
              {{t.description}}
            </f7-row>
            <f7-row v-else >
              <img :src="t.image" class="description" style="max-width: 100%">
            </f7-row>
          </f7-block>
        </f7-accordion-content>
      </f7-list-item>
      <f7-list-item v-if="this.charData.characterTalent.length === 0">
        <p>You don't have any talent..</p>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>

import talents from '../json/talents.json'

export default {
  name: 'Talent',
  data() {
    return {
      talents: talents.sort((a, b) => a.name.localeCompare(b.name)),
      talentToAdd: '',
      charData: this.$CharacterData
    }
  },
  methods: {
    AddTalent()
    {
      this.charData.characterTalent.push(this.talents.find(e => e.name === this.talentToAdd))
      this.charData.characterTalent = this.charData.characterTalent.sort((a, b) => a.name.localeCompare(b.name))
      this.talentToAdd = ''
      this.RemoveAlreadyChosenTalentsFromList()

      this.charData.gameStates.talentUp = false

    },
    RemoveAlreadyChosenTalentsFromList() {
      var filtered = this.talents.filter( e => {
        if(this.charData.characterTalent.find(f => f.name === e.name) === undefined)
          return true
        else
          return false
      })
      this.talents = filtered
    }
  },
  watch: {
    charData(newData, oldData){
      console.log(this.charData)
      this.$CharacterData = this.charData
      console.log(this.$CharacterData)
    }
  }
}
</script>

<style>
.title {
  font-size: 15px;
  font-weight: bold;
}

.description {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>