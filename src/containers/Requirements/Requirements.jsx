import React, {Component} from "react";
import "./Requirements.css";
import Table from "../../components/Table/Table.jsx";
import Filter from "../../components/Filter/Filter.jsx"
import { connect } from "react-redux";

class Requirements extends Component {
  state ={
    innerWidth: null
  }

  columns = [
    {
      name: "сustomer",
      style: {
        width: "30%",
        textTransform: "uppercase"
      }
    },
    {
      name: "documentation",
      style: {
        width: "70%"
      }
    }
  ];

  inner = React.createRef();

  setWidth = () => {
    this.setState({
      innerWidth: this.inner.current.offsetWidth
    })
  }

  componentDidMount() {
    this.setWidth();
    window.addEventListener('resize', this.setWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setWidth);
  }

  render() {
    return (
      <div className="Requirements">
        <div className="Requirements__inner" ref={this.inner}>
          <Filter width={this.state.innerWidth} />
          <Table table="requirements" data={this.props.requirements} columns={this.columns} />
        </div>
      </div>
    );
  }

};

const mapStateToProps = state => {
  return {
    requirements: state.data.requirements
  };
};

export default connect(mapStateToProps)(Requirements);
