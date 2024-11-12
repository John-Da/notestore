import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import colors from '@/constants/colors'
import destinationCategories from '@/data/categories'
import { MaterialCommunityIcons } from '@expo/vector-icons'


type Props = {
    onCateChanged: (category: string) => void;
}

const CategoryBtns = ({ onCateChanged }: Props ) => {

    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<TouchableOpacity[] | null[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    
    const handleSelectedCategory = (index: number) => {
        const selected = itemRef.current[index];
        setActiveIndex(index);

        selected?.measure((x) => {
            scrollRef.current?.scrollTo({x:x, y:0, animated: true});
        })

        onCateChanged(destinationCategories[index].title);
    };

  return (
    <View>
      <Text style={styles.title}>Categories</Text>
      <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
        gap: 20,
        paddingVertical: 10,
        marginBottom: 10,
      }}>
        {destinationCategories.map((item, index) => (
            <TouchableOpacity key={index} ref={(el) => itemRef.current[index] = el} onPress={() => handleSelectedCategory(index)}
            style={activeIndex == index ? styles.categoryBtnActive : styles.categoryBtn}>
                <MaterialCommunityIcons name={item.iconName as any} size={20} color={activeIndex == index ? colors.white : colors.black}/>
                <Text style={activeIndex == index ? styles.categoryBtnActiveTxt : styles.categoryBtnTxt}>{item.title}</Text>
            </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default CategoryBtns

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: colors.black,
    },
    categoryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        shadowColor: '#333333',
        shadowOffset: {width:1, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    categoryBtnTxt: {
        marginLeft: 5,
        color: colors.black
    },
    categoryBtnActive: {
        backgroundColor: colors.primaryColor,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        shadowColor: '#333333',
        shadowOffset: {width:1, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    categoryBtnActiveTxt: {
        marginLeft: 5,
        color: colors.white
    }
})