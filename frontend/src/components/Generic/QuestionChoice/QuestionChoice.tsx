import { FormControl, Input, Radio } from '@material-ui/core';
import { TableSetState } from 'types';

interface QuestionChoiceProps {
  value: string;
  index: number;
  setChoices: TableSetState<string[]>;
  setSelectedIndex: TableSetState<number>;
  selectedIndex: number;
}
export const QuestionChoice = ({
  value,
  setChoices,
  index,
  setSelectedIndex,
  selectedIndex
}: QuestionChoiceProps) => {
  return (
    <FormControl style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
      <Radio
        checked={typeof selectedIndex === 'number' ? index === selectedIndex : false}
        onClick={() => {
          setSelectedIndex(index);
        }}
      />
      <Input
        onChange={event => {
          setChoices(choices => {
            const choicesCopy = [...choices];
            choicesCopy[index] = event.target.value;
            return choicesCopy;
          });
        }}
        value={value}
        required={true}
        type='text'
        placeholder='Enter your choice'
      />
    </FormControl>
  );
};
