<template>
  <f7-page name="character">
    <!-- Top Navbar -->
    <f7-navbar large :sliding="false">
      <f7-nav-left>
      </f7-nav-left>
      <f7-nav-title sliding>Character</f7-nav-title>
      <f7-nav-title-large>Character</f7-nav-title-large>
    </f7-navbar>

    <f7-block strong>
      <f7-block-title>Informations</f7-block-title>
      <f7-row>
        <div class="circular-portrait"><img :src="this.charData.general.image"></div>
      </f7-row>
      <f7-row>
        <h3>{{this.charData.general.name}} - {{this.charData.general.class}}</h3>
      </f7-row>
      <f7-row>
        <f7-col class="main-stats">
            <f7-icon f7="heart" color="red"></f7-icon> Health
        </f7-col>
        <f7-col class="main-stats">
          <f7-icon f7="drop" color="blue"></f7-icon> Mana
        </f7-col>
        <f7-col class="main-stats">
          <f7-icon f7="star" color="yellow"></f7-icon> Level
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col class="main-stats main-stats-values">
            <span v-if="CheckInferiorXPercent(this.charData.points.health.current, this.charData.points.health.max, 25)" style="color: red;">{{this.charData.points.health.current}}</span>
            <span v-else>{{this.charData.points.health.current}}</span>
            / <span>{{this.charData.points.health.max}}</span>
        </f7-col>
        <f7-col class="main-stats main-stats-values">
          <span v-if="CheckInferiorXPercent(this.charData.points.mana.current, this.charData.points.mana.max, 20)" style="color: blue;">{{this.charData.points.mana.current}}</span>
            <span v-else>{{this.charData.points.mana.current}}</span>
            / <span>{{this.charData.points.mana.max}}</span>
        </f7-col>
        <f7-col class="main-stats main-stats-values">
          <span >{{this.charData.experience.level}}</span>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-block strong>
      <f7-block-title>Manage Points</f7-block-title>
      <f7-row class="input-points">
        <f7-col>
            <f7-label>Health Points</f7-label>
        </f7-col>
        <f7-col>
          <f7-label>Mana Points</f7-label>
        </f7-col>
      </f7-row>
      <f7-row class="input-points">
        <f7-col>
          <f7-stepper fill color="red" :value="this.charData.points.health.current" :max="this.charData.points.health.max" :min="0" @stepper:change="setHP"></f7-stepper>
        </f7-col>
        <f7-col>
          <f7-stepper fill color="blue" :value="this.charData.points.mana.current" :max="this.charData.points.mana.max" :min="0" @stepper:change="setMana"></f7-stepper>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-block strong>
      <f7-block-title>Damages</f7-block-title>
      <f7-row>
        <f7-col class="secondary-stats">
          <img src="../../assets-src/dagger.png"> CaC
        </f7-col>
        <f7-col class="secondary-stats">
          <img src="../../assets-src/gun.png"> Distance
        </f7-col>
        <f7-col class="secondary-stats">
          <img src="../../assets-src/ssd_drive.png"> Hack
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col class="secondary-stats main-stats-values">
            <span>{{this.charData.damage.close}}</span>
        </f7-col>
        <f7-col class="secondary-stats main-stats-values">
          <span>{{this.charData.damage.range}}</span>
        </f7-col>
        <f7-col class="secondary-stats main-stats-values">
          <span>{{this.charData.damage.hack}}</span>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-block strong>
      <f7-block-title>Resistance</f7-block-title>
      <f7-row>
        <f7-col class="secondary-stats">
          <img src="../../assets-src/dagger_pro.png"> CaC
        </f7-col>
        <f7-col class="secondary-stats">
          <img src="../../assets-src/gun_pro.png"> Distance
        </f7-col>
        <f7-col class="secondary-stats">
          <img src="../../assets-src/ssd_drive_pro.png"> Hack
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col class="secondary-stats main-stats-values">
            <span>{{this.charData.resistance.close}}</span>
        </f7-col>
        <f7-col class="secondary-stats main-stats-values">
          <span>{{this.charData.resistance.range}}</span>
        </f7-col>
        <f7-col class="secondary-stats main-stats-values">
          <span>{{this.charData.resistance.hack}}</span>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-block strong>
      <f7-block-title>Experience</f7-block-title>
      <f7-row>
        <f7-gauge
          type="semicircle"
          :value="CalculateXPProgression()"
          :value-text="this.charData.experience.current === 0 ? '0' : this.charData.experience.current"
          value-text-color="gold"
          border-color="gold"
          :label-text="'of ' + this.charData.experience.forNextLevel"
          label-text-color="gold"
        ></f7-gauge>
      </f7-row>
      <f7-row>
        <f7-col class="input-xp">
          <f7-input
            type="text"
            placeholder="XP number"
            error-message="Only numbers please!"
            required
            validate
            pattern="[0-9]*"
            v-model:value="this.input.xp"
            :disabled="this.charData.gameStates.levelUp">
          </f7-input>
        </f7-col>
        <f7-col class="input-xp">
          <f7-button color="yellow" strong fill @click="AddXPButton()" :disabled="isNaN(parseInt(this.input.xp))">Add XP</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-block strong>
      <f7-block-title>
        <f7-col>
          Statistics
        </f7-col>
        <f7-col v-if="this.charData.gameStates.levelUp">
          <span v-if="this.statPointsToAdd !== 1">{{this.statPointsToAdd}} stats points left</span>
          <span v-else style="color:red;">{{this.statPointsToAdd}} stats points left</span>
        </f7-col>
      </f7-block-title>
      <f7-list>
        <f7-list-item title="Strength">
          <template #media>
            <f7-icon material="fitness_center"></f7-icon>
          </template>
          <template #after>
            <f7-stepper 
              v-if="this.charData.gameStates.levelUp" 
              fill color="yellow" 
              v-model:value="this.charData.statistics.strength.current" 
              :max="this.charData.statistics.strength.current + statPointsToAdd" 
              :min="this.charData.statistics.strength.last" 
              @stepper:minusclick="IncreaseStatPointsToAdd(this.charData.statistics.strength)"
              @stepper:plusclick="DecreaseStatPointsToAdd"
              :input="false"
              :disabled="this.statPointsToAdd === 0"
              ></f7-stepper>
            <span v-else>{{this.charData.statistics.strength.current}}</span>
          </template>
        </f7-list-item>
        <f7-list-item title="Agility">
          <template #media>
            <f7-icon f7="hare"></f7-icon>
          </template>
          <template #after>
            <f7-stepper 
              v-if="this.charData.gameStates.levelUp" 
              fill color="yellow" 
              v-model:value="this.charData.statistics.agility.current" 
              :max="this.charData.statistics.agility.current + statPointsToAdd" 
              :min="this.charData.statistics.agility.last" 
              @stepper:minusclick="IncreaseStatPointsToAdd(this.charData.statistics.agility)"
              @stepper:plusclick="DecreaseStatPointsToAdd"
              :input="false"
              :disabled="this.statPointsToAdd === 0"
              ></f7-stepper>
            <span v-else>{{this.charData.statistics.agility.current}}</span>
          </template>
        </f7-list-item>
        <f7-list-item title="Technology">
          <template #media>
            <f7-icon f7="desktopcomputer"></f7-icon>
          </template>
          <template #after>
            <f7-stepper 
              v-if="this.charData.gameStates.levelUp" 
              fill color="yellow" 
              v-model:value="this.charData.statistics.tech.current" 
              :max="this.charData.statistics.tech.current + statPointsToAdd" 
              :min="this.charData.statistics.tech.last" 
              @stepper:minusclick="IncreaseStatPointsToAdd(this.charData.statistics.tech)"
              @stepper:plusclick="DecreaseStatPointsToAdd"
              :input="false"
              :disabled="this.statPointsToAdd === 0"
              ></f7-stepper>
            <span v-else>{{this.charData.statistics.tech.current}}</span>
          </template>
        </f7-list-item>
        <f7-list-item title="Intelligence">
          <template #media>
            <img src="../../assets-src/brain.png">
          </template>
          <template #after>
            <f7-stepper 
              v-if="this.charData.gameStates.levelUp" 
              fill color="yellow" 
              v-model:value="this.charData.statistics.intelligence.current" 
              :max="this.charData.statistics.intelligence.current + statPointsToAdd" 
              :min="this.charData.statistics.intelligence.last" 
              @stepper:minusclick="IncreaseStatPointsToAdd(this.charData.statistics.intelligence)"
              @stepper:plusclick="DecreaseStatPointsToAdd"
              :input="false"
              :disabled="this.statPointsToAdd === 0"
              ></f7-stepper>
            <span v-else>{{this.charData.statistics.intelligence.current}}</span>
          </template>
        </f7-list-item>
        <f7-list-item title="Cool">
          <template #media>
            <img src="../../assets-src/yinyang.png">
          </template>
          <template #after>
            <f7-stepper 
              v-if="this.charData.gameStates.levelUp" 
              fill color="yellow" 
              v-model:value="this.charData.statistics.cool.current" 
              :max="this.charData.statistics.cool.current + statPointsToAdd" 
              :min="this.charData.statistics.cool.last" 
              @stepper:minusclick="IncreaseStatPointsToAdd(this.charData.statistics.cool)"
              @stepper:plusclick="DecreaseStatPointsToAdd"
              :input="false"
              :disabled="this.statPointsToAdd === 0"
              ></f7-stepper>
            <span v-else>{{this.charData.statistics.cool.current}}</span>
          </template>
        </f7-list-item>
        <f7-list-item title="Charisma">
          <template #media>
            <f7-icon f7="chat_bubble"></f7-icon>
          </template>
          <template #after>
            <f7-stepper 
              v-if="this.charData.gameStates.levelUp" 
              fill color="yellow" 
              v-model:value="this.charData.statistics.charisma.current" 
              :max="this.charData.statistics.charisma.current + statPointsToAdd" 
              :min="this.charData.statistics.charisma.last" 
              @stepper:minusclick="IncreaseStatPointsToAdd(this.charData.statistics.charisma)"
              @stepper:plusclick="DecreaseStatPointsToAdd"
              :input="false"
              :disabled="this.statPointsToAdd === 0"
              ></f7-stepper>
            <span v-else>{{this.charData.statistics.charisma.current}}</span>
          </template>
        </f7-list-item>
        <f7-list-item title="Luck">
          <template #media>
            <img src="../../assets-src/clover.png">
          </template>
          <template #after>
            <f7-stepper 
              v-if="this.charData.gameStates.levelUp" 
              fill color="yellow" 
              v-model:value="this.charData.statistics.luck.current" 
              :max="this.charData.statistics.luck.current + statPointsToAdd" 
              :min="this.charData.statistics.luck.last" 
              @stepper:minusclick="IncreaseStatPointsToAdd(this.charData.statistics.luck)"
              @stepper:plusclick="DecreaseStatPointsToAdd"
              :input="false"
              :disabled="this.statPointsToAdd === 0"
              ></f7-stepper>
            <span v-else>{{this.charData.statistics.luck.current}}</span>
          </template>
        </f7-list-item>
        <f7-list-item title="Knowledge">
          <template #media>
            <f7-icon f7="book"></f7-icon>
          </template>
          <template #after>
            <f7-stepper 
              v-if="this.charData.gameStates.levelUp" 
              fill color="yellow" 
              v-model:value="this.charData.statistics.knowledge.current" 
              :max="this.charData.statistics.knowledge.current + statPointsToAdd" 
              :min="this.charData.statistics.knowledge.last" 
              @stepper:minusclick="IncreaseStatPointsToAdd(this.charData.statistics.knowledge)"
              @stepper:plusclick="DecreaseStatPointsToAdd"
              :input="false"
              :disabled="this.statPointsToAdd === 0"
              ></f7-stepper>
            <span v-else>{{this.charData.statistics.knowledge.current}}</span>
          </template>
        </f7-list-item>
        <f7-list-item title="Observation">
          <template #media>
            <f7-icon f7="eyeglasses"></f7-icon>
          </template>
          <template #after>
            <f7-stepper 
              v-if="this.charData.gameStates.levelUp" 
              fill color="yellow" 
              v-model:value="this.charData.statistics.observation.current" 
              :max="this.charData.statistics.observation.current + statPointsToAdd" 
              :min="this.charData.statistics.observation.last" 
              @stepper:minusclick="IncreaseStatPointsToAdd(this.charData.statistics.observation)"
              @stepper:plusclick="DecreaseStatPointsToAdd"
              :input="false"
              :disabled="this.statPointsToAdd === 0"
              ></f7-stepper>
            <span v-else>{{this.charData.statistics.observation.current}}</span>
          </template>
        </f7-list-item>
        <f7-list-item v-if="this.charData.gameStates.levelUp">
          <template #after>
            <f7-col style="margin-right: 10px;">
              <f7-button  strong fill @click="ResetStatsAdd()" color="red">Reset</f7-button>
            </f7-col>
            <f7-col>
              <f7-button strong fill @click="EndStatsAdd()" :disabled="!(this.statPointsToAdd === 0)" color="green">Confirm</f7-button>
            </f7-col>
          </template>
        </f7-list-item>
      </f7-list>
      <f7-row>
        <div class="small">
          <!--<RadarChart :chart-data="this.chartStatData" :chart-option="this.chartStatOptions"></RadarChart>-->
        </div>
      </f7-row>
    </f7-block>
    <f7-block strong>
      <f7-block-title>Character History</f7-block-title>
      <f7-row>
        <div v-html="this.charData.history"></div>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
import Chart from 'chart.js/auto'
import RadarChart from '../js/radar-chart.js'

export default {
  components: {
      RadarChart
  },
  data() {
    return {
      input: {
        xp: '',
        hp: '',
        mana: ''
      },
      statPointsToAdd: 0,
      statPointsToAddMax: 0,
      nbStatPointsPerLevel: 4,
      statPointsUsed: 0,
      charData: this.$CharacterData,
      chartStatData: null,
      chartStatOptions: {
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
    }
  },
  methods: {
    CheckInferiorXPercent(value, maxValue, X) {
      X = X/100
      return value <= maxValue * X
    },
    LevelUp()
    {
      this.charData.gameStates.levelUp = true
      this.charData.experience.level++
      this.statPointsToAdd += this.nbStatPointsPerLevel
      this.statPointsToAddMax = this.statPointsToAdd
      this.statPointsUsed = 0
      this.BackupStats()

      this.charData.experience.tillNextTalent--
      if(this.charData.experience.tillNextTalent === 0)
      {
        this.charData.gameStates.talentUp = true
        this.charData.experience.tillNextTalent = 3
      }
    },
    BackupStats()
    {
      this.charData.statistics.strength.last = this.charData.statistics.strength.current
      this.charData.statistics.agility.last = this.charData.statistics.agility.current
      this.charData.statistics.tech.last = this.charData.statistics.tech.current
      this.charData.statistics.intelligence.last = this.charData.statistics.intelligence.current
      this.charData.statistics.cool.last = this.charData.statistics.cool.current
      this.charData.statistics.charisma.last = this.charData.statistics.charisma.current
      this.charData.statistics.luck.last = this.charData.statistics.luck.current
      this.charData.statistics.knowledge.last = this.charData.statistics.knowledge.current
      this.charData.statistics.observation.last = this.charData.statistics.observation.current
    },
    CalculateXPProgression() {
      var value = this.charData.experience.current / this.charData.experience.forNextLevel
      if(this.charData.experience.current >= this.charData.experience.forNextLevel) {
        this.LevelUp();
        this.charData.experience.current = parseInt(this.charData.experience.current - this.charData.experience.forNextLevel)
        this.charData.experience.forNextLevel = parseInt(this.charData.experience.forNextLevel + this.charData.experience.forNextLevel * 0.1)
        value = this.charData.experience.current / this.charData.experience.forNextLevel
      }
      return value
    },
    AddXP(value) {
      console.log(value)
      console.log(this.charData.experience.current)
      this.charData.experience.current += parseInt(value)
      console.log(this.charData.experience.current)
    },
    AddXPButton() {
      this.AddXP(this.input.xp)
      this.input.xp = ''
    },
    setHP(value) {
      this.charData.points.health.current = value
    },
    setMana(value) {
      this.charData.points.mana.current = value
    },
    DecreaseStatPointsToAdd()
    {
      if(this.statPointsToAdd > 0)
      {
        this.statPointsToAdd--
        this.statPointsUsed++
      }
    },
    IncreaseStatPointsToAdd(stat)
    {
      if(stat.current !== stat.last)
      {
        this.statPointsToAdd++
        this.statPointsUsed--
      }
    },
    EndStatsAdd()
    {
      this.charData.gameStates.levelUp = false
    },
    ResetStatsAdd()
    {
      this.charData.statistics.strength.current = this.charData.statistics.strength.last
      this.charData.statistics.agility.current = this.charData.statistics.agility.last
      this.charData.statistics.tech.current = this.charData.statistics.tech.last
      this.charData.statistics.intelligence.current = this.charData.statistics.intelligence.last
      this.charData.statistics.cool.current = this.charData.statistics.cool.last
      this.charData.statistics.charisma.current = this.charData.statistics.charisma.last
      this.charData.statistics.luck.current = this.charData.statistics.luck.last
      this.charData.statistics.knowledge.current = this.charData.statistics.knowledge.last
      this.charData.statistics.observation.current = this.charData.statistics.observation.last

      this.statPointsToAdd = this.statPointsToAddMax
      this.statPointsUsed = 0
    },
    PopulateData()
    {
      this.chartStatData = 
        {
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
            data: [1,2,3,4,5,6,7,8,9],//this.chartStatDataSet,
            fill: true,
            backgroundColor: 'rgba(255, 204, 0, 0.2)',
            borderColor: 'rgba(255, 204, 0)',
            pointBackgroundColor: 'rgba(255, 204, 0)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 204, 0)'
          }]
        }
      
      /*[this.charData.statistics.strength.current, this.charData.statistics.agility.current,
                  this.charData.statistics.tech.current, this.charData.statistics.intelligence.current,
                  this.charData.statistics.knowledge.current, this.charData.statistics.observation.current,
                  this.charData.statistics.cool.current, this.charData.statistics.charisma.current,
                  this.charData.statistics.luck.current] */ 
    }
    
  },
  watch: {
    charData(newData, oldData){
      this.$CharacterData = this.charData
      
      /*const ctx = document.getElementById('chartStat')
      new Chart(ctx, this.chartStatParams)*/
    }
  },
  mounted() {
      this.PopulateData() 
  }

}
</script>

<style>
.circular-portrait {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
}
.circular-portrait img {
  width: 100%;
  height: auto;
}

.main-stats{
  text-align: center;
}

.secondary-stats{
  margin-top: 5px;
  text-align: center;
}

.main-stats-values{
  padding-top: 5px;
  font-weight: bold; 
  font-size: 17px; 
}

.experience-info{
  font-size: 15px;
}

.input-xp{
  margin-top: 0px;
}

.input-points{
  text-align: center;
}

.small {
    max-width: 600px;
    margin:  150px auto;
  }


</style>