import { Autocomplete, InputLabel, TextField } from '@mui/material';
import styles from './AutoComplete.module.css';

type Props = {
  chave?: number;
  label: string;
  getOptionLabel?: (op: any) => any;
  value?: any;
  set: (v: any) => any;
  arrayData: any[];
  renderOption?: (event: any, option: any) => any;
  disabled?: boolean;
};

export default function AutocompleteComponent(props: Props) {
  return (
    <div className={styles.campo}>
      <InputLabel
        style={{
          marginRight: '8px',
          marginBottom: '15px',
          marginTop: '10px',
          marginLeft: '8px',
          color: '#000',
        }}
      >
        {props.label}
      </InputLabel>
      <Autocomplete
        disablePortal
        id={`${props.chave}`}
        // {...(props.getOptionLabel
        //   ? { getOptionLabel: props.getOptionLabel }
        //   : { renderOption: props.renderOption })}
        getOptionLabel={props.getOptionLabel}
        renderOption={props.renderOption}
        value={props.value}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        // getOptionSelected={(option, value) => option.id === value.id}
        onChange={(event: any, newValue: any) => {
          props.set(newValue);
        }}
        options={props.arrayData}
        className={styles.field}
        sx={{
          backgroundColor: '#f7f7f7',
          marginLeft: '8px',
          marginRight: '8px',
        }}
        disabled={props.disabled}
        renderInput={params => (
          <TextField {...params} label="" type="text" variant="outlined" />
        )}
      />
    </div>
  );
}
