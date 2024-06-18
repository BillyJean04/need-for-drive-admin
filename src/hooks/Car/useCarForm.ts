import { useQuery } from "@tanstack/react-query";
import { Form } from "antd";
import { RcFile } from "antd/es/upload";
import Cookies from "js-cookie";
import { isEmpty } from "lodash";
import { useParams } from "react-router-dom";

import { CarField } from "@/types";
import { CarApi, CarsApi } from "@/types/api";
import { getHeaders } from "@/utils";
import { Urls } from "@/utils/consts/urls";
import { fetcher } from "@/utils/fetcher";

export function useCarForm() {
  const { carId } = useParams();
  const [form] = Form.useForm<CarField>();
  const imageValue = Form.useWatch("image", form);
  const modelValue = Form.useWatch("model", form);
  const categoryValue = Form.useWatch("category", form);
  const colorsValue = Form.useWatch("colors", form);
  const colorValue = Form.useWatch("color", form);
  const priceMinValue = Form.useWatch("priceMin", form);
  const priceMaxValue = Form.useWatch("priceMax", form);
  const tankValue = Form.useWatch("tank", form);
  const numberValue = Form.useWatch("number", form);

  const formValues = form.getFieldsValue();

  const { isLoading } = useQuery({
    queryKey: ["car"],
    queryFn: () =>
      fetcher<CarApi>({
        endpoint: `${Urls.cars}/${carId}`,
        headers: new Headers(getHeaders(Cookies.get("access"), "Bearer")),
        method: "GET",
      }).then((res) => {
        form.setFieldsValue({
          image: res.data.thumbnail.path,
          model: res.data.name,
          category: res.data.categoryId.name,
          colors: res.data.colors,
          priceMin: res.data.priceMin,
          priceMax: res.data.priceMax,
          tank: res.data.tank,
          number: res.data.number,
          description: res.data.description,
        });
        return res;
      }),
    refetchOnWindowFocus: false,
    throwOnError: true,
    gcTime: 0,
    enabled: !!carId,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetcher<CarsApi>({
        endpoint: Urls.categories,
        headers: new Headers(getHeaders(Cookies.get("access"), "Bearer")),
        method: "GET",
      }).then((res) => ({
        name: "category",
        placeholder: "Категория",
        items: res.data.map(({ id, name }) => ({
          value: id,
          label: name,
        })),
      })),
    refetchOnWindowFocus: false,
    throwOnError: true,
  });

  const handleUpload = (file: RcFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const res = reader.result;

      form.setFieldsValue({ image: String(res) });
    };
  };

  const handleSelectCategory = (value: number) => {
    const category = categories?.items.find(({ value: categoryId }) => categoryId === value)?.label;

    form.setFieldsValue({ category });
  };

  const handleClickAddColor = () => {
    const colors = form.getFieldValue("colors");
    const color = form.getFieldValue("color");

    const filtered = new Set(colors ? [...colors, color] : [color]);

    form.setFieldValue("colors", [...Array.from(filtered)]);
    form.resetFields(["color"]);
  };

  const countFilled = Object.keys(form.getFieldsValue()).filter((elem) => {
    if (typeof formValues[elem as keyof CarField] === "number") {
      return !!formValues[elem as keyof CarField];
    }
    if (elem === "color" || elem === "description") {
      return false;
    }
    return !isEmpty(formValues[elem as keyof CarField]);
  });

  return {
    isLoading,
    imageValue,
    modelValue,
    categoryValue,
    colorsValue,
    colorValue,
    priceMinValue,
    priceMaxValue,
    tankValue,
    numberValue,
    countFilled,
    handleUpload,
    handleSelectCategory,
    handleClickAddColor,
    form,
    categories,
  };
}
