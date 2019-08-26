import * as React from "react";
import "./Header.scss";

interface HeaderProps {
    changeVisibility(value: string);
}
export default class Header extends React.Component<HeaderProps> {
    changeVisibility = (event) => {
        console.log(event.target.value);
        this.props.changeVisibility(event.target.value);
    }
    render = () => {
        return (
            <header>
                <h1>Your To-do</h1>
                <div>
                    <input type='radio' name="visibility" onChange={this.changeVisibility} value="ALL" defaultChecked></input><label>All</label>
                    <input type='radio' name="visibility" onChange={this.changeVisibility} value="COMPLETE"></input><label>Completed</label>
                    <input type='radio' name="visibility" onChange={this.changeVisibility} value="PENDING"></input><label>Pending</label>
                    {/* <input type='checkbox' name="visibility" value="MISSED"></input><label>Missed</label> */}
                </div>
            </header>
        );
    }
}