import {Component} from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import Loader from 'react-loader-spinner'
import {AiFillHome} from 'react-icons/ai'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  progress: 'In_progress',
}

class VaccinationDetails extends Component {
  state = {
    vaccinationDetails: [],
    trendValue: 'dose',
    apiStatus: apiStatusConstants.progress,
  }

  componentDidMount() {
    this.getVaccinationDetails()
  }

  changeTrend = v => {
    this.setState({trendValue: v})
  }

  getVaccinationDetails = async () => {
    const url = 'https://apis.ccbp.in/covid19-vaccination-data'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const vaccinationDetails = {
        site: data.topBlock.sites.total,
        govt: data.topBlock.sites.govt,
        pvt: data.topBlock.sites.pvt,
        totalDoses: data.topBlock.vaccination.total,
        dose1: data.topBlock.vaccination.tot_dose_1,
        dose2: data.topBlock.vaccination.tot_dose_2,
        doseChart: data.vaccinationDoneByTime.map(eachValue => ({
          total: eachValue.count,
          doseOne: eachValue.dose_one,
          doseTwo: eachValue.dose_two,
          label: eachValue.label,
        })),
        ageChart: data.vaccinationDoneByTimeAgeWise.map(eachValue => ({
          label: eachValue.label,
          Between15To17: eachValue.vac_15_17,
          Between18To45: eachValue.vac_18_45,
          Between45To60: eachValue.vac_45_60,
          greaterThan60: eachValue.vac_60_above,
        })),

        byGender: [
          {
            count: data.topBlock.vaccination.male,
            category: 'male',
          },
          {
            count: data.topBlock.vaccination.female,
            category: 'Female',
          },

          {
            count: data.topBlock.vaccination.others,
            category: 'Others',
          },
        ],

        byVaccine: [
          {
            count: data.topBlock.vaccination.covishield,
            category: 'covishield',
          },

          {
            count: data.topBlock.vaccination.covovax,
            category: 'covovax',
          },
          {
            count: data.topBlock.vaccination.corbevax,
            category: 'corbevax',
          },
          {
            count: data.topBlock.vaccination.sputnik,
            category: 'sputnik',
          },
        ],
        byAge: [
          {
            count: data.vaccinationByAge.vac_12_14,
            category: '12-14',
          },
          {
            count: data.vaccinationByAge.vac_15_17,
            category: '15-17',
          },
          {
            count: data.vaccinationByAge.vac_18_45,
            category: '18-45',
          },
          {
            count: data.vaccinationByAge.vac_45_60,
            category: '45-60',
          },
        ],
      }
      this.setState({vaccinationDetails, apiStatus: apiStatusConstants.success})
    }
  }

  renderSuccessView = () => {
    const {vaccinationDetails, trendValue} = this.state
    let data = []
    if (trendValue === 'dose') {
      data = vaccinationDetails.doseChart
    }
    if (trendValue === 'age') {
      data = vaccinationDetails.ageChart
    }

    return (
      <div className="vaccination-container">
        <p className="top-para">
          <AiFillHome fontSize="16px" className="icon" /> India
        </p>
        <div className="vaccination-content-container">
          <div className="top-site-total-container">
            <div className="site-container">
              <div className="site-content">
                <img
                  src="https://res.cloudinary.com/dyhsyterg/image/upload/v1644046362/Group_7476site_b3eso2.svg"
                  alt="site"
                  className="site-image"
                />
                <div className="site-main-content">
                  <p className="site-heading">Site Conducting Vaccination</p>
                  <p className="count-big">{vaccinationDetails.site}</p>
                  <div className="bottom-site-content">
                    <div className="bottom-site-sub">
                      <p className="sub-name">Government</p>
                      <p className="sub-count">{vaccinationDetails.govt}</p>
                    </div>
                    <div className="bottom-site-sub">
                      <p className="sub-name">Private</p>
                      <p className="sub-count">{vaccinationDetails.pvt}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img
              src="https://res.cloudinary.com/dyhsyterg/image/upload/v1644307243/Group_7326india_vyo0pp.svg"
              alt="india"
              className="india-image"
            />
            <div className="site-container">
              <div className="site-content">
                <img
                  src="https://res.cloudinary.com/dyhsyterg/image/upload/v1644046362/Group_7476site_b3eso2.svg"
                  alt="site"
                  className="site-image"
                />
                <div className="site-main-content">
                  <p className="site-heading">Total Vaccination Doses</p>
                  <p className="count-big">{vaccinationDetails.totalDoses}</p>
                  <div className="bottom-site-content">
                    <div className="bottom-site-sub">
                      <p className="sub-name">Dose 1</p>
                      <p className="sub-count">{vaccinationDetails.dose1}</p>
                    </div>
                    <div className="bottom-site-sub">
                      <p className="sub-name">Dose 2</p>
                      <p className="sub-count">{vaccinationDetails.dose2}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="vaccination-trends">
          <h1 className="trend-heading">Vaccination Trends</h1>
          <div className="button-holder">
            <button
              type="button"
              className={
                trendValue === 'dose'
                  ? 'vaccine-button highlight-button'
                  : 'vaccine-button'
              }
              onClick={() => this.changeTrend('dose')}
            >
              By Doses
            </button>

            <button
              type="button"
              className={
                trendValue === 'age'
                  ? 'vaccine-button highlight-button'
                  : 'vaccine-button'
              }
              onClick={() => this.changeTrend('age')}
            >
              By Age
            </button>
          </div>
          <div className="line-chart-lg">
            <ResponsiveContainer height="100%" width="100%">
              <BarChart width={500} height={300} data={data}>
                <Legend />
                <XAxis dataKey="label" fontSize="12px" />
                <YAxis fontSize="12px" />
                <CartesianGrid />
                <Legend iconSize="10px" fontSize="12px" />
                {trendValue === 'dose' && (
                  <>
                    <Bar dataKey="total" fill="#A226DC" />
                    <Bar dataKey="doseOne" fill="#FCEA4E" />
                    <Bar dataKey="doseTwo" fill="#37C62B" />
                  </>
                )}

                {trendValue === 'age' && (
                  <>
                    <Bar dataKey="Between15To17" fill="#A226DC" />
                    <Bar dataKey="Between18To45" fill="#FCEA4E" />
                    <Bar dataKey="Between45To60" fill="#37C62B" />
                    <Bar dataKey="greaterThan60" fill="red" />
                  </>
                )}
                <Tooltip cursor={{fill: 'transparent'}} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="line-chart-sm">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={800} height={300} data={data.slice(4)}>
                <XAxis dataKey="label" fontSize="6px" />
                <YAxis fontSize="6px" />
                <Tooltip cursor={{fill: '#FFEBE5'}} />
                <Legend iconSize="10px" fontSize="6px" />
                {trendValue === 'dose' && (
                  <>
                    <Bar dataKey="total" fill="#A226DC" />
                    <Bar dataKey="doseOne" fill="#FCEA4E" />
                    <Bar dataKey="doseTwo" fill="#37C62B" />
                  </>
                )}
                {trendValue === 'age' && (
                  <>
                    <Bar dataKey="Between15To17" fill="#A226DC" />
                    <Bar dataKey="Between18To45" fill="#FCEA4E" />
                    <Bar dataKey="Between45To60" fill="#37C62B" />
                    <Bar dataKey="greaterThan60" fill="#F54394" />
                  </>
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bottom-container">
          <div className="vaccination-category">
            <h1 className="trend-heading">Vaccination Category</h1>
            <div className="left-pie-charts">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={vaccinationDetails.byGender}
                    cx="50%"
                    cy="40%"
                    innerRadius="60%"
                    outerRadius="80%"
                    startAngle={180}
                    endAngle={0}
                    dataKey="count"
                  >
                    <Cell name="male" fill="#F54394" />
                    <Cell name="female" fill="#5A8DEE" />
                    <Cell name="others" fill="#FF9800" />
                  </Pie>
                  <Tooltip />
                  <Legend
                    iconType="circle"
                    iconSize="8px"
                    layout="horizontal"
                    verticalAlign="middle"
                    align="center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="left-pie-charts">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={vaccinationDetails.byVaccine}
                    cx="50%"
                    cy="40%"
                    innerRadius="60%"
                    outerRadius="80%"
                    startAngle={180}
                    endAngle={0}
                    dataKey="count"
                  >
                    <Cell name="covovax" fill="yellow" />
                    <Cell name="corbevax" fill="#5A8DEE" />
                    <Cell name="sputnik" fill="#FF9800" />
                  </Pie>
                  <Tooltip />
                  <Legend
                    iconType="circle"
                    iconSize="8px"
                    layout="horizontal"
                    verticalAlign="middle"
                    align="center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="vaccination-by-age">
            <h1 className="trend-heading">Vaccination By Age</h1>
            <div className="right-piechart">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    cx="50%"
                    cy="50%"
                    data={vaccinationDetails.byAge}
                    startAngle={360}
                    endAngle={0}
                    innerRadius="0%"
                    outerRadius="95%"
                    dataKey="count"
                    fontSize="12px"
                    label
                  >
                    <Cell name="12-14" fill="#007CC3" />
                    <Cell name="15-17" fill="#7AC142" />
                    <Cell name="18-45" fill="#FF9800" />
                    <Cell name="45-60" fill="red" />
                  </Pie>
                  <Legend
                    iconType="circle"
                    iconSize="8px"
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    fontSize="8px"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#007BFF" width="25px" height="25px" />
    </div>
  )

  renderFinalView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return this.renderLoadingView()
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderFinalView()}
        <Footer />
      </>
    )
  }
}

export default VaccinationDetails
