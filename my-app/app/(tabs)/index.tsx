import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import colors from '@/constants/colors'
import {useHeaderHeight} from '@react-navigation/elements';
import CategoryBtns from '@/components/CategoryBtns'
import Listings from '@/components/Listings'
import Places from '@/data/places'


const Page = () => {

  const headerHeight = useHeaderHeight();
  const [category, setCategory] = useState('All');

  const onCateChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <>
      <Stack.Screen options={{
        headerTransparent:true,
        headerTitle:'',
        headerLeft: () => (
          <TouchableOpacity onPress={() => {}} style={{marginLeft:20}}>
            <Image source={{
              uri: "https://images.unsplash.com/photo-1730973915515-e79273d90b7c?q=80&w=3165&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }} style={{
              width:45, height:45, borderRadius:10,
            }}/>
          </TouchableOpacity>
        ),
        headerRight:() => (
          <TouchableOpacity onPress={() => {}} style={{
            marginRight:20,
            backgroundColor:colors.white,
            padding:10,
            borderRadius:10,
            shadowColor:'#171717',
            shadowOffset:{width:2, height:4},
            shadowOpacity:0.2,
            shadowRadius:3,
          }}>
            <Ionicons name='notifications' size={28} color={colors.black} />
          </TouchableOpacity>
        ),
      }}/>
      <View style={[styles.container, {paddingTop:headerHeight}]}>
        <Text style={styles.headingTxt}>Explore The Beautiful World!</Text>
        <View style={styles.searchSectionWrapper}>
          <View style={styles.searchBar}>
            <Ionicons name='search' size={18} style={{marginRight:5}} color={colors.black}/>
            <TextInput placeholder='Search...' />
          </View>
          <TouchableOpacity onPress={() => {}} style={styles.filterBtn}>
            <Ionicons name='options' size={28} color={colors.white} />
          </TouchableOpacity>
        </View>

        <CategoryBtns onCateChanged={onCateChanged} />

        <Listings listings={Places}/>
      </View>
    </>
  );
};

export default Page

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal:20,
        backgroundColor: colors.bgColor,
    },
    headingTxt: {
      fontSize: 28,
      fontWeight: '800',
      color: colors.black,
      marginTop: 10,
    },
    searchSectionWrapper: {
      flexDirection: 'row',
      marginVertical: 20,
      alignItems: 'center'
    },
    searchBar: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: colors.white,
      padding: 16,
      borderRadius: 10,
    },
    filterBtn: {
      backgroundColor: colors.primaryColor,
      borderRadius: 10,
      padding: 12,
      marginLeft: 20,
    },
})