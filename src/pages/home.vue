<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar large :sliding="false">
      <f7-nav-left>
      </f7-nav-left>
      <f7-nav-title sliding>JDR-Dashboard</f7-nav-title>
      <f7-nav-title-large>JDR-Dashboard</f7-nav-title-large>
    </f7-navbar>

    <!-- Page content-->
    <f7-block strong>
      <f7-button fill popup-open=".create-popup-general">Create a new character</f7-button>
        <f7-popup class="create-popup-general" :opened="popupOpened" @popup:closed="popupOpened = false">
          <f7-page>
            <f7-navbar>
              <f7-nav-left>
                <f7-link popup-close><f7-icon f7="chevron_left"></f7-icon>Cancel</f7-link>
              </f7-nav-left>
              <f7-nav-title>Character Creation</f7-nav-title>
            </f7-navbar>
            <f7-block strong>
              <f7-block-title>General Informations</f7-block-title>
              <f7-list inline-labels no-hairlines-md>
                <f7-list-input
                  label="Name"
                  type="text"
                  placeholder="Name"
                  clear-button>
                </f7-list-input>
                <f7-list-input
                  label="Image URL"
                  type="text"
                  placeholder="http://..."
                  clear-button>
                </f7-list-input>
                <f7-list-input
                  label="Description"
                  type="textarea"
                  placeholder="Description">
                </f7-list-input>
              </f7-list>
            </f7-block>
            <f7-block strong>
              <f7-block-title>Class</f7-block-title>
              <p>Your class will determine your starting statistics and your health and stamina. Some class will start with specific items.</p>
              <f7-list accordion-list>
                <f7-list-item v-for="c in this.classes" :key="c.name"
                  accordion-item
                  radio
                  name="class"
                  :value="c.name"
                  :title="c.name"
                  @change="_class = $event.target.value">
                  <f7-accordion-content>
                    <f7-block>
                      <f7-row>
                        <span class="">Description:</span>
                      </f7-row>
                      <f7-row class="description">
                        <div v-html="c.description"></div>
                      </f7-row>
                    </f7-block>
                    <f7-block>
                      <f7-row>
                        <f7-col class="main-stats">
                            <f7-icon f7="heart" color="red"></f7-icon><span class="main-stats-values">{{c.health}} Health</span> 
                        </f7-col>
                        <f7-col class="main-stats">
                          <f7-icon f7="drop" color="blue"></f7-icon><span class="main-stats-values">{{c.mana}} Mana</span>
                        </f7-col>
                      </f7-row>
                    </f7-block>
                    <f7-block>
                      <f7-row>
                        <canvas :id="c.name + '-chart'"></canvas>
                      </f7-row>
                    </f7-block>
                  </f7-accordion-content>
                </f7-list-item>
              </f7-list>
            </f7-block>
          </f7-page>
        </f7-popup>
    </f7-block>
  </f7-page>
</template>
<script>

import CharacterData from '../json/character.json'
import classes from '../json/class.json'
import Chart from 'chart.js/auto'

export default {
  name: 'Talent',
  data() {
    return {
      tempCharData: CharacterData,
      classes: classes,
      _class: '',
      dataLabels: ['Strength',
                  'Agility',
                  'Tech',
                  'Intelligence',
                  'Knowledge',
                  'Observation',
                  'Cool',
                  'Charisma',
                  'Luck'],
      //Pire code ever
      statCharts: {
        solo: {
          type: 'radar',
          data: {
            labels: ['Strength',
                  'Agility',
                  'Tech',
                  'Intelligence',
                  'Knowledge',
                  'Observation',
                  'Cool',
                  'Charisma',
                  'Luck'],
            datasets: [{
              label: 'Statistics',
              data: [classes[0].statistics.strength, classes[0].statistics.agility,
                    classes[0].statistics.tech, classes[0].statistics.intelligence,
                    classes[0].statistics.knowledge, classes[0].statistics.observation,
                    classes[0].statistics.cool, classes[0].statistics.charisma,
                    classes[0].statistics.luck],
              fill: true,
              backgroundColor: 'rgba(255, 204, 0, 0.2)',
              borderColor: 'rgba(255, 204, 0)',
              pointBackgroundColor: 'rgba(255, 204, 0)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255, 204, 0)'
            }]
          },
          options: {
            elements: {
              line: {
                borderWidth: 3
              }
            },
            scales: {
              r: {
                  suggestedMin: 0,
                  suggestedMax: 100
              }
            }
          }
        },
        rocker: {
          type: 'radar',
          data: {
            labels: ['Strength',
                  'Agility',
                  'Tech',
                  'Intelligence',
                  'Knowledge',
                  'Observation',
                  'Cool',
                  'Charisma',
                  'Luck'],
            datasets: [{
              label: 'Statistics',
              data: [classes[1].statistics.strength, classes[1].statistics.agility,
                    classes[1].statistics.tech, classes[1].statistics.intelligence,
                    classes[1].statistics.knowledge, classes[1].statistics.observation,
                    classes[1].statistics.cool, classes[1].statistics.charisma,
                    classes[1].statistics.luck],
              fill: true,
              backgroundColor: 'rgba(255, 204, 0, 0.2)',
              borderColor: 'rgba(255, 204, 0)',
              pointBackgroundColor: 'rgba(255, 204, 0)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255, 204, 0)'
            }]
          },
          options: {
            elements: {
              line: {
                borderWidth: 3
              }
            },
            scales: {
              r: {
                  suggestedMin: 0,
                  suggestedMax: 100
              }
            }
          }
        },
        netrunner: {
          type: 'radar',
          data: {
            labels: ['Strength',
                  'Agility',
                  'Tech',
                  'Intelligence',
                  'Knowledge',
                  'Observation',
                  'Cool',
                  'Charisma',
                  'Luck'],
            datasets: [{
              label: 'Statistics',
              data: [classes[2].statistics.strength, classes[2].statistics.agility,
                    classes[2].statistics.tech, classes[2].statistics.intelligence,
                    classes[2].statistics.knowledge, classes[2].statistics.observation,
                    classes[2].statistics.cool, classes[2].statistics.charisma,
                    classes[2].statistics.luck],
              fill: true,
              backgroundColor: 'rgba(255, 204, 0, 0.2)',
              borderColor: 'rgba(255, 204, 0)',
              pointBackgroundColor: 'rgba(255, 204, 0)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255, 204, 0)'
            }]
          },
          options: {
            elements: {
              line: {
                borderWidth: 3
              }
            },
            scales: {
              r: {
                  suggestedMin: 0,
                  suggestedMax: 100
              }
            }
          }
        },
        techies: {
          type: 'radar',
          data: {
            labels: ['Strength',
                  'Agility',
                  'Tech',
                  'Intelligence',
                  'Knowledge',
                  'Observation',
                  'Cool',
                  'Charisma',
                  'Luck'],
            datasets: [{
              label: 'Statistics',
              data: [classes[3].statistics.strength, classes[3].statistics.agility,
                    classes[3].statistics.tech, classes[3].statistics.intelligence,
                    classes[3].statistics.knowledge, classes[3].statistics.observation,
                    classes[3].statistics.cool, classes[3].statistics.charisma,
                    classes[3].statistics.luck],
              fill: true,
              backgroundColor: 'rgba(255, 204, 0, 0.2)',
              borderColor: 'rgba(255, 204, 0)',
              pointBackgroundColor: 'rgba(255, 204, 0)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255, 204, 0)'
            }]
          },
          options: {
            elements: {
              line: {
                borderWidth: 3
              }
            },
            scales: {
              r: {
                  suggestedMin: 0,
                  suggestedMax: 100
              }
            }
          }
        },
        medias: {
          type: 'radar',
          data: {
            labels: ['Strength',
                  'Agility',
                  'Tech',
                  'Intelligence',
                  'Knowledge',
                  'Observation',
                  'Cool',
                  'Charisma',
                  'Luck'],
            datasets: [{
              label: 'Statistics',
              data: [classes[4].statistics.strength, classes[4].statistics.agility,
                    classes[4].statistics.tech, classes[4].statistics.intelligence,
                    classes[4].statistics.knowledge, classes[4].statistics.observation,
                    classes[4].statistics.cool, classes[4].statistics.charisma,
                    classes[4].statistics.luck],
              fill: true,
              backgroundColor: 'rgba(255, 204, 0, 0.2)',
              borderColor: 'rgba(255, 204, 0)',
              pointBackgroundColor: 'rgba(255, 204, 0)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255, 204, 0)'
            }]
          },
          options: {
            elements: {
              line: {
                borderWidth: 3
              }
            },
            scales: {
              r: {
                  suggestedMin: 0,
                  suggestedMax: 100
              }
            }
          }
        },
        cops: {
          type: 'radar',
          data: {
            labels: ['Strength',
                  'Agility',
                  'Tech',
                  'Intelligence',
                  'Knowledge',
                  'Observation',
                  'Cool',
                  'Charisma',
                  'Luck'],
            datasets: [{
              label: 'Statistics',
              data: [classes[5].statistics.strength, classes[5].statistics.agility,
                    classes[5].statistics.tech, classes[5].statistics.intelligence,
                    classes[5].statistics.knowledge, classes[5].statistics.observation,
                    classes[5].statistics.cool, classes[5].statistics.charisma,
                    classes[5].statistics.luck],
              fill: true,
              backgroundColor: 'rgba(255, 204, 0, 0.2)',
              borderColor: 'rgba(255, 204, 0)',
              pointBackgroundColor: 'rgba(255, 204, 0)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255, 204, 0)'
            }]
          },
          options: {
            elements: {
              line: {
                borderWidth: 3
              }
            },
            scales: {
              r: {
                  suggestedMin: 0,
                  suggestedMax: 100
              }
            }
          }
        },
        corpo: {
          type: 'radar',
          data: {
            labels: ['Strength',
                  'Agility',
                  'Tech',
                  'Intelligence',
                  'Knowledge',
                  'Observation',
                  'Cool',
                  'Charisma',
                  'Luck'],
            datasets: [{
              label: 'Statistics',
              data: [classes[6].statistics.strength, classes[6].statistics.agility,
                    classes[6].statistics.tech, classes[6].statistics.intelligence,
                    classes[6].statistics.knowledge, classes[6].statistics.observation,
                    classes[6].statistics.cool, classes[6].statistics.charisma,
                    classes[6].statistics.luck],
              fill: true,
              backgroundColor: 'rgba(255, 204, 0, 0.2)',
              borderColor: 'rgba(255, 204, 0)',
              pointBackgroundColor: 'rgba(255, 204, 0)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255, 204, 0)'
            }]
          },
          options: {
            elements: {
              line: {
                borderWidth: 3
              }
            },
            scales: {
              r: {
                  suggestedMin: 0,
                  suggestedMax: 100
              }
            }
          }
        },
        fixer: {
          type: 'radar',
          data: {
            labels: ['Strength',
                  'Agility',
                  'Tech',
                  'Intelligence',
                  'Knowledge',
                  'Observation',
                  'Cool',
                  'Charisma',
                  'Luck'],
            datasets: [{
              label: 'Statistics',
              data: [classes[7].statistics.strength, classes[7].statistics.agility,
                    classes[7].statistics.tech, classes[7].statistics.intelligence,
                    classes[7].statistics.knowledge, classes[7].statistics.observation,
                    classes[7].statistics.cool, classes[7].statistics.charisma,
                    classes[7].statistics.luck],
              fill: true,
              backgroundColor: 'rgba(255, 204, 0, 0.2)',
              borderColor: 'rgba(255, 204, 0)',
              pointBackgroundColor: 'rgba(255, 204, 0)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255, 204, 0)'
            }]
          },
          options: {
            elements: {
              line: {
                borderWidth: 3
              }
            },
            scales: {
              r: {
                  suggestedMin: 0,
                  suggestedMax: 100
              }
            }
          }
        },
        nomad: {
          type: 'radar',
          data: {
            labels: ['Strength',
                  'Agility',
                  'Tech',
                  'Intelligence',
                  'Knowledge',
                  'Observation',
                  'Cool',
                  'Charisma',
                  'Luck'],
            datasets: [{
              label: 'Statistics',
              data: [classes[8].statistics.strength, classes[8].statistics.agility,
                    classes[8].statistics.tech, classes[8].statistics.intelligence,
                    classes[8].statistics.knowledge, classes[8].statistics.observation,
                    classes[8].statistics.cool, classes[8].statistics.charisma,
                    classes[8].statistics.luck],
              fill: true,
              backgroundColor: 'rgba(255, 204, 0, 0.2)',
              borderColor: 'rgba(255, 204, 0)',
              pointBackgroundColor: 'rgba(255, 204, 0)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255, 204, 0)'
            }]
          },
          options: {
            elements: {
              line: {
                borderWidth: 3
              }
            },
            scales: {
              r: {
                  suggestedMin: 0,
                  suggestedMax: 100
              }
            }
          }
        },
        
      }
    }
  },
  methods: {
    AddGeneral()
    {
      
    }
  },
  watch: {
    charData(newData, oldData){
      console.log(this.charData)
      this.$CharacterData = this.charData
      console.log(this.$CharacterData)
    }
  },
  //Pire code ever
  mounted() {
      const ctx = document.getElementById('Solo-chart')
      var t = new Chart(ctx, this.statCharts.solo)

      const ctx1 = document.getElementById('Rocker-chart')
      var t1 = new Chart(ctx1, this.statCharts.rocker)

      const ctx2 = document.getElementById('Netrunner-chart')
      var t2 = new Chart(ctx2, this.statCharts.netrunner)

      const ctx3 = document.getElementById('Techies-chart')
      var t3 = new Chart(ctx3, this.statCharts.techies)

      const ctx4 = document.getElementById('Medias-chart')
      var t4 = new Chart(ctx4, this.statCharts.medias)

      const ctx5 = document.getElementById('Cops-chart')
      var t5 = new Chart(ctx5, this.statCharts.cops)

      const ctx6 = document.getElementById('Corpo-chart')
      var t6 = new Chart(ctx6, this.statCharts.corpo)

      const ctx7 = document.getElementById('Fixer-chart')
      var t7 = new Chart(ctx7, this.statCharts.fixer)

      const ctx8 = document.getElementById('Nomad-chart')
      var t8 = new Chart(ctx8, this.statCharts.nomad)
  }
}
</script>
<style>
.main-stats{
  text-align: center;
}

.main-stats-values{
  padding-top: 5px;
  font-weight: bold; 
  font-size: 17px; 
}

</style>