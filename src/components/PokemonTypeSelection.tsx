import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
  } from "@mui/material";
  
  export type PokemonTypeSelectionProps = {
    selectedType: string | undefined;
    selectType: (type: string | undefined) => void;
  };
  
  const KNOWN_TYPES = [
    "grass",
    "poison",
    "fire",
    "water",
    "flying"
  ] as const;
  
  export function PokemonTypeSelection({
    selectedType,
    selectType
  }: PokemonTypeSelectionProps) {
    const handleChange = (event: SelectChangeEvent<string>) => {
      const value = event.target.value;
      selectType(value === "" ? undefined : value);
    };
  
    return (
      <FormControl fullWidth>
        <InputLabel id="pokemon-type-select-label">Filter by type</InputLabel>
        <Select
          labelId="pokemon-type-select-label"
          label="Filter by type"
          value={selectedType ?? ""}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>All types</em>
          </MenuItem>
          {KNOWN_TYPES.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }