import { Alert } from 'react-native';

const openAlert = (title, message, buttons) => {
	Alert.alert(title, message, buttons);
};

export { openAlert };
