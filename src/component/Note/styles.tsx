import {StyleSheet} from 'react-native';
import colors from '../../style/colors';

const styles = StyleSheet.create({
  delete: {
    height: 20,
    width: 30,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  sectionContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginVertical: 5,
    padding: 10,
    borderColor: colors.Text.gray,
    borderWidth: 1,
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
    fontWeight: '500',
    fontSize: 15,
    alignSelf: 'flex-start',
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    alignSelf: 'flex-start',
    paddingBottom: 3,
  },
});

export default styles;
