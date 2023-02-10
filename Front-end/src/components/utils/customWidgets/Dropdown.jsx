import React from "react";      // Not working module!
import ReactDOM from "react-dom";

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "Select" };
        this.handleChange = this.handleChange.bind(this);           // Change select's value
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    render() {
        return (
        <form onSubmit={this.handleSubmit}>
            <label>
            Pick your favorite flavor:
            <select value={this.state.value} onChange={this.handleChange}>
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option value="coconut">Coconut</option>
                <option value="mango">Mango</option>
            </select>
            </label>
            <input type="submit" value="Submit" />
        </form>
        );
    }
    }

export default Dropdown