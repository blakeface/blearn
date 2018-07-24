import React from 'react';
import { StyleSheet, MaskedViewIOS, View, Text } from 'react-native';

export default class App extends React.Component {
	render() {
		return (
			<MaskedViewIOS
				style={styles.maskedView}
				maskElement={
					<View style={styles.container}>
						<Text style={styles.headerText}>
							BLEARN
						</Text>
					</View>
				}
			>
				<View style={{ flex: 1, height: '100%', backgroundColor: '#324376' }} />
				<View style={{ flex: 1, height: '100%', backgroundColor: '#F5DD90' }} />
				<View style={{ flex: 1, height: '100%', backgroundColor: '#F76C5E' }} />
			</MaskedViewIOS>
		);
	}
}

const styles = StyleSheet.create({
	maskedView: {
		flex: 1,
		flexDirection: 'row',
		height: '100%',
	},
	container: {
		flex: 1,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerText: {
		fontSize: 60,
		color: 'black',
		fontWeight: 'bold',
	},
});
