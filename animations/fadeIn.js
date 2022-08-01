import React from "react";
import { Dimensions, Animated } from "react-native";

class fadeIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionLeft: new Animated.Value(Dimensions.get("window").width),
    };
  }

  componentDidMount() {
    Animated.spring(this.state.positionLeft, {
      toValue: 0,
      useNativeDriver: false
    }).start();
  }
  render() {
    return (
      <Animated.View style={{ left: this.state.positionLeft }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

export default fadeIn;
