import { Button, Select } from "antd";
import { Dispatch, SetStateAction, useMemo } from "react";

import { useOrdersFilters } from "@/hooks";

import {
  StyledFilterButtons,
  StyledSelectsContainer,
  StyledTableFilterControls,
} from "./FilterControls.styled";

export interface FilterControlsProps {
  filters: {
    model?: number;
    city?: number;
    status?: number;
  };
  setFilters: Dispatch<SetStateAction<{ model?: number; city?: number; status?: number }>>;
  setIsFilterApplied: Dispatch<SetStateAction<boolean>>;
}

export function FilterControls({ filters, setFilters, setIsFilterApplied }: FilterControlsProps) {
  const isSomeFilterSelected = useMemo(
    () => !!filters.model || !!filters.city || !!filters.status,
    [filters.city, filters.status, filters.model],
  );

  const { models, cities, status } = useOrdersFilters();

  return (
    <StyledTableFilterControls>
      <StyledSelectsContainer>
        <Select
          placeholder="Марка"
          optionFilterProp="children"
          onChange={(value) => setFilters({ ...filters, model: value })}
          options={models}
          value={filters.model || null}
        />
        <Select
          placeholder="Город"
          optionFilterProp="children"
          onChange={(value) => setFilters({ ...filters, city: value })}
          value={filters.city || null}
          options={cities}
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
        <Button type="primary" onClick={() => setIsFilterApplied(true)}>
          Применить
        </Button>
        {isSomeFilterSelected && (
          <Button
            onClick={() => {
              setFilters({});
              setIsFilterApplied(false);
            }}
            type="primary"
            danger
          >
            Отменить
          </Button>
        )}
      </StyledFilterButtons>
    </StyledTableFilterControls>
  );
}
