import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Grid, Header, Input } from "semantic-ui-react";
import Chart from "./Chart";
import { getReport } from "../../store/actions/reports";

class Reports extends React.Component {
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

  handleDateChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleDateFromChange(event) {
    await this.setState({ dateFrom: event.target.value });

    this.handleDatesRangeChange();
  }

  async handleDateToChange(event) {
    await this.setState({ dateTo: event.target.value });

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
        <Grid>
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column width={14}>
            <Header as="h1">Raport czasu pracy</Header>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              commodo sagittis magna, non tempor orci. Etiam efficitur odio quis
              enim rhoncus faucibus. Praesent metus sapien, volutpat in rhoncus
              id, congue ac lacus. Nam sit amet iaculis tortor. Nulla mollis
              interdum augue a sodales. Ut tincidunt posuere felis non lacinia.
              Etiam pulvinar quam eleifend massa auctor suscipit. Vestibulum
              eleifend neque lectus. Morbi eget iaculis elit.
            </p>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column floated="left">
                  <Header as="p">Zakres dat - wskaż ręcznie</Header>
                  <Input
                    icon="hourglass start"
                    iconPosition="left"
                    placeholder="Wybierz datę początkową"
                    type="date"
                    name="dateFrom"
                    onChange={(e) => {
                      this.handleDateChange(e);
                      this.handleDateFromChange(e);
                    }}
                    value={dateFrom}
                  />
                  <Input
                    icon="hourglass end"
                    iconPosition="left"
                    placeholder="Wybierz datę końcową"
                    type="date"
                    name="dateTo"
                    onChange={(e) => {
                      this.handleDateChange(e);
                      this.handleDateToChange(e);
                    }}
                    value={dateTo}
                  />
                </Grid.Column>
                <Grid.Column floated="right">
                  <Header as="p">
                    Zakres dat - wybierz spośród propozycji
                  </Header>
                  <Button.Group>
                    <Button
                      color="teal"
                      onClick={() => this.setTimePeriod("day")}
                    >
                      Bieżący dzień
                    </Button>
                    <Button.Or text="lub" />
                    <Button
                      color="blue"
                      onClick={() => this.setTimePeriod("week")}
                    >
                      Bieżący tydzień
                    </Button>
                    <Button.Or text="lub" />
                    <Button
                      color="purple"
                      onClick={() => this.setTimePeriod("month")}
                    >
                      Bieżący miesiąc
                    </Button>
                  </Button.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Header as="p">Wykres</Header>
            <Chart datesRange={datesRange} />
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
        </Grid>
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
)(withRouter(Reports));
