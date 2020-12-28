<template>
  <div class="text">
    <div v-if="college || false" class="text__wrapper default-container">
      <h1>{{ college['Institution'] }}</h1>
      <div>
        <p>{{ college.city }}, {{ college.state }} {{ college.zip }}</p>
        <div>
          <a :href="college.Url">{{ college.Url }}</a>
        </div>
      </div>
      <div>
        {{ college.Institution }} is a {{ college.Highdeg == 2 ? '2' : '4' }} year {{ college.Control == 1 ? 'Public' : college.Control == 2 ? 'Private Non-profit' : 'Private For-profit' }} college
        offering up to the {{ college.Highdeg == 2 ? 'Associate' : (college.Highdeg == 3 ? 'Bachelors' : 'Graduate') }} degree.
        <br />
        Its <strong>admission rate is {{ college.ADM_RATE_ALL | percent }}</strong>, so {{ college.ADM_RATE_ALL | percentNoSign }} applicants out of 100 are accepted each year.
        <br />
      </div>

      <div>
        <h3>Cost</h3>
        <ul>
          <li>
            <strong>Average cost of attendance</strong>
            , includes tuition, fees, books, supplies and living expenses: {{ college.cost | money }}
          </li>

          <li>
            <strong>In-state tuition</strong>
            (excluding supplies and living expenses): {{ college.instatetuition | money }}
          </li>
          <li>
            <strong>Out-of-state tuition</strong>
            (excluding supplies and living expenses): {{ college.OutOfStateTuition | money }}
          </li>
          <li>
            <strong>Room And Board</strong> {{ college.RoomAndBoardCost | money }}
          </li>
        </ul>
        <div class="text-table">
          <h2>Average net cost</h2>
          <table class="table">
            <tr>
              <th>Household income</th>
              <th>Average net price (cost minus grants and scholarships)</th>
            </tr>
            <tr>
              <td>
                <strong>Average</strong>
              </td>
              <td>{{ (college.Control == 1 ? college.AvgInStateTuition : college.AvgPrivateTuition) | money }}</td>
            </tr>
            <tr>
              <td>
                <strong>$0-$30,000</strong>
              </td>
              <td>{{ (college.Control == 1 ? college.AvgInStateTuition1 : college.AvgPrivateTuition1) | money }}</td>
            </tr>
            <tr>
              <td>
                <strong>$30,001-$48,000</strong>
              </td>
              <td>{{ (college.Control == 1 ? college.AvgInStateTuition2 : college.AvgPrivateTuition2) | money }}</td>
            </tr>
            <tr>
              <td>
                <strong>$48,001-$75,000</strong>
              </td>
              <td>{{ (college.Control == 1 ? college.AvgInStateTuition3 : college.AvgPrivateTuition3) | money }}</td>
            </tr>
            <tr>
              <td>
                <strong>$75,001-$110,000</strong>
              </td>
              <td>{{ (college.Control == 1 ? college.AvgInStateTuition4 : college.AvgPrivateTuition4) | money }}</td>
            </tr>
            <tr>
              <td>
                <strong>$110,001+</strong>
              </td>
              <td>{{ (college.Control == 1 ? college.AvgInStateTuition5 : college.AvgPrivateTuition5) | money }}</td>
            </tr>
          </table>
        </div>
        <ul>
        <li><h3>This school occupies the {{ college.CostPercentileState | int }}th percentile by cost among other {{ college.Highdeg == 2 ? '2' : '4' }} year universities in <u>{{ college.state }}</u>.</h3></li>
        This means that {{ college.CostPercentileState | int }} of schools are less expensive then this one.
        <li><h3>This school occupies the {{ college.CostPercentileStateControl | int }}th percentile by cost among other {{ college.Highdeg == 2 ? '2' : '4' }} year <u>{{ college.Control == 1 ? 'public' : 'private'}}</u> universities in <u>{{ college.state }}</u>.</h3></li>
        <li><h3>This school occupies the {{ college.CostPercentileNational | int }}th percentile by cost among other {{ college.Highdeg == 2 ? '2' : '4' }} year private universities <u>nationally</u>.</h3></li>
        </ul>
      </div>
      <h3>Financial Aid</h3>
      <ol>
        <li>
          <strong>Percent of undergraduate students receiving federal loans:</strong>
          {{ college.PCTFLOAN | percent }}
        </li>
        <li>
          <strong>Percent of students receiving Pell grants:</strong>
          {{ college.PCTPELL | percent }}
        </li>
        <li>
          <strong>Median federal student loan debt (excludes private loans):</strong>
          {{ college.DEBT_MDN | money }}
        </li>
      </ol>
      <div v-if="Number.isFinite(college.averageroi)">
        <h3>Return On Investment (ROI)</h3>Since education is a form of investment into your future it is important to consider what you gain for every dollar you spend.
        Depending on the major, graduates of some schools earn on average more then graduates of other schools.
        But the reasons for this are not as straightforward as just the status of a given university. Consider that more competetive schools attract more
        ambitious and hard working students. While some other schools have predominately middle-upper class students whose parents will help them navigate
        the job market. Therefor neither a school with a high earning average an assurance of your future success, neither a school with a lower earning average
        a limitation on your future earning potential. Much of your success will depend on your hard work, communication skills and ability to adapt.
        <div>
          <h4>
            We calculated that this school has on average an ROI of
            <strong>{{ college.averageroi | int }}%</strong>
          </h4>How this number was calculated: we took all private and public 4 year colleges and universities that report earnings for their graduates
          and compared the average cost of attending that school for 4 years with the earning potential of the graduates over 10 years after graduation,
          taking into consideration a 5% per year salary increase. Then we averaged the ROI for all reported majors for this school.
          <br />
          <h5>To get the ROI for a specific major please select a major from this dropdown</h5>
          This number represents how financially sound is receiving the selected major in this school compared to the same major in all 4-year universities (that have reported earnings data) in the <u>country</u>.
          <div class="roi">
            <app-field-select
              v-model="roi"
              class="select-arrow"
              name="roi"
              input-classes="custom-select"
              label="Majors:"
              :options="majorsRoi"
              :reduse="item => item.code"
            />
            <strong class="result-roi">ROI: {{ roi.code | tensPercent }}</strong><span v-show="roi"> based on expected starting salary of {{ roi.salary | money }}.</span>
          </div>
        </div>
      </div>
      <h3>Student Body - undergraduate</h3>
      <ul class="inner">
        <li>
          <strong>Student body:</strong>
          {{ college.UDGS | percent }}
        </li>
        <li>
          <strong>Men:</strong>
          {{ college.UDGS_MEN | int }}
        </li>
        <li>
          <strong>Women:</strong>
          {{ college.UDGS_WOMEN | int }}
        </li>
        <li>
          <strong>White:</strong>
          {{ college.UDGS_WHITE | int }}
        </li>
        <li>
          <strong>Black:</strong>
          {{ college.UDGS_BLACK | int }}
        </li>
        <li>
          <strong>Hispanic:</strong>
          {{ college.UGDS_HISP | int }}
        </li>
        <li>
          <strong>Asian:</strong>
          {{ college.UGDS_ASIAN | int }}
        </li>
        <li>
          <strong>American Indian:</strong>
          {{ college.UGDS_AIAN | int }}
        </li>
        <li>
          <strong>Native Hawaiian/Pacific Islander:</strong>
          {{ college.UGDS_NHPI | int }}
        </li>
        <h3>Student body by income</h3>
        <br />
        <li>
          <strong>$0-$30,000:</strong>
          {{ college.INC_PCT_LO | percent }}
        </li>
        <li>
          <strong>$30,001-$48,000:</strong>
          {{ college.INC_PCT_M1 | percent }}
        </li>
        <li>
          <strong>$48,001-$75,000:</strong>
          {{ college.INC_PCT_M2 | percent }}
        </li>
        <li>
          <strong>$75,001-$110,000:</strong>
          {{ college.INC_PCT_H1 | percent }}
        </li>
        <li>
          <strong>$110,001+:</strong>
          {{ college.INC_PCT_H2  | percent }}
        </li>
      </ul>

      <div class="text-table">
        <h2>Test Scores</h2>
        <p>
          Below are the test scores as reported for most students. The 75th percentile is the score corresponding to the 75th percentile of students (most students had at least this score).
          The 25th percentile represents the lower test score that the least students (25%) have received. Thus it is better if your score is above the 75% mark, but a lower score (even below 25%) should not discourage you from applying.
        </p>
        <table class="table">
          <tr>
            <th></th>
            <th>SAT Math</th>
            <th>SAT Reading</th>
            <th>ACT Math</th>
            <th>ACT English</th>
            <th>ACT Composite</th>
          </tr>
          <tr>
            <td>
              <strong>75% (Most student's scores)</strong>
            </td>
            <td>{{ college.SATM75 | int }}</td>
            <td>{{ college.SATR75 | int }}</td>
            <td>{{ college.ACTMT75 | int }}</td>
            <td>{{ college.ACTEN75 | int }}</td>
            <td>{{ college.ACTCM75 | int }}</td>
          </tr>
          <tr>
            <td>
              <strong>25% (Least student's scores)</strong>
            </td>
            <td>{{ college.SATM25 | int }}</td>
            <td>{{ college.SATR25 | int }}</td>
            <td>{{ college.ACTMT25 | int }}</td>
            <td>{{ college.ACTEN25 | int }}</td>
            <td>{{ college.ACTCM25 | int }}</td>
          </tr>
        </table>
      </div>

      <div class="advisor__content-option">
            <button 
              @keyup.enter.prevent
              @keydown.enter.prevent
              @keypress.enter.prevent
              @click.prevent="$router.push('/calculator')"
              class="default-submit advisor-select"
            >
              <span>Try our lifestyle Calculator</span>
            </button>
          </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppFieldSelect from "~/components/field/FieldSelectComponent.vue";
import { restApi } from '~/plugins/axios-rest-client'

export default {
  components: {
    AppFieldSelect
  },
  data() {
    return {
      roi: "",
      majorsRoi: [],
      college: {},
      page: null
    };
  },
  async fetch({ store, params, error, payload, res }) {
    if(!process.server){
      console.log("_alias -> client side")
      // return
    }

    if (payload === undefined || res || null) {
      if (!store.state.server.colleges.collagesByStates.length) {
        try {
          await store.dispatch("server/colleges/getCollegesByStates");
        } catch (e) {
          error({ statusCode: 404, message: "Page Not Found" });
        }
      }
      store.dispatch(
        "server/colleges/setCollage",
        store.getters["server/colleges/collageByStateAndAlias"](params.alias)
      );
    } else {
      store.dispatch("server/colleges/setCollage", payload);
    }
  },
  async asyncData({ $payloadURL, route, params, payload, store }) {
    console.log('school - asyncData')
    if (payload) {
      //console.log(payload)
      console.log('in payload')
      return {
        page: payload,
      }
    }

    // In production (process.static = true), fetch data from extracted payload
    console.log("static: " + process.static + " client: " + process.client)
    if (process.static && process.client) {
      let res = await restApi.axios().get($payloadURL(route))
      //console.log(res)
      let college = res.data.page
      store.dispatch("server/colleges/setCollage", college);
      console.log('AsyncData ' + college.OPEID)
      await store.dispatch("server/majors/getMajorsRoi", college.OPEID);
      //console.log(store.getters.majorsRoi)
      return res
    }
  },
  head() {
    return {
      title: this.$store.getters["server/colleges/college"].Institution,
      meta: [
        { hid: 'og-title', property: 'og:title', content: this.$store.getters["server/colleges/college"].Institution },
      ]
    };
  },
  mounted() {
    this.$nextTick(function () {
      console.log('mounted')
      //this.$store.dispatch("server/majors/getMajorsRoi", this.college.OPEID);
      this.majorsRoi = this.$store.getters["server/majors/majorsRoi"]
      console.log(this.majorsRoi)
      this.college = this.$store.getters["server/colleges/college"]
    })
  },
  //computed: { --> Computed properties don't work well with asyncData for what ever reason.  5/5/2020
    //...mapGetters({
      //collages: "server/colleges/collagesByStates",
      //collageByStateAndAlias: "server/colleges/collageByStateAndAlias",
      //college: "server/colleges/college",
      //majorsRoi: "server/majors/majorsRoi"
    //})
  //},
  filters: {
    int: value => {
      return value === -1 || !value ? "N/A" : Math.round(value);
    },
    tensPercent: value => {
      return value || null ? value.toFixed(1) + '%' : ''
    },
    percent: value => {
      return value || null ? Math.abs(Math.round(value * 100)) + "%" : "N/A";
    },
    percentNoSign: value => {
      return value || null ? Math.abs(Math.round(value * 100)) : "N/A";
    },
    money: value => {
      value = parseFloat(value);
      let n = 0;
      let re = "\\d(?=(\\d{" + 3 + "})+" + (n > 0 ? "\\." : "$") + ")";
      if (!value) return "";
      return (
        (value < 0 ? "-" : "") +
        "$" +
        Math.abs(value)
          .toFixed(Math.max(0, ~~n))
          .replace(new RegExp(re, "g"), "$&,")
      );
    }
  },
  destroyed() {
    this.$store.dispatch("server/colleges/setCollage", null);
  },
  watch: {
    //collages: {
    //  handler() {
    //    this.$store.dispatch("server/majors/getMajorsRoi", this.college.OPEID);
    //  },
    //  deep: true
    //}
  }
};
</script>
<style scoped>
.form-group.select-arrow {
  display: flex;
  align-items: center;
  padding: 0 20px 0 0;
  width: 50%;
}

.roi {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.result-roi {
  width: 10%;
}

.form-group.select-arrow label {
  margin-right: 20px;
}
</style>
