import { Button, Select } from "antd";
import { Dispatch, SetStateAction, useMemo } from "react";

import {
  StyledFilterButtons,
  StyledSelectsContainer,
  StyledTableFilterControls,
} from "./FilterControls.styled";

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

  return (
    <StyledTableFilterControls>
      <StyledSelectsContainer>
        <Select
          style={{ width: 110, height: 30 }}
          placeholder="Марка"
          optionFilterProp="children"
          onChange={(value) => setFilters({ ...filters, model: value })}
          options={[
            { value: "Harley Davidson", label: "Harley Davidson" },
            { value: "Audi", label: "Audi" },
            { value: "Hyundai", label: "Hyundai" },
            { value: "Mercedes", label: "Mercedes" },
            { value: "MINI", label: "MINI" },
            { value: "BMW", label: "BMW" },
            { value: "Vespa", label: "Vespa" },
          ]}
          value={filters.model || null}
        />
        <Select
          style={{ width: 110, height: 30 }}
          placeholder="Город"
          optionFilterProp="children"
          onChange={(value) => setFilters({ ...filters, city: value })}
          value={filters.city || null}
          options={[
            { value: "Ульяновск", label: "Ульяновск" },
            { value: "Санкт-Петербург", label: "Санк-Петербург" },
            { value: "Казань", label: "Казань" },
          ]}
        />
        <Select
          style={{ width: 110, height: 30 }}
          placeholder="Цвет"
          optionFilterProp="children"
          onChange={(value) => setFilters({ ...filters, color: value })}
          value={filters.color || null}
          options={[
            { value: "Черный", label: "Черный" },
            { value: "Красный", label: "Красный" },
            { value: "Желтый", label: "Желтый" },
            { value: "Серый", label: "Серый" },
            { value: "Зеленый", label: "Зеленый" },
            { value: "Серебро", label: "Серебро" },
          ]}
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
