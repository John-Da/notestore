import { FlatList, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ListingType } from '@/listingType';
import colors from '@/constants/colors';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';


type Props = {
    listings: any[]
};

const Listings = ({listings}: Props) => {

    const renderItems:ListRenderItem<ListingType> = ({item}) => {
        return (
            <TouchableOpacity>
                <View style={styles.item}>
                    
                    <Image source={{uri: item.image}} style={styles.image} />
                    
                    <View style={styles.bookmark}>
                        <Ionicons name='bookmark-outline' size={20} color={colors.white} />
                    </View>
                    
                    <Text style={styles.itemTxt} numberOfLines={1} ellipsizeMode='tail' >{item.name}</Text>

                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <FontAwesome5 name='map-marker-alt' size={18} color={colors.primaryColor} />
                            <Text style={styles.itemLocationTxt}>{item.location}</Text>
                        </View>
                        
                        <Text style={styles.itemPriceTxt}>
                            ${item.price}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
  return (
    <View>
      <FlatList data={listings} renderItem={renderItems} horizontal showsHorizontalScrollIndicator={false}/>
    </View>
  )
}

export default Listings

const styles = StyleSheet.create({
    item: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 10,
        marginRight: 20,
        width: 220,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 30,
    },
    bookmark: {
        position: 'absolute',
        top: 185,
        right: 30,
        backgroundColor: colors.primaryColor,
        padding: 10,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: colors.white,
    },
    itemTxt: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.black,
        marginBottom: 10,
    },
    itemLocationTxt: {
        marginLeft: 5,
        fontSize: 12,
    },
    itemPriceTxt: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.primaryColor
    }
})