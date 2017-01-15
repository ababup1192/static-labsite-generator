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

fetch("config.json").then((response: any) => response.json())
.then((configs: Array<Config>) =>
    Promise.all(
        configs.map(config => fetch(`article/${config.name}.md`).then(r => r.text()))
    ).then((markdowns) => {
        const contents = Immutable.Range().take(markdowns.length).map((idx: number) =>
            Immutable.Map(configs[idx]).set("md", markdowns[idx])
        );
        console.log(contents.toJS());
    })
)
ReactDOM.render(<App max={100} fizz={3} buzz={5} />, document.getElementById("content"));