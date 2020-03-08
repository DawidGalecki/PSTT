import { MDBContainer } from "mdbreact";
import React from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getReport } from "../../store/actions/reports";

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      barChartOptions: {},
      dataBar: {}
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
    const { datesRange, getReport } = this.props;

    const postData = {
      datesRange
    };

    if (datesRange.length > 0) getReport(postData);
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
                max: 24
              }
            }
          ]
        }
      }
    });
  }

  render() {
    return (
      <>
        <MDBContainer>
          <Bar
            data={this.props.reports.report}
            options={this.state.barChartOptions}
          />
        </MDBContainer>
      </>
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
