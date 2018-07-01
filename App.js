import React, { Component } from 'react'
import { Animated, TouchableOpacity, StyleSheet, Text, View } from 'react-native'

export default class App extends Component {
    state = {
        deg1: '0deg',
        deg2: '0deg',
        rotateAnimation: new Animated.Value(0),
        toRight: true
    }

    rotateAnimationHandler = () => {
        this.state.toRight
            ? this.setState({deg1: '0deg', deg2: '200deg'})
            : this.setState({deg1: '180deg', deg2: '-20deg'})

        Animated.timing(this.state.rotateAnimation, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                deg1: this.state.toRight ? '180deg' : '0deg'
            })
            Animated.timing(this.state.rotateAnimation, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true
            }).start(() => {
                let switcher = !this.state.toRight
                this.setState({
                    rotateAnimation: new Animated.Value(0),
                    toRight: switcher
                })
            })
        })
    }

    rotateAnimationSetter = (deg1, deg2) => {
        return this.state.rotateAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [deg1, deg2]
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={
                    [styles.button, {
                        transform: [
                            {
                                rotateY: this.rotateAnimationSetter(this.state.deg1, this.state.deg2)
                            }
                        ]
                    }]
                }>
                    <TouchableOpacity onPress={this.rotateAnimationHandler} style={styles.button}>
                        <View style={styles.card}>
                            <View style={styles.front}>
                                <Text style={styles.content}>Click to flip</Text>
                            </View>
                            <View style={styles.back}>
                                <Text style={styles.content}>Your content</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00a5f7',
    },
    button: {
        width: 300,
        height: 200,
        borderRadius: 7,
        borderColor: '#fff',
        backgroundColor:'#fff',
        position: 'relative'
    },
    content: {
        textAlign: 'center'
    },
    card: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderRadius: 7,
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: '#000',
        shadowOpacity: 1.0,
    },
    flipped: {
        transform: [
            { rotateX: '180deg' }
        ]
    },
    front: {

    },
    back: {
        transform: [
            { rotateY: '180deg' }
        ]
    }
});
