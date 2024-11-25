import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { ListingType } from '@/Types/listingType';
import Places from '@/data/places';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import colors from '@/constants/colors';
import Animated, { interpolate, SlideInDown, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';


const {width} = Dimensions.get('window');
const IMG_HEIGHT = 300;

const ListingDetails = () => {
  const { id } = useLocalSearchParams();
  const listing:ListingType = (Places as any[]).find(
    (item) => item.id === id
  );

  const router = useRouter();

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const imageAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [-IMG_HEIGHT/2, 0, IMG_HEIGHT * 0.75]),
        },
        {
          scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1])
        }
      ]
    }
  });

  return (
    <>
      <Stack.Screen options={{
        headerTransparent: true,
        headerTitle: '',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} style={{backgroundColor: "rgba(255, 255, 255, 0.5)", padding:4, borderRadius:10}}>
            <View style={{backgroundColor:colors.white, padding:6, borderRadius:10}}>
              <Feather name='arrow-left' size={20} />
            </View>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => {}} style={{backgroundColor: "rgba(255, 255, 255, 0.5)", padding:4, borderRadius:10}}>
            <View style={{backgroundColor:colors.white, padding:6, borderRadius:10}}>
              <Ionicons name='bookmark-outline' size={22} />
            </View>
          </TouchableOpacity>
        ),
      }} />
      
      <View style={styles.container}>
        <Animated.ScrollView ref={scrollRef} contentContainerStyle={{paddingBottom: 150}} showsVerticalScrollIndicator={false}>
          <Animated.Image source={{uri: listing.image}} style={[styles.image, imageAnimated]} />
          <View style={styles.contentWrapper}>
            <Text style={styles.listingName}>{listing.name}</Text>
            <View style={styles.locationWrapper}>
              <FontAwesome5 name='map-marker-alt' size={18} color={colors.primaryColor} />
              <Text style={styles.locationTxt}>{listing.location}</Text>
            </View>

            <View style={styles.hightlightWrapper}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.hightlightIcon}>
                  <Ionicons name='time' size={18} color={colors.primaryColor}/>
                </View>
                <View>
                  <Text style={{color:'#999', fontSize:12}}>Duration</Text>
                  <Text style={{color:colors.black, fontSize:14, fontWeight: "600"}}>{listing.duration} Day(s)</Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={styles.hightlightIcon}>
                  <FontAwesome5 name='users' size={18} color={colors.primaryColor}/>
                </View>
                <View>
                  <Text style={{color:'#999', fontSize:12}}>Person</Text>
                  <Text style={{color:colors.black, fontSize:14, fontWeight: "600"}}>{listing.duration}</Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={styles.hightlightIcon}>
                  <Ionicons name='star' size={18} color={colors.primaryColor}/>
                </View>
                <View>
                  <Text style={{color:'#999', fontSize:12}}>Rating</Text>
                  <Text style={{color:colors.black, fontSize:14, fontWeight: "600"}}>{listing.rating}</Text>
                </View>
              </View>
            </View>

            <Text style={{fontSize:16, color: colors.black, lineHeight:22, letterSpacing: 0.5}}>{listing.description}</Text>
          </View>
        </Animated.ScrollView>
      </View>

      <Animated.View style={styles.buttonsCon} entering={SlideInDown.delay(200)}>
        <TouchableOpacity onPress={() => {}} style={[styles.buttons, styles.bookBtn]}>
          <Text style={styles.buttonTxt}>Book Now</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.buttons}>
          <Text style={styles.buttonTxt}>${listing.price}</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  )
}

export default ListingDetails

const styles = StyleSheet.create({
  image: {
    width: width,
    height: IMG_HEIGHT
  },
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  contentWrapper: {
    padding: 20,
    backgroundColor: colors.white
  },
  listingName: {
    fontSize: 24,
    fontWeight: '500',
    color: colors.black,
    letterSpacing: 0.5
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10
  },
  locationTxt: {
    fontSize: 14,
    color: colors.black,
    marginLeft: 5,
  },
  hightlightWrapper: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  hightlightIcon: {
    backgroundColor: '#f4f4f4f4',
    padding: 8,
    borderRadius: 8,
    marginRight: 5,
    alignItems: 'center'
  },
  buttonsCon: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    padding: 20,
    paddingBottom: 30,
    width: width,
  },
  buttons: {
    flex: 1,
    backgroundColor: colors.black, padding: 20, borderRadius: 10, alignItems:"center"
  },
  buttonTxt:{
    color:colors.white, textTransform:"uppercase", fontSize:16, fontWeight: '600'
  },
  bookBtn:{
    flex: 2,
    backgroundColor: colors.primaryColor,
    marginRight: 20
  }

})