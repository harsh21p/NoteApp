import {StyleSheet} from 'react-native';
import colors from '../../style/colors';

const styles = StyleSheet.create({
  activity: {
    alignSelf: 'center',
    paddingVertical: 30,
  },
  sectionContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
  },
  notesText: {
    fontWeight: '600',
    fontSize: 20,
    paddingBottom: 20,
  },
  notFound: {
    alignSelf: 'center',
    paddingVertical: 30,
  },
  add: {width: 20, height: 20, alignSelf: 'center'},
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
  floating: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.Button.primary,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default styles;
