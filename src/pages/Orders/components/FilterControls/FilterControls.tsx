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
    model?: number;
    city?: number;
    status?: number;
  };
  setFilters: Dispatch<SetStateAction<{ model?: number; city?: number; status?: number }>>;
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
    () => !!filters.model || !!filters.city || !!filters.status,
    [filters.city, filters.status, filters.model],
  );

  const resetFilters = () => {
    setFilters({});
    handleClickResetFilters();
  };

  const { model, status, city } = filterOptions;

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
          placeholder="Статус"
          optionFilterProp="children"
          onChange={(value) => setFilters({ ...filters, status: value })}
          value={filters.status || null}
          options={status}
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
