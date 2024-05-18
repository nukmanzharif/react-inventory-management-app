import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import images from './imageMapping';

const ItemDetail = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Image source={images[item.item_name.replace(/\s+/g, '_')]} style={styles.image} />
      <Text style={styles.itemName}>{item.item_name}</Text>
      <Text style={styles.itemCat}>{item.item_cat}</Text>
      <Text style={styles.expiryDate}>Expired on: {item.formatted_expiry_date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemCat: {
    fontSize: 18,
    color: '#666',
  },
  expiryDate: {
    fontSize: 16,
    color: '#999',
  },
});

export default ItemDetail;