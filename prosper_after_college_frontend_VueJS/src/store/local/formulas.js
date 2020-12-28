import axiosRestClient from 'axios-rest-client'
const api = axiosRestClient({
  baseUrl: '/',
})

const excludeCosts = [
  'Health Insurance',
  'Car Lease',
  'Travel'
]

let headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

api.axios().defaults.headers.common = headers

const SET_CONSTANTS = 'SET_CONSTANTS'

export const state = () => ({
  constants: {}
})

export const getters = {
  constants: state => state.constants,
  stateAveragesWhereDoYouWantToLive: state => (s) => {
    return state.constants.WhereDoYouWantToLive.map(item => {
      let coef = state.constants.NationalAverages[s] || null ? state.constants.NationalAverages[s].rent : 1
      return {
        label: item.label,
        code: Math.round(item.code * coef)
      }
    })
  },
  stateAveragesHowMuchWillYouBePayingForUtilities: state => (s) => {
    return state.constants.HowMuchWillYouBePayingForUtilities.map(item => {
      let coef = state.constants.NationalAverages[s] || null ? state.constants.NationalAverages[s].overall : 1
      return {
        label: item.label,
        code: Math.round(item.code * coef)
      }
    })
  },
  stateAveragesHowMuchDoYouWantToSpendOnFood: state => (s) => {
    return state.constants.HowMuchDoYouWantToSpendOnFood.map(item => {
      let coef = state.constants.NationalAverages[s] || null ? state.constants.NationalAverages[s].overall : 1
      return {
        label: item.label,
        code: Math.round(item.code * coef)
      }
    })
  }
}

export const actions = {
  getConstants() {
    return api['data']['formulas-constants.json']()
  },
  calcDebtPayment({ state }, payload) {
    let result = (state.constants.StudentLoanInterestRate / 12.0 * payload.DebtAmount) / (1 - Math.pow(1 + state.constants.StudentLoanInterestRate / 12.0, -12 * payload.NumberOfYears))
    return result
  },
  calcInvestment({ state }, payload) {
    return payload + payload * (Math.pow((1 + state.constants.InvestmentRateOfReturn), state.constants.InvestmentNumberOfYears) - 1)
  },
  calcLoanRepayment({ state }, payload) {
    let periods = payload.NumberOfYears * 12
    return (state.constants.StudentLoanInterestRate / 12.0 * payload.DebtAmount * periods) / (1 - Math.pow(1 + state.constants.StudentLoanInterestRate / 12.0, -periods))
  },
  calcMonthlyExpenses({ state }, payload) {
    let st = payload.state
    let coefOveral = state.constants.NationalAverages[st] || null ? state.constants.NationalAverages[st].overall : 1
    let coefRent = state.constants.NationalAverages[st] || null ? state.constants.NationalAverages[st].rent : 1

    let t = []

    for(let key in state.constants.CostOfLife) {
      let keys = Object.keys(state.constants.CostOfLife[key])
      t.push(Object.values(state.constants.CostOfLife[key]).reduce((prev, next, index) =>
      {
        let c = excludeCosts.includes(keys[index]) ? 1 : keys[index] !== 'Rent' ? coefOveral : coefRent
        //console.log(`${key} c=${c} val=${(Math.round(next.cost * c) || 0)}`)
        return prev + (Math.round(next.cost * c) || 0)
      }, 0))
    }

    let TotalForPoor = t[2] + payload.income * state.constants.MonthlySavingsPercentPoor
    let TotalForModerate = t[1] + payload.income * state.constants.MonthlySavingsPercentModerate
    let TotalForPlenty = t[0] + payload.income * state.constants.MonthlySavingsPercentPlenty

    let result = 0
    let levelExpenses = 0
    let name = 'NONE'
    let savingsItem = null
    let leftForExpenses = payload.income - payload.loan
    let adjustmentCoeff = 1.0

    if (leftForExpenses >= TotalForPlenty * state.constants.gap) {
      result = TotalForPlenty > leftForExpenses ? leftForExpenses : TotalForPlenty
      levelExpenses = TotalForPlenty
      name = 'Plenty'
      savingsItem = { name: `Save ${state.constants.MonthlySavingsPercentPlenty * 100}% of salary`, value: payload.income * state.constants.MonthlySavingsPercentPlenty }
      adjustmentCoeff = result === TotalForPlenty ? 1 : (TotalForPlenty + savingsItem.value) / leftForExpenses
    } else if (leftForExpenses >= TotalForModerate * state.constants.gap) {
      result = TotalForModerate > leftForExpenses ? leftForExpenses : TotalForModerate
      levelExpenses = TotalForModerate
      name = 'Moderate'
      savingsItem = { name: `Save ${state.constants.MonthlySavingsPercentModerate * 100}% of salary`, value: payload.income * state.constants.MonthlySavingsPercentModerate }
      adjustmentCoeff = result === TotalForModerate ? 1 : (TotalForModerate + savingsItem.value) / leftForExpenses
    } else if (leftForExpenses >= TotalForPoor * state.constants.gap) {
      result = TotalForPoor > leftForExpenses ? leftForExpenses : TotalForPoor
      levelExpenses = TotalForPoor
      name = 'Poor'
      savingsItem = { name: `Save ${state.constants.MonthlySavingsPercentPoor * 100}% of salary`, value: payload.income * state.constants.MonthlySavingsPercentPoor }
      adjustmentCoeff = result === TotalForPoor ? 1 : (TotalForPoor + savingsItem.value) / leftForExpenses
    }
    //console.log('income:' + payload.income + ' loan:' + payload.loan + ' plenty:' + TotalForPlenty + ' result:' + name)
    let exResults = []
    let exSummary = []

    let sumExpenses = 0

    if (name !== 'NONE') {
      exResults = Object.keys(state.constants.CostOfLife[name]).filter(i => state.constants.CostOfLife[name][i].showInResults).map(item => {
        let c = excludeCosts.includes(item) ? 1 : item !== 'Rent' ? coefOveral : coefRent
        let cval = Math.round(state.constants.CostOfLife[name][item].cost * c / adjustmentCoeff)
        return {
          name: state.constants.CostOfLife[name][item].description,
          value: cval
        }
      })
      exSummary = Object.keys(state.constants.CostOfLife[name]).filter(i => state.constants.CostOfLife[name][i].cost > 0).map(item => {
        let c = excludeCosts.includes(item) ? 1 : item !== 'Rent' ? coefOveral : coefRent
        let cval = Math.round(state.constants.CostOfLife[name][item].cost * c / adjustmentCoeff)
        sumExpenses += cval
        //console.log(`${item} - ${cval} - ${sumExpenses}`)
        return {
          name: state.constants.CostOfLife[name][item].sumDescription || state.constants.CostOfLife[name][item].description,
          value: cval
        }
      })
      if (savingsItem.value > 0) {
        exResults.push(savingsItem)
        exSummary.push(savingsItem)
        sumExpenses += savingsItem.value
      }
    }

    return {
      sum: sumExpenses,
      sumSummary: sumExpenses,
      items: exResults,
      itemsAll: exSummary
    }
  },
  async calcLifestyleIndex({ state }, payload) {
    let monhtlyIncome = payload.IncomeAfterDeductions / 12.0
    let st = payload.state
    let coefOveral = state.constants.NationalAverages[st] || null ? state.constants.NationalAverages[st].overall : 1
    let coefRent = state.constants.NationalAverages[st] || null ? state.constants.NationalAverages[st].rent : 1

    let t = []

    for(let key in state.constants.CostOfLife) {
      let keys = Object.keys(state.constants.CostOfLife[key])
      t.push(Object.values(state.constants.CostOfLife[key]).reduce((prev, next, index) =>
      {
        let c = excludeCosts.includes(keys[index]) ? 1 : keys[index] !== 'Rent' ? coefOveral : coefRent
        return prev + (Math.round(next.cost * c) || 0)
      }, 0))
    }

    let TotalForPoor = (t[2] + monhtlyIncome * state.constants.MonthlySavingsPercentPoor) * state.constants.gap
    let TotalForModerate = (t[1] + monhtlyIncome * state.constants.MonthlySavingsPercentModerate) * state.constants.gap
    let TotalForPlenty = (t[0] + monhtlyIncome * state.constants.MonthlySavingsPercentPlenty) * state.constants.gap

    let DebtPayment = payload.DebtPayment
    let result = "NONE"
    let argument = monhtlyIncome - DebtPayment

    if (argument >= TotalForPlenty) {
      result = "HIGH"
    } else if (argument >= TotalForModerate) {
      result = "MEDIUM"
    } else if (argument >= TotalForPoor) {
      result = "LOW"
    }

    return result
  },
  async calcFederalTax({ state }, payload) {
    let sT = state.constants.Brackets.SalaryTo
    let sF = state.constants.Brackets.SalaryFrom
    let t = state.constants.Brackets.Tax
    let ex = state.constants.PersonalExemption
    let s = payload.salary
    let result = s - Math.max(
      (s - ex > sT[0]
        ? (sT[0] * t[0]) + (s - ex - sT[0] > sT[1]
          ? (sT[1] - sF[1]) * t[1] + (s - ex - sT[1] > sT[2]
            ? (sT[2] - sF[2]) * t[2] + ((s - ex - sT[2]) * t[3])
            : (s - ex - sT[1]) * t[2])
          : (s - ex - sT[0]) * t[1])
        : (s - ex) * t[0]), 0)
    return result
  },
  async calcOtherTax({ state, dispatch }, payload) {
    let AfterFederalTax = await dispatch('calcFederalTax', payload).then(res => { return res })
    let result = AfterFederalTax - (payload.salary * state.constants.MedicareTax) - (payload.salary * state.constants.SocialSecurityTax) - (payload.salary * state.constants.StateTax)
    return result
  }
}

export const mutations = {
  [SET_CONSTANTS](state, payload) {
    state.constants = payload
  }
}
