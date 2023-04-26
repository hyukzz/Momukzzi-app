import { StyleSheet, View, Text, ScrollView } from 'react-native';

interface MenuType {
  shopInfo: {
    category_name: string;
    phone: string;
    road_address_name: string;
  };
  shopMenus: Array<Array<string>>;
}

const ShopMenu = ({ menuInfo }: { menuInfo: MenuType }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>주소</Text>
          <Text style={styles.value}>
            {menuInfo?.shopInfo?.road_address_name}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>음식 종류</Text>
          <Text style={styles.value}>
            {menuInfo?.shopInfo?.category_name?.split('>')[1]}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>전화번호</Text>
          <Text style={styles.value}>
            {!menuInfo?.shopInfo?.phone
              ? '정보 없음'
              : menuInfo?.shopInfo?.phone}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>메뉴</Text>
          <View style={styles.menuList}>
            {menuInfo?.shopMenus?.slice(0, 8).map((menu, index) => {
              return (
                <Text key={index} style={styles.menuItem}>
                  {menu[0]} : {menu[1]}
                  {menu[1] !== '가격 정보 없음' ? '원' : ''}
                </Text>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    width: 100,
    fontSize: 16,
    color: 'rgba(79, 79, 79, 0.6)',
    lineHeight: 20,
    textAlign: 'left',
    paddingRight: 10,
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: '#4f4f4f',
    lineHeight: 20,
    textAlign: 'left',
  },
  menuList: {
    flex: 1,
    marginVertical: 0,
    paddingVertical: 0,
  },
  menuItem: {
    fontSize: 14,
    color: '#4f4f4f',
    lineHeight: 20,
    textAlign: 'left',
    marginBottom: 2,
  },
});

export default ShopMenu;
