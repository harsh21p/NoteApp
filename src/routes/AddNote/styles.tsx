import {StyleSheet} from 'react-native';
import colors from '../../style/colors';

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  text: {
    alignSelf: 'center',
    height: '100%',
  },
  back: {
    width: 50,
    height: 50,
    borderRadius: 25,
    paddingRight: 3,
    backgroundColor: colors.Button.primary,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  backImg: {
    width: '30%',
    alignSelf: 'center',
  },
});

export default styles;
