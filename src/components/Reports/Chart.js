import React from "react";
import { withRouter } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { getReport } from "../../store/actions/reports";
import { connect } from "react-redux";

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataBar: {},
      barChartOptions: {}
    };
  }

  componentDidMount() {
    this.getChartData();
    this.prepareChartData();
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.datesRange) !==
      JSON.stringify(this.props.datesRange)
    ) {
      this.getChartData();
      this.prepareChartData();
    }
  }

  getChartData() {
    const { getReport, datesRange } = this.props;

    const postData = {
      datesRange
    };

    getReport(postData);
  }

  prepareChartData() {
    this.setState({
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              barPercentage: 1,
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              },
              ticks: {
                beginAtZero: true,
                max: 24 // TODO: max => maxValue + 1
              }
            }
          ]
        }
      }
    });
  }

  render() {
    return (
      <MDBContainer>
        <h3 className="mt-5">Line chart</h3>
        <Bar
          data={this.props.reports.report}
          options={this.state.barChartOptions}
        />
      </MDBContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReport: (datesRange) => dispatch(getReport(datesRange))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Chart));
