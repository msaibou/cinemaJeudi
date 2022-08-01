import React from "react";
import { Dimensions, Animated } from "react-native";

class enlargeShrink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: new Animated.Value(50),
      //height: new Animated.Value(30),
    };
  } /*
  _enlarge() {
    Animated.spring(this.state.width, { toValue: 60 }).start();
  }
  _resize() {
    Animated.spring(this.state.width, { toValue: 30 }).start();
  }*/

  _getSize() {
    console.log(this.props.shouldEnlarge);
    if (this.props.shouldEnlarge) {
      return 100;
    }
    return 50;
  }

  componentDidUpdate() {
    console.log("mount");
    Animated.spring(this.state.width, {
      toValue: this._getSize(),
      useNativeDriver: false,
    }).start();
  }
  render() {
    console.log("render");
    return (
      <Animated.View
        style={{
          //borderWidth: 1,
          //borderColor: "#000",
          width: this.state.width,
          height: this.state.width,
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default enlargeShrink;
