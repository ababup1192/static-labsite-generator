// import Style Sheet
import "../style/main.css";

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as fetch from "isomorphic-fetch";
import { Promise } from "es6-promise";
import * as Immutable from "immutable";
import * as ReactMarkown from "react-markdown";
const RM = ReactMarkown as any;

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
            const contents = Immutable.Range(0, markdowns.length).map((idx: number) =>
                Immutable.Map(configs[idx]).set("md", markdowns[idx])
            );
            const testMDs = contents.map((content, idx) =>
                <li key={idx}><RM source={content.get("md")} /></li>
            );

            ReactDOM.render(
                <ul>
                    {testMDs}
                </ul>
                , document.getElementById("content")
            );
        })
    );
