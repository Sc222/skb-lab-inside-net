import React, { Component } from "react";

interface AppProps {}

interface AppState {}

export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    return <div>Project setup</div>;
  }
}
