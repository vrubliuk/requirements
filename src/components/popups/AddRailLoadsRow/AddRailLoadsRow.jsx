import React, { Component } from "react";
import "./AddRailLoadsRow.css";
import colors from "../../../assets/colors";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actionCreators from "../../../store/actions/actionCreators";

class AddRailLoadsRow extends Component {
  state = {
    currentTable: 1,
    SCAC: "",
    carrier: "",
    equipmentType: "",
    abbreviation: ""
  };
  handleInput = (e, type) => {
    this.setState({
      [type]: e.target.value
    });
  };
  handleSubmit = e => {
    if (!e.target.checkValidity()) return;
    e.preventDefault();
    const row =
      this.state.currentTable === 1
        ? {
            SCAC: this.state.SCAC.trim(),
            carrier: this.state.carrier.trim()
          }
        : {
            equipmentType: this.state.equipmentType.trim(),
            abbreviation: this.state.abbreviation.trim()
          };
    this.props.initAddRow(`railLoads${this.state.currentTable}`, row);
  };

  render() {
    const color = colors[this.props.location.pathname].dark;
    const tables = {
      1: (
        <form className="Modal__form" onSubmit={this.handleSubmit}>
          <div className="Modal__label">SCAC</div>
          <input className="Modal__input" type="text" required value={this.state.SCAC} onChange={e => this.handleInput(e, "SCAC")} />
          <div className="Modal__label">Carrier</div>
          <input className="Modal__input" type="text" value={this.state.carrier} onChange={e => this.handleInput(e, "carrier")} />
          <div className="Modal__footer">
            <button style={{ background: color }} type="submit">
              Save
            </button>
          </div>
        </form>
      ),
      2: (
        <form className="Modal__form" onSubmit={this.handleSubmit}>
          <div className="Modal__label">Equipment type</div>
          <input className="Modal__input" type="text" value={this.state.equipmentType} onChange={e => this.handleInput(e, "equipmentType")} />
          <div className="Modal__label">Abbreviation</div>
          <input className="Modal__input" type="text" value={this.state.abbreviation} onChange={e => this.handleInput(e, "abbreviation")} />
          <div className="Modal__footer">
            <button style={{ background: color }} type="submit">
              Save
            </button>
          </div>
        </form>
      )
    };

    return (
      <div className="AddRailLoadsRow">
        <div className="Modal__title">Add row</div>
        <div className="Modal__header">
          <div className="Modal__switch" style={{ borderBottom: this.state.currentTable === 1 && `2px solid ${color}` }} onClick={() => this.setState({ currentTable: 1 })}>
            Table 1
          </div>
          <div className="Modal__switch" style={{ borderBottom: this.state.currentTable === 2 && `2px solid ${color}` }} onClick={() => this.setState({ currentTable: 2 })}>
            Table 2
          </div>
        </div>
        {tables[this.state.currentTable]}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initAddRow: (table, row) => dispatch(actionCreators.initAddRow(table, row))
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(AddRailLoadsRow)
);
