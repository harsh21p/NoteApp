import {StyleSheet} from 'react-native';
import colors from '../../style/colors';

const styles = StyleSheet.create({
  holder: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    paddingHorizontal: 10,
  },
  activity: {
    alignSelf: 'center',
  },
  sectionContainer: {
    justifyContent: 'flex-end',
  },
  header: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: colors.Generic.white,
    shadowColor: colors.Text.gray,
    shadowOpacity: 0.8,
    shadowOffset: {height: 3, width: 3},
    shadowRadius: 5,
    elevation: 3,
  },
  notesText: {
    fontWeight: '700',
    fontSize: 25,
    paddingBottom: 20,
    paddingTop: 10,
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
  myFirstView: {
    height: '100%',
  },
  mySecondView: {
    width: '100%',
    height: '25%',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: '10%',
    position: 'absolute',
  },
  floating: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.Button.primary,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    shadowColor: colors.Text.gray,
    shadowOpacity: 0.8,
    shadowOffset: {height: 5, width: 5},
    shadowRadius: 10,
    elevation: 5,
  },
});

export default styles;
