import React, { Component, Fragment } from "react";
import "./Requirements.css";
import FilteredRequirementsTable from "../../components/FilteredRequirementsTable/FilteredRequirementsTable.jsx";
import Filter from "../../components/Filter/Filter.jsx";
import { connect } from "react-redux";

const columns = [
  {
    name: "customer",
    style: {
      width: "30%",
      textTransform: "uppercase"
    }
  },
  {
    name: "documentation",
    style: {
      width: "70%",
      fontSize: "0.9rem"
    }
  }
];

class Requirements extends Component {
  state = {
    filterWidth: null,
    filterTop: null
  };

  innerContainer = React.createRef();

  setWidth = () => {
    this.setState({
      filterWidth: this.innerContainer.current.offsetWidth
    });
  };

  setTop = () => {
    this.setState({
      filterTop: document.documentElement.scrollTop > 25 ? 0 : 25
    });
  };

  componentDidMount() {
    this.setWidth();
    this.setTop();
    window.addEventListener("resize", this.setWidth);
    window.addEventListener("scroll", this.setTop);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setWidth);
    window.removeEventListener("scroll", this.setTop);
  }

  render() {
    return (
      <div className="Requirements">
        <div className="Requirements__inner" ref={this.innerContainer}>
          <div className="Requirements__cover" style={{ width: this.state.filterWidth }} />
          {Object.keys(this.props.requirements).length ? (
            <Fragment>
              <Filter width={this.state.filterWidth} top={this.state.filterTop} />
              <FilteredRequirementsTable table="requirements" data={this.props.requirements} columns={columns} />
            </Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    requirements: state.data.requirements
  };
};

export default connect(mapStateToProps)(Requirements);