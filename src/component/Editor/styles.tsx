import {StyleSheet} from 'react-native';
import colors from '../../style/colors';

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderColor: colors.Text.gray,
    borderWidth: 1,
    marginVertical: 10,
  },
  description: {
    padding: 10,
    borderColor: colors.Text.gray,
    borderWidth: 1,
    height: 100,
  },
  main: {
    padding: 20,
  },
  button: {
    backgroundColor: colors.Button.primary,
    justifyContent: 'center',
    padding: 10,
    marginVertical: 10,
  },
  save: {
    alignSelf: 'center',
    color: colors.Text.white,
  },
});

export default styles;
