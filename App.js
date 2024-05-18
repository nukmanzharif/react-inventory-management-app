import React from 'react';
import { StyleSheet, SectionList, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { format } from 'date-fns';
import items from './items.json';
import images from './imageMapping';
import ItemDetail from './ItemDetail';

const { width } = Dimensions.get('window');
const numColumns = 2;
const sidePadding = 20;
const itemSize = (width - sidePadding * 2 - 10) / numColumns;

const HomeScreen = ({ navigation }) => {
  const currentDate = new Date();

  const nonExpiredItems = items.itemList.filter(item => new Date(item.expiry_date) > currentDate);
  const expiredItems = items.itemList.filter(item => new Date(item.expiry_date) <= currentDate);

  const sections = [
    { title: 'Non-Expired Items', data: nonExpiredItems },
    { title: 'Expired Items', data: expiredItems }
  ];

  const renderItem = ({ item, index, section }) => {
    if (index % numColumns !== 0) return null; // Only render the first item in each row

    const itemsInRow = section.data.slice(index, index + numColumns);

    return (
      <View style={styles.row}>
        {itemsInRow.map((rowItem) => (
          <TouchableOpacity
            key={rowItem.id}
            style={[styles.itemBox, { width: itemSize, height: itemSize }]}
            onPress={() => navigation.navigate('ItemDetail', { item: { ...rowItem, formatted_expiry_date: format(new Date(rowItem.expiry_date), 'MMMM dd, yyyy') } })}
          >
            <Image source={images[rowItem.item_name.replace(/\s+/g, '_')]} style={styles.image} />
            <Text style={styles.itemName}>{rowItem.item_name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inventory Management' }} />
        <Stack.Screen name="ItemDetail" component={ItemDetail} options={{ title: 'Item Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: sidePadding,
  },
  sectionHeader: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: sidePadding,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemBox: {
    margin: 5,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
    marginBottom: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;