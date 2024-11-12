import { ActivityIndicator, FlatList, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListingType } from '@/Types/listingType';
import colors from '@/constants/colors';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';


type Props = {
    listings: ListingType[];
    category: string;
};

const Listings = ({ listings, category }: Props) => {
    const [loading, setLoading] = useState(false);
    const [filteredItem, setFilteredItem] = useState<ListingType[]>([]);

    useEffect(() => {
        setLoading(true);
        
        const filtered = category === 'All' ? listings : listings.filter((item) => item.category === category);
        setFilteredItem(filtered);

        setTimeout(() => setLoading(false), 100); // Reduce timeout duration for better responsiveness
    }, [category, listings]);

    const RenderItem: React.FC<{ item: ListingType }> = React.memo(({ item }) => (
        <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>
                <View style={styles.item}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View style={styles.bookmark}>
                        <Ionicons name="bookmark-outline" size={20} color={colors.white} />
                    </View>
                    <Text style={styles.itemTxt} numberOfLines={1} ellipsizeMode="tail">
                        {item.name}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name="map-marker-alt" size={18} color={colors.primaryColor} />
                            <Text style={styles.itemLocationTxt}>{item.location}</Text>
                        </View>
                        <Text style={styles.itemPriceTxt}>${item.price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    ));

    return (
        <View>
            {loading ? (
                <ActivityIndicator size="large" color={colors.primaryColor} />
            ) : filteredItem.length === 0 ? (
                <Text style={{ textAlign: 'center', marginVertical: 10 }}>No listings available in this category</Text>
            ) : (
                <FlatList
                    data={filteredItem}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <RenderItem item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            )}
        </View>
    );
};

export default Listings;

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