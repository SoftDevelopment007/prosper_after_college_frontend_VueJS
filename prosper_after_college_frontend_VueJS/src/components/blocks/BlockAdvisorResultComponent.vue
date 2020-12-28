<template>
  <div v-if="item" @click.prevent="$emit('goto', { item: item, e: $event })" class="advisor__content-result" :class="[typeClass]">
    <div class="stars">
      <img v-for="i in stars" :key="i" src="~/assets/img/stars.png" alt />
    </div>
    <div v-if="item.schools || null" class="result-name">
      <div class="time">
        <p v-for="(school, index) in item.schools" :key="index">
          {{ school.years }} years in
          <span>{{ school.name }}</span> <template v-if="school.admissionRate > 0"> <span class="admrate">({{school.admissionRate * 100.0 | admRate}}% adm rate)</span></template>
          <a href="#" @click.stop="openSchoolUrl(school)">
            <img src="~/assets/img/open-link.png" alt />
          </a>
        </p>
      </div>
      <div class="price">
        <p v-for="(school, index) in item.schools" :key="index">{{ school.cost | money }}</p>
      </div>
    </div>
    <div class="characteristics">
      <div class="mobile-characteristics">
        <div class="characteristics-name" v-for="(school, index) in item.schools" :key="index">
          <div class="year">
            <p> {{ school.years }} yrs</p>
          </div>
          <div class="uni">
            <span>{{ school.name }}
              <a href="#" @click.stop="openSchoolUrl(school)">
                <img src="~/assets/img/open-link.png" alt />
              </a>
            </span>
            <template v-if="school.admissionRate > 0"> <span class="admrate">({{school.admissionRate * 100.0 | admRate}}% adm rate)</span></template>
          </div>
        </div>
        <div class="characteristics-center">
          <div class="name">
            <p>School Cost</p>
            <p>Total loan payment</p>
            <p>Estimated Income</p>
          </div>
          <div class="price">
            <span>{{ item.totalCost | money }}</span>
            <span >{{ item.totalPayed | money }}</span>
            <span >{{ item.income | money }}</span>
          </div>
        </div>
        <div class="characteristics-img">
          <div v-if="costColor === 'green'" class="item green">
            <img src="~/assets/img/icon-home.png" alt />
            <span>rent 1br</span>
          </div>
          <div v-if="costColor === 'green'" class="item green">
            <img src="~/assets/img/car.png" alt />
            <span>own car</span>
          </div>
          <div v-if="costColor === 'green'" class="item green">
            <img src="~/assets/img/money.png" alt />
            <span>set aside 15%</span>
          </div>
          <div v-if="costColor === 'green'" class="item green">
            <img src="~/assets/img/airport.png" alt />
            <span>travel</span>
          </div>
          <div v-if="costColor === 'yelow'" class="item yellow">
            <img src="~/assets/img/home-yellow.png" alt />
            <span>rent room</span>
          </div>
          <div v-if="costColor === 'yelow'" class="item yellow">
            <img src="~/assets/img/car-yellow.png" alt />
            <span>public transit</span>
          </div>
          <div v-if="costColor === 'yelow'" class="item yellow">
            <img src="~/assets/img/money-yellow.png" alt />
            <span>set aside 10%</span>
          </div>
          <div v-if="costColor === 'yelow'" class="item yellow">
            <img src="~/assets/img/airport-yellow.png" alt />
            <span>travel</span>
          </div>
          <div v-if="costColor === 'red'" class="item red">
            <img src="~/assets/img/home-red.png" alt />
            <span>With parents</span>
          </div>
          <div v-if="costColor === 'red'" class="item red">
            <img src="~/assets/img/car-red.png" alt />
            <span>Public transit</span>
          </div>
        </div>
      </div>
      <div v-if="item.status !== 'NONE'" class="property">
        <h6>Lifestyle after graduation</h6>
        <ul>
          <li v-for="(exp, index) in item.expenses" :key="index" :class="{ no: item.status === 'LOW' }">{{ exp.name }}</li>
        </ul>
      </div>
      <div v-else class="not-info">Not Affordable</div>
      <div class="cost">
        <ul>
          <li>
            <p class="total">
              School cost:
              <span class="blue">{{ item.totalCost | money }}</span>
            </p>
          </li>
          <li>
            <p>
              Cost after your contributions:
              <span>{{ item.afterCost | money }}</span>
            </p>
          </li>
          <li>
            <p class="total">
              Total loan repayment:
              <span class="blue">{{ item.totalPayed | money }}</span>
            </p>
          </li>
          <li>
            <p>
              Monthly loan payment:
              <span>{{ item.monthly | money }}</span>
            </p>
          </li>
          <li>
            <p>
              Estimated monthly income:
              <span>{{ item.income | money }}</span>
            </p>
          </li>
          <li>
            <p>
              Estimated monthly expenses:
              <span>{{ item.expenses_summ | money }}</span>
            </p>
          </li>
          <!-- <li>
            <p>
              Balance at the end of the month:
              <span :class="[costColor]">{{ item.balance | money }}</span>
            </p>
          </li> -->
          <li>
            <p>
              <span v-if="item.status === 'LOW'" class="summary">We believe your income to expenses ratio <br />is not enough to afford independent living</span>
            </P>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default () {
        return null
      }
    }
  },
  computed: {
    stars () {
      let count = 0
      switch (this.item.status) {
        case 'HIGH':
          count = 3
          break

        case 'MEDIUM':
          count = 2
          break

        case 'LOW':
          count = 1
          break
      }
      return count
    },
    typeClass () {
      let type = ''
      switch (this.item.status) {
        case 'HIGH':
          type = ''
          break

        case 'MEDIUM':
          type = 'college2'
          break

        case 'LOW':
          type = 'college3'
          break

        case 'NONE':
          type = 'college4'
          break
      }
      return type
    },
    costColor () {
      let color = ''
      switch (this.item.status) {
        case 'HIGH':
          color = 'green'
          break

        case 'MEDIUM':
          color = 'yelow'
          break

        case 'LOW':
          color = 'red'
          break

        case 'NONE':
          color = 'grey'
          break
      }
      return color
    }
  },
  filters: {
    money: (value) => {
      let n = 0
      let re = '\\d(?=(\\d{' + (3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
      if (!value) return '$0'
      return '$'+value.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,')
    },
    admRate: (value) => {
      if (!value)return ''
      return value.toFixed(0)
     }
  },
  methods: {
    openSchoolUrl(school){
      let states = this.$store.getters["server/states/items"]
      let state = states.find(s => s.code === school.state)
      var url = `/schools/${_.toLower(state.label).replace(/ /g,'-').replace(/[^\w-]+/g,'')}/${_.toLower(school.name).replace(/ /g,'-').replace(/[^\w-]+/g,'')}/`
      window.open(url, "_blank")
      return false
    }
  }
}
</script>
