import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';

export default class InformationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      imagePath: '',
      url: `http://localhost:5000/planet?name=${this.props.navigation.getParam(
        'star_name'
      )}`,
    };
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails = () => {
    const { url } = this.state;

    axios
      .get(url)
      .then((response) => {
        this.setState({ data: response.data.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  render() {
    const { data } = this.state;

    if (data) {
      return (
        <View style={styles.container}>
          <View style={styles.upperContainer}>
            <Text style={styles.starName}>{data.name}</Text>
          </View>

          <View style={styles.middleContainer}>
            <View>
              <Text style={styles.text}>{data.mass}</Text>
              <Text style={styles.text}>Mass</Text>
            </View>

            <View>
              <Text style={styles.text}>{Math.round(data.gravity)}</Text>
              <Text style={styles.text}>Gravity</Text>
            </View>

            <View>
              <Text style={styles.text}>{data.radius}</Text>
              <Text style={styles.text}>Radius</Text>
            </View>
          </View>

          <View style={styles.lowerContainer}>
            <Text style={styles.text}>{data.distance}</Text>
            <Text style={styles.text}>Distance from Earth</Text>
          </View>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edc988',
  },
  upperContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerContainer: {
    flex: 0.9,
  },
});