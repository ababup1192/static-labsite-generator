// import Style Sheet
import "../style/main.css";

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as fetch from "isomorphic-fetch";
import { Promise } from "es6-promise";
import * as Immutable from "immutable";

import App from "./components/App";

interface Config {
    title: string;
    name: string;
}

fetch("config.json").then((response) =>
    response.json()
).then((configs: Array<Config>) =>
    Promise.all(
        configs.map(config => fetch(`article/${config.name}.md`))
            .concat(configs.map((config) => Promise.resolve({ text: () => config })))
    )).then((responses) =>
        Promise.all(responses.map((response) => response.text()))
    ).then((markdowns) => {
        const length = markdowns.length;
        const contents = Immutable.Range(0, length / 2).map((idx) =>
            Immutable.Map(markdowns[length / 2 + idx]).set("md", markdowns[idx])
        );
        console.log(contents.toJS());
    });

ReactDOM.render(<App max={100} fizz={3} buzz={5} />, document.getElementById("content"));