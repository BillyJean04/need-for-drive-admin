import { Button, Select } from "antd";
import { Dispatch, SetStateAction, useMemo } from "react";

import {
  StyledFilterButtons,
  StyledSelectsContainer,
  StyledTableFilterControls,
} from "./FilterControls.styled";
import { filterOptions } from "./filterOptions";

export interface FilterControlsProps {
  filters: {
    model: string;
    city: string;
    color: string;
  };
  setFilters: Dispatch<SetStateAction<{ model: string; city: string; color: string }>>;
  handleClickSubmitFilter: () => void;
  handleClickResetFilters: () => void;
}

export function FilterControls({
  filters,
  setFilters,
  handleClickSubmitFilter,
  handleClickResetFilters,
}: FilterControlsProps) {
  const isSomeFilterSelected = useMemo(
    () => !!filters.model || !!filters.city || !!filters.color,
    [filters.city, filters.color, filters.model],
  );

  const resetFilters = () => {
    setFilters({
      city: "",
      model: "",
      color: "",
    });

    handleClickResetFilters();
  };

  const { model, color, city } = filterOptions;

  return (
    <StyledTableFilterControls>
      <StyledSelectsContainer>
        <Select
          placeholder="Марка"
          optionFilterProp="children"
          onChange={(value) => setFilters({ ...filters, model: value })}
          options={model}
          value={filters.model || null}
        />
        <Select
          placeholder="Город"
          optionFilterProp="children"
          onChange={(value) => setFilters({ ...filters, city: value })}
          value={filters.city || null}
          options={city}
        />
        <Select
          placeholder="Цвет"
          optionFilterProp="children"
          onChange={(value) => setFilters({ ...filters, color: value })}
          value={filters.color || null}
          options={color}
        />
      </StyledSelectsContainer>
      <StyledFilterButtons>
        <Button onClick={handleClickSubmitFilter} type="primary">
          Применить
        </Button>
        {isSomeFilterSelected && (
          <Button onClick={resetFilters} type="primary" danger>
            Отменить
          </Button>
        )}
      </StyledFilterButtons>
    </StyledTableFilterControls>
  );
}
