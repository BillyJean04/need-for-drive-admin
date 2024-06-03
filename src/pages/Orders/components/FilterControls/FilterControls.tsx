import { Button, Select } from "antd";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

import { useOrdersFilters } from "@/hooks";
import { Filters } from "@/types";

import {
  StyledFilterButtons,
  StyledSelectsContainer,
  StyledTableFilterControls,
} from "./FilterControls.styled";

export interface FilterControlsProps {
  setFilters: Dispatch<SetStateAction<Filters>>;
}

export function FilterControls({ setFilters }: FilterControlsProps) {
  const [selectedValues, setSelectedValues] = useState<Filters>({});

  const isSomeFilterSelected = useMemo(
    () => Object.values(selectedValues).some((item) => !!item),
    [selectedValues],
  );

  const { models, cities, status: statusOptions } = useOrdersFilters();

  return (
    <StyledTableFilterControls>
      <StyledSelectsContainer>
        <Select
          placeholder="Марка"
          optionFilterProp="children"
          onChange={(value) => setSelectedValues({ ...selectedValues, model: value })}
          options={models}
          value={selectedValues.model || null}
        />
        <Select
          placeholder="Город"
          optionFilterProp="children"
          onChange={(value) => setSelectedValues({ ...selectedValues, city: value })}
          value={selectedValues.city || null}
          options={cities}
        />
        <Select
          placeholder="Статус"
          optionFilterProp="children"
          onChange={(value) => setSelectedValues({ ...selectedValues, status: value })}
          value={selectedValues.status || null}
          options={statusOptions}
        />
      </StyledSelectsContainer>
      <StyledFilterButtons>
        <Button
          type="primary"
          onClick={() => {
            setFilters({ ...selectedValues });
          }}
        >
          Применить
        </Button>
        {isSomeFilterSelected && (
          <Button
            onClick={() => {
              setSelectedValues({});
              setFilters({});
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
