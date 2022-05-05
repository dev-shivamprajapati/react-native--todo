import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TextInput,
	Button,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import React, { useState } from 'react';
// UI Components
import { openAlert } from '../ui-components/Alert';
// ICONS
import { MaterialIcons } from '@expo/vector-icons';

const ToDoApp = () => {
	const [todos, setTodos] = useState([
		{
			text: 'Buy Coffee',
			key: '1',
		},
		{
			text: 'Attend Meeting',
			key: '2',
		},
	]);

	const [newTodo, setNewTodo] = useState('');

	const updateTodos = async () => {
		await validateNewTodo(newTodo).then((isValid) => {
			if (isValid) {
				setTodos((prevTodos) => {
					return [{ text: newTodo, key: Math.random().toString() }, ...prevTodos];
				});
				setNewTodo('');
			}
		});
	};

	const validateNewTodo = async (newTodo) => {
		if (newTodo.length < 3) {
			openAlert('Oops!!', `Minimum 3 characters are required to add a new task.`, [
				{
					text: 'Understood',
					onPress: () => console.log('Understood is Pressed'),
				},
			]);
			return false;
		} else if (await taskAlreadyAdded(newTodo)) {
			openAlert('Oops!!', `'${newTodo}' is already there in your todos`, [
				{
					text: 'Understood',
					onPress: () => console.log('Understood is Pressed'),
				},
			]);
			return false;
		}
		return true;
	};

	const taskAlreadyAdded = async (newItem) => {
		for (let todo of todos) {
			if (todo.text.toLocaleLowerCase() === newItem.toLocaleLowerCase()) {
				return true;
			}
		}
		return false;
	};

	const removeTodo = (key) => {
		setTodos((prevSate) => {
			return prevSate.filter((todo) => todo.key != key);
		});
	};

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}>
			<View style={styles.container}>
				{/* Heder */}
				<View style={styles.header}>
					<Text style={styles.title}>My Todos</Text>
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						autoFocus={true}
						value={newTodo}
						style={styles.input}
						placeholder='My new task'
						onChangeText={(value) => {
							setNewTodo(value);
						}}
					/>
					<Button color='coral' title='Add Todo' onPress={updateTodos} />
				</View>
				{/* List */}
				<View style={styles.content}>
					<View style={styles.listContainer}>
						<FlatList
							data={todos}
							renderItem={({ item }) => (
								<TouchableOpacity
									onPress={() => {
										// removeTodo(item.key);
									}}>
									<View style={styles.listItemContainer}>
										<Text style={styles.listText}>{item.text}</Text>
										<View style={styles.listIcon}>
											<MaterialIcons
												name='check-circle'
												size={25}
												color='coral'
												onPress={() => {
													removeTodo(item.key);
												}}
											/>
										</View>
									</View>
								</TouchableOpacity>
							)}
						/>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header: {
		height: 80,
		paddingTop: 30,
		backgroundColor: 'coral',
	},
	title: {
		color: '#fff',
		fontSize: 30,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	content: {
		flex: 1,
		padding: 20,
		paddingHorizontal: 30,
		// backgroundColor: 'red',
	},
	listContainer: {
		// backgroundColor: 'yellow',
		flex: 1,
		// marginTop: 5,
	},
	listItemContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'center',
		borderWidth: 1,
		borderStyle: 'dashed',
		borderColor: 'grey',
		borderRadius: 5,
		marginTop: 5,
		padding: 10,
		// backgroundColor: 'coral',
	},

	listText: { flex: 12, justifyContent: 'flex-start', alignContent: 'center' },
	listIcon: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center' },
	inputContainer: {
		padding: 15,
		height: 150,
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	input: {
		borderBottomWidth: 1,
		borderBottomColor: 'coral',
		padding: 5,
		width: '90%',
		borderRadius: 5,
	},
	addButton: {
		width: 200,
		padding: 5,
		backgroundColor: 'coral',
	},
});

export default ToDoApp;
