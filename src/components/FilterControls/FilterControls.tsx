import { Button, Select, Skeleton } from "antd";
import { isEmpty } from "lodash";
import { Dispatch, SetStateAction, useState } from "react";

import { FilterItems, FilterOptions } from "@/types";
import { createRenderArray } from "@/utils";

import {
  StyledFilterButtons,
  StyledSelectsContainer,
  StyledTableFilterControls,
} from "./FilterControls.styled";

export interface FilterControlsProps<F extends FilterItems, O extends FilterOptions> {
  setFilters: Dispatch<SetStateAction<F>>;
  options: O[];
}

export function FilterControls<F extends FilterItems, O extends FilterOptions>({
  setFilters,
  options,
}: FilterControlsProps<F, O>) {
  const [selectedValues, setSelectedValues] = useState<F>({} as F);

  return (
    <StyledTableFilterControls>
      <StyledSelectsContainer>
        {isEmpty(options) &&
          createRenderArray(3).map((item) => <Skeleton.Input key={item} size="small" />)}
        {options?.map(({ name, placeholder, items }) => (
          <Select
            key={name}
            options={items}
            placeholder={placeholder}
            optionFilterProp="children"
            onChange={(value) => {
              setSelectedValues({ ...selectedValues, [name]: value });
            }}
            value={selectedValues[name]}
          />
        ))}
      </StyledSelectsContainer>
      <StyledFilterButtons>
        <Button
          type="primary"
          onClick={() => {
            setFilters(selectedValues);
          }}
        >
          Применить
        </Button>
        {!isEmpty(selectedValues) && (
          <Button
            onClick={() => {
              setSelectedValues({} as F);
              setFilters({} as F);
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
