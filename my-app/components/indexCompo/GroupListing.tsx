import { FlatList, Image, ListRenderItem, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GroupType } from '@/Types/groupListType'
import colors from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'

const GroupListing = ({ listings }: { listings: GroupType[] }) => {
    const RenderItem: React.FC<{ item: GroupType }> = React.memo(({ item }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.image || 'fallback-image-uri' }} style={styles.image} />
            <View>
                <Text style={styles.itemTxt}>{item.name}</Text>
                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={18} color={colors.primaryColor} />
                    <Text style={styles.itemRating}>{item.rating}</Text>
                    <Text style={styles.itemReview}>({item.reviews})</Text>
                </View>
            </View>
        </View>
    ));

    return (
        <View style={{ marginTop: 20 }}>
            <Text style={styles.title}>Top Travel Group</Text>
            <FlatList
                data={listings}
                renderItem={({ item }) => <RenderItem item={item} />}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                getItemLayout={(data, index) => ({
                    length: 120,  // Set item height if fixed
                    offset: 120 * index,
                    index
                })}
            />
        </View>
    );
};

export default GroupListing;

const styles = StyleSheet.create({
    item: {
        backgroundColor: colors.white,
        marginRight: 20,
        padding: 10, 
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        borderRadius: 10,
        width: 80,
        height: 100,
        marginRight: 10
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        color: colors.black,
        marginBottom: 20,
    },
    itemTxt: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.black,
        marginBottom: 8,
    },
    itemRating: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.black,
        marginLeft: 8,
    },
    itemReview: {
        fontSize: 14,
        color: '#999',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
