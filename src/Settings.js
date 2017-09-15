import React from "react";
import { connect } from "react-redux";
import { getSettings, changeSetting } from "./reducer";

const type = val => {
  switch (typeof val) {
    case "string":
      return "text";
    case "boolean":
      return "checkbox";
    default:
      return "text";
  }
};

const value = target =>
  target.type === "checkbox" ? target.checked : target.value;

const Setting = props => (
  <div>
    <label>
      {props.description}:
      <input
        type={type(props.value)}
        name={props.name}
        value={props.value}
        checked={props.value}
        onChange={e => props.changeSettings(props.name, value(e.target))}
      />
    </label>
  </div>
);

class Settings extends React.Component {
  render() {
    const settings = this.props.settings;
    return (
      <div>
        <h2>Settings</h2>
        {Object.keys(settings).map(key => (
          <Setting
            key={key}
            {...settings[key]}
            changeSettings={this.props.changeSettings}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  settings: getSettings(state)
});

const mapDispatchToProps = dispatch => ({
  changeSettings: (setting, value) => dispatch(changeSetting(setting)(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
