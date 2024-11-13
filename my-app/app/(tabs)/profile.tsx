import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import UserProfile from '@/data/user.json'
import colors from '@/constants/colors'
import { useHeaderHeight } from '@react-navigation/elements'

const Profile = () => {
  const headerHeight = useHeaderHeight();
  const user = UserProfile[0]; 

  return (
    <>
      <Stack.Screen 
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}} style={styles.headerLeft}>
              <Text style={styles.headerUsername}>{user.username || 'UserName'}</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerIcons}>
              <TouchableOpacity onPress={() => {}} style={styles.iconButton} activeOpacity={0.7}>
                <Ionicons name='menu' size={24} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} style={styles.iconButton} activeOpacity={0.7}>
                <Ionicons name='notifications-outline' size={24} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} style={styles.iconButton} activeOpacity={0.7}>
                <Ionicons name='settings-outline' size={24} color="#333" />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profileHeader}>
            <View style={styles.firstLeft}>
              <View style={styles.profileImageContainer}>
                <Image source={{ uri: user.profileImg }} style={styles.profileImage} />
              </View>
            </View>
            <View style={styles.firstRight}>
              <View style={styles.conInfo}>
                <Text style={styles.infoTxtOne}>15</Text>
                <Text style={styles.infoTxtTwo}>Posts</Text>
              </View>
              <View style={styles.conInfo}>
                <Text style={styles.infoTxtOne}>30</Text>
                <Text style={styles.infoTxtTwo}>Followers</Text>
              </View>
              <View style={styles.conInfo}>
                <Text style={styles.infoTxtOne}>20</Text>
                <Text style={styles.infoTxtTwo}>Following</Text>
              </View>
            </View>
          </View>

          <View style={styles.userTalks}>
            <Text style={styles.usernameText}>{user.username || 'UserName'}</Text>
            <Text style={styles.bioText}>{user.bio}</Text>
            <View style={styles.profileEditBox}>
              <TouchableOpacity onPress={() => {}} style={styles.editProfile} activeOpacity={0.8}>
                <Text style={styles.editProfileText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} style={styles.addUsersBtn} activeOpacity={0.7}>
                <Ionicons name='person-add' size={16} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Highlights</Text>
          </View>
          
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Posts</Text>
          </View>
        </ScrollView>
      </View>
    </>
  )
}

export default Profile

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 20,
  },
  headerUsername: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
    marginRight: 20,
  },
  iconButton: {
    marginLeft: 15,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20, 
    backgroundColor: colors.bgColor,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  firstLeft: {
    marginRight: 30,
  },
  profileImage: {
    width: 80,
    height: 80, 
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  profileImageContainer: {
    alignItems: 'center',
  },
  firstRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  conInfo: {
    alignItems: 'center',
  },
  infoTxtOne: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  infoTxtTwo: {
    fontSize: 14,
    color: '#666',
  },
  userTalks: {
    marginVertical: 12,
  },
  usernameText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  bioText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
    marginVertical: 10,
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  editProfile: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
    borderRadius: 8,
    paddingVertical: 6,
    marginRight: 10,
  },
  addUsersBtn: {
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: colors.black,
    borderRadius: 6,
    width: 30,
    height: 30,
  },
  profileEditBox: {
    flexDirection: 'row',
    marginTop: 5,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
})
