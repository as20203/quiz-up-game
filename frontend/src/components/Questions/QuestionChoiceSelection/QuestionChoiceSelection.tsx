import { FormControl, FormLabel } from '@material-ui/core';
import { QuestionChoice } from 'components';
import { TableSetState } from 'types';
interface QuestionChoiceSelectionProps {
  choices: string[];
  setChoices: TableSetState<string[]>;
  setSelectedIndex: TableSetState<number>;
  selectedIndex: number;
}
export const QuestionChoicesSelection = ({
  choices,
  setChoices,
  selectedIndex,
  setSelectedIndex
}: QuestionChoiceSelectionProps) => {
  return (
    <FormControl style={{ width: '200px', margin: '30px 0px' }} component='fieldset'>
      <FormLabel component='legend'>Choices: </FormLabel>

      {choices.map((choice, index) => (
        <QuestionChoice
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          index={index}
          setChoices={setChoices}
          value={choice}
        />
      ))}
    </FormControl>
  );
};
