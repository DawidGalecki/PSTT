import React from "react";
import { withRouter } from "react-router-dom";
import Chart from "./Chart";
import { getReport } from "../../store/actions/reports";
import { connect } from "react-redux";

class TasksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateFrom: null,
      dateTo: null,
      datesRange: [null]
    };
  }

  async componentDidMount() {
    let today = new Date();
    today =
      today.getFullYear() +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2);

    await this.setState({
      dateFrom: today,
      dateTo: today,
      datesRange: [today]
    });

    const { getReport } = this.props;

    getReport(this.state.datesRange);
  }

  handleDateChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleDateFromChange(e) {
    await this.setState({ dateFrom: e.target.value });

    this.handleDatesRangeChange();
  }

  async handleDateToChange(e) {
    await this.setState({ dateTo: e.target.value });

    this.handleDatesRangeChange();
  }

  handleDatesRangeChange() {
    const daysList = this.getDatesList(
      new Date(this.state.dateFrom),
      new Date(this.state.dateTo)
    );

    let datesRange = [];

    daysList
      .map((day) => {
        day.toISOString().slice(0, 10);
        datesRange.push(day.toISOString().split("T")[0]);
      })
      .join("");

    this.setState({ datesRange });
  }

  getDatesList = function(startDate, endDate) {
    const datesList = [];

    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      datesList.push(new Date(date));
    }

    return datesList;
  };

  async setTimePeriod(name) {
    const todaysDate = new Date();

    let firstDay, lastDay;

    switch (name) {
      case "day":
        firstDay = new Date(todaysDate);
        firstDay =
          firstDay.getFullYear() +
          "-" +
          ("0" + (firstDay.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + firstDay.getDate()).slice(-2);
        lastDay = new Date(todaysDate);
        lastDay =
          lastDay.getFullYear() +
          "-" +
          ("0" + (lastDay.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + lastDay.getDate()).slice(-2);

        this.setState({ dateFrom: firstDay });
        this.setState({ dateTo: lastDay });

        await console.log("day");
        break;
      case "week":
        firstDay = new Date(
          todaysDate.setDate(todaysDate.getDate() - todaysDate.getDay())
        );
        firstDay =
          firstDay.getFullYear() +
          "-" +
          ("0" + (firstDay.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + firstDay.getDate()).slice(-2);
        lastDay = new Date(
          todaysDate.setDate(todaysDate.getDate() - todaysDate.getDay() + 6)
        );
        lastDay =
          lastDay.getFullYear() +
          "-" +
          ("0" + (lastDay.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + lastDay.getDate()).slice(-2);

        this.setState({ dateFrom: firstDay });
        this.setState({ dateTo: lastDay });

        await console.log("week");
        break;
      case "month":
        firstDay = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), 1);
        firstDay =
          firstDay.getFullYear() +
          "-" +
          ("0" + (firstDay.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + firstDay.getDate()).slice(-2);
        lastDay = new Date(
          todaysDate.getFullYear(),
          todaysDate.getMonth() + 1,
          0
        );
        lastDay =
          lastDay.getFullYear() +
          "-" +
          ("0" + (lastDay.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + lastDay.getDate()).slice(-2);

        this.setState({ dateFrom: firstDay });
        this.setState({ dateTo: lastDay });

        await console.log("month");
        break;
      default:
        await console.log("undefined");
    }

    this.handleDatesRangeChange();
  }

  render() {
    const { dateFrom, dateTo, datesRange } = this.state;

    return (
      <>
        <p>Raport czasów pracy: {datesRange}</p>

        <input
          type="date"
          name="dateFrom"
          onChange={(e) => {
            this.handleDateChange(e);
            this.handleDateFromChange(e);
          }}
          value={dateFrom}
        />
        <input
          type="date"
          name="dateTo"
          onChange={(e) => {
            this.handleDateChange(e);
            this.handleDateToChange(e);
          }}
          value={dateTo}
        />

        <button onClick={() => this.setTimePeriod("day")}>DZIŚ</button>
        <button onClick={() => this.setTimePeriod("week")}>TEN TYDZIEŃ</button>
        <button onClick={() => this.setTimePeriod("month")}>TEN MIESIĄC</button>

        <Chart datesRange={datesRange} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TasksList));
