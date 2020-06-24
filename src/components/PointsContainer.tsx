import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface Props {
    points: number;
}

const PointsContainer = (props: Props) => {
    return (
        <View style={styles.pointsContainer}>
            <Text style={styles.points}>{`Punkty: ${props.points}`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    points: {
        color: 'black',
        fontSize: 30,
    },
    pointsContainer: {},
});
export default PointsContainer;
